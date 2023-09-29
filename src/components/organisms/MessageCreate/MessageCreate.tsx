import React from 'react';
import { convertToRaw, Editor, EditorState, getDefaultKeyBinding, KeyBindingUtil, Modifier, RichUtils } from 'draft-js';
import { OrderedSet } from 'immutable';
import { useTheme } from 'styled-components';

import { CONTENT_TYPES, MessageEnum, TAGS } from 'lib';
const { hasCommandModifier } = KeyBindingUtil;

import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';
import { MessageCreateLink } from 'components/atoms/MessageCreateLink';
import { ASSETS, EDITOR_STYLE_MAP } from 'helpers/config';
import { language } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';

import 'draft-js/dist/Draft.css';

import * as S from './styles';
import { IProps } from './types';

// TODO: type bold word, backspace full word and boldActive is still true
export default function MessageCreate(props: IProps) {
	const theme = useTheme();

	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const editorRef = React.useRef<Editor | null>(null);

	const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

	const [messageActive, setMessageActive] = React.useState<boolean>(false);

	const [boldActive, setBoldActive] = React.useState<boolean>(false);
	const [italicActive, setItalicActive] = React.useState<boolean>(false);
	const [underlineActive, setUnderlineActive] = React.useState<boolean>(false);
	const [codeActive, setCodeActive] = React.useState<boolean>(false);

	const [linkActive, setLinkActive] = React.useState<boolean>(false);

	const [boldModeActive, setBoldModeActive] = React.useState<boolean>(false);
	const [italicModeActive, setItalicModeActive] = React.useState<boolean>(false);
	const [underlineModeActive, setUnderlineModeActive] = React.useState<boolean>(false);
	const [codeModeActive, setCodeModeActive] = React.useState<boolean>(false);

	const [loading, setLoading] = React.useState<boolean>(false);

	React.useEffect(() => {
		const selection = editorState.getSelection();
		const currentContent = editorState.getCurrentContent();
		const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
		const currentStyle = currentBlock.getInlineStyleAt(selection.getStartOffset() - 1);

		setBoldActive(currentStyle.has('BOLD'));
		setItalicActive(currentStyle.has('ITALIC'));
		setUnderlineActive(currentStyle.has('UNDERLINE'));
		setCodeActive(currentStyle.has('CODE'));
	
	}, [editorState]);

	React.useEffect(() => {
		setBoldModeActive(boldActive);
		setItalicModeActive(italicActive);
		setUnderlineModeActive(underlineActive);
		setCodeModeActive(codeActive);
	}, [boldActive, italicActive, underlineActive, codeActive])
	

	const mapKeyToEditorCommand = (e: React.KeyboardEvent) => {
		if (e.keyCode === 83 && hasCommandModifier(e)) {
			return 'myeditor-save';
		}

		if (e.keyCode === 13 && e.shiftKey) {
			return 'insert-line-break';
		}

		if (e.keyCode === 13) {
			return 'submit-message';
		}

		if (e.keyCode === 32) {
			return 'insert-characters';
		}

		return getDefaultKeyBinding(e);
	};

	const handleKeyCommand = (command: string, editorState: EditorState) => {
		if (command === 'submit-message' && !getSubmitDisabled(editorState)) {
			handleSubmit();
			return 'handled';
		}

		if (command === 'insert-line-break') {
			const selection = editorState.getSelection();
			let contentState = editorState.getCurrentContent();
			const currentBlock = contentState.getBlockForKey(selection.getStartKey());
			const hasLinkStyle = currentBlock.getInlineStyleAt(selection.getStartOffset() - 1).has('LINK');

			if (hasLinkStyle) {
				contentState = Modifier.removeInlineStyle(contentState, selection, 'LINK');
				contentState = Modifier.removeInlineStyle(contentState, selection, 'CODE');

				contentState = Modifier.insertText(contentState, selection, ' ');

				const newEditorState = EditorState.push(editorState, contentState, 'change-inline-style');
				setEditorState(newEditorState);
			} else {
				contentState = Modifier.splitBlock(contentState, selection);
				const newEditorState = EditorState.push(editorState, contentState, 'split-block');
				setEditorState(newEditorState);
			}
			return 'handled';
		}

		if (command === 'insert-characters') {
			const selection = editorState.getSelection();
			let contentState = editorState.getCurrentContent();
			contentState = Modifier.removeInlineStyle(contentState, selection, 'CODE');
			contentState = Modifier.removeInlineStyle(contentState, selection, 'LINK');

			contentState = Modifier.insertText(contentState, selection, ' ');

			const newEditorState = EditorState.push(editorState, contentState, 'change-inline-style');
			setEditorState(newEditorState);
			return 'handled';
		}

		const newState = RichUtils.handleKeyCommand(editorState, command);
		switch (command) {
			case 'bold':
				setBoldModeActive(!boldModeActive);
				break;
			case 'italic':
				setItalicModeActive(!italicModeActive)
				break;
			case 'underline':
				setUnderlineModeActive(!underlineModeActive)
				break;
			case 'code':
				setCodeModeActive(!codeModeActive)
				break;
			default:
				break;
		}
		if (newState) {
			setEditorState(newState);
			return 'handled';
		}
		return 'not-handled';
	};

	const handleBold = () => {
		const newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
		setBoldModeActive(!boldModeActive);
		setEditorState(newState);

		// setBoldActive(!boldActive);
	};

	const handleItalic = () => {
		const newState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
		setItalicModeActive(!italicModeActive);
		setEditorState(newState);
	};

	const handleUnderline = () => {
		const newState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
		setUnderlineModeActive(!underlineModeActive);
		setEditorState(newState);
	};

	const handleCode = () => {
		const newState = RichUtils.toggleInlineStyle(editorState, 'CODE');
		setCodeModeActive(!codeModeActive);
		setEditorState(newState);
	};

	const handleAddLink = (link: string) => {
		let contentState = editorState.getCurrentContent();
		contentState = contentState.createEntity('LINK', 'MUTABLE', { url: link });
		const entityKey = contentState.getLastCreatedEntityKey();

		const linkText = link;

		contentState = Modifier.insertText(
			contentState,
			contentState.getSelectionAfter(),
			linkText,
			OrderedSet.of('LINK'),
			entityKey
		);

		contentState = Modifier.insertText(contentState, contentState.getSelectionAfter(), ' ');

		const newEditorState = EditorState.push(editorState, contentState, 'insert-characters');

		const newEditorStateWithSelection = EditorState.forceSelection(newEditorState, contentState.getSelectionAfter());

		setEditorState(newEditorStateWithSelection);

		setTimeout(() => {
			editorRef.current?.focus();
			setMessageActive(true);
		}, 100);
	};

	const handleSubmit = async () => {
		if (cliProvider.lib && arProvider.walletAddress) {
			const rawContentState = convertToRaw(editorState.getCurrentContent());
			const serializedContent = JSON.stringify({ type: MessageEnum.Text, data: rawContentState });

			editorRef.current?.blur();
			setTimeout(() => {
				setEditorState(EditorState.createEmpty());
			}, 0);
			setTimeout(() => {
				editorRef.current?.focus();
			}, 100);

			setLoading(true);
			const contractId = await cliProvider.lib.api.createAsset({
				content: serializedContent,
				contentType: CONTENT_TYPES.textPlain,
				title: language.message(props.channelId),
				description: language.message(props.channelId),
				type: language.message(props.channelId),
				topics: [language.message(props.channelId)],
				owner: arProvider.walletAddress,
				ticker: TAGS.values.ticker,
				dataProtocol: null,
				dataSource: null,
				renderWith: null,
				channelId: props.channelId,
				groupId: props.groupId,
			});

			await props.handleUpdate(contractId);
			setLoading(false);
		}
	};

	function checkEmptyEditor(editorState: EditorState) {
		const plainText = editorState.getCurrentContent().getPlainText();
		return !plainText.trim().length;
	}

	function getSubmitDisabled(editorState: EditorState) {
		return checkEmptyEditor(editorState);
	}

	function handleEditorChange(newEditorState: EditorState) {
		// if (checkEmptyEditor(newEditorState)) {
		// 	setBoldActive(false);
		// 	setItalicActive(false);
		// 	setUnderlineActive(false);
		// 	setCodeActive(false);
		// }
		setEditorState(newEditorState);
	}

	return (
		<>
			<S.Wrapper active={messageActive}>
				<S.Header>
					<IconButton
						type={'alt1'}
						src={ASSETS.bold}
						handlePress={handleBold}
						active={boldModeActive}
						disabled={!messageActive}
						dimensions={{
							wrapper: 22.5,
							icon: 13.5,
						}}
					/>
					<IconButton
						type={'alt1'}
						src={ASSETS.italic}
						handlePress={handleItalic}
						active={italicModeActive}
						disabled={!messageActive}
						dimensions={{
							wrapper: 22.5,
							icon: 13.5,
						}}
					/>
					<IconButton
						type={'alt1'}
						src={ASSETS.underline}
						handlePress={handleUnderline}
						active={underlineModeActive}
						disabled={!messageActive}
						dimensions={{
							wrapper: 22.5,
							icon: 13.5,
						}}
					/>
					<S.IDivider />
					<IconButton
						type={'alt1'}
						src={ASSETS.code}
						handlePress={handleCode}
						active={codeModeActive}
						disabled={!messageActive}
						dimensions={{
							wrapper: 22.5,
							icon: 13.5,
						}}
					/>
					<S.IDivider />
					<IconButton
						type={'alt1'}
						src={ASSETS.link}
						handlePress={() => setLinkActive(true)}
						active={false}
						disabled={!messageActive}
						dimensions={{
							wrapper: 22.5,
							icon: 11.5,
						}}
					/>
				</S.Header>
				<S.Body>
					<S.Editor onClick={() => editorRef.current?.focus()}>
						<Editor
							ref={editorRef}
							customStyleMap={EDITOR_STYLE_MAP(theme)}
							editorState={editorState}
							handleKeyCommand={handleKeyCommand}
							onChange={handleEditorChange}
							onFocus={() => setMessageActive(true)}
							onBlur={() => setMessageActive(false)}
							keyBindingFn={mapKeyToEditorCommand}
							placeholder={props.placeholder ? props.placeholder : language.sendMessage}
						/>
					</S.Editor>
				</S.Body>
				<S.Footer>
					<Button
						type={'alt1'}
						label={loading ? `${language.sending}...` : language.send}
						handlePress={handleSubmit}
						disabled={loading || getSubmitDisabled(editorState)}
						noMinWidth
					/>
				</S.Footer>
			</S.Wrapper>
			{linkActive && (
				<MessageCreateLink
					handleSubmit={(link: string) => handleAddLink(link)}
					handleClose={() => setLinkActive(false)}
				/>
			)}
		</>
	);
}
