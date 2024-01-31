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
import { formatAddress } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';
import { useFooterNotification } from 'providers/FooterNotificationProvider';

import 'draft-js/dist/Draft.css';

import * as S from './styles';
import { IProps } from './types';

const MAX_EDITOR_LENGTH = 2500;

export default function MessageCreate(props: IProps) {
	const theme = useTheme();
	const { queueFooterNotification } = useFooterNotification();

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

		let offset = selection.getStartOffset() - 1;
		if (offset < 0) {
			const blockBefore = currentContent.getBlockBefore(selection.getStartKey());

			if (blockBefore) {
				offset = blockBefore.getLength() - 1;
				const blockBeforeStyle = blockBefore.getInlineStyleAt(offset);

				setBoldActive(blockBeforeStyle.has('BOLD'));
				setItalicActive(blockBeforeStyle.has('ITALIC'));
				setUnderlineActive(blockBeforeStyle.has('UNDERLINE'));
				setCodeActive(blockBeforeStyle.has('CODE'));

				return;
			}
		}

		const currentStyle = currentBlock.getInlineStyleAt(offset);

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
	}, [boldActive, italicActive, underlineActive, codeActive]);

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

		if (e.keyCode === 67 && hasCommandModifier(e)) {
			return 'code';
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

		const newState = RichUtils.handleKeyCommand(editorState, command);
		switch (command) {
			case 'bold':
				setBoldModeActive(!boldModeActive);
				break;
			case 'italic':
				setItalicModeActive(!italicModeActive);
				break;
			case 'underline':
				setUnderlineModeActive(!underlineModeActive);
				break;
			case 'code':
				handleCode();
				return;
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
			try {
				const rawContentState = convertToRaw(editorState.getCurrentContent());
				const serializedContent = JSON.stringify({ type: MessageEnum.Text, data: rawContentState });

				editorRef.current?.blur();
				setTimeout(() => {
					setEditorState(EditorState.createEmpty());
				}, 0);
				setTimeout(() => {
					editorRef.current?.focus();
				}, 100);

				const plainText = editorState.getCurrentContent().getPlainText();
				const author = arProvider.arProfile.handle
					? arProvider.arProfile.handle
					: formatAddress(arProvider.walletAddress, false);

				setLoading(true);
				const contractId = await cliProvider.lib.api.createAsset({
					content: serializedContent,
					contentType: CONTENT_TYPES.textPlain,
					title: TAGS.values.messageTitle(author),
					description: plainText.length > 280 ? `${plainText.substring(0, 280)}...` : plainText,
					type: TAGS.values.message,
					topics: [TAGS.values.message],
					owner: arProvider.walletAddress,
					ticker: TAGS.values.ticker,
					dataProtocol: null,
					dataSource: null,
					renderWith: null,
					channelId: props.channelId,
					groupId: props.groupId,
				});

				await props.handleUpdate(contractId);
				queueFooterNotification(`${language.messageSent}!`);
			} catch (e: any) {
				console.error(e);
			}
			setLoading(false);
		}
	};

	function checkEmptyEditor(editorState: EditorState) {
		const plainText = editorState.getCurrentContent().getPlainText();
		return !plainText.trim().length;
	}

	function checkInvalidEditorLength(editorState: EditorState) {
		return editorState.getCurrentContent().getPlainText().length >= MAX_EDITOR_LENGTH;
	}

	function getSubmitDisabled(editorState: EditorState) {
		return checkEmptyEditor(editorState) || checkInvalidEditorLength(editorState);
	}

	function handleEditorChange(newEditorState: EditorState) {
		setEditorState(newEditorState);
	}

	return (
		<>
			<S.Wrapper active={messageActive} onClick={() => editorRef.current?.focus()}>
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
						tooltip={language.handleBold}
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
						tooltip={language.handleItalic}
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
						tooltip={language.handleUnderline}
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
						tooltip={language.handleCode}
					/>
					<S.IDivider />
					<IconButton
						type={'alt1'}
						src={ASSETS.link}
						handlePress={() => {
							setLinkActive(true);
							setMessageActive(false);
						}}
						active={false}
						disabled={!messageActive}
						dimensions={{
							wrapper: 22.5,
							icon: 11.5,
						}}
						tooltip={language.addLink}
					/>
				</S.Header>
				<S.Body>
					<S.Editor>
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
					{checkInvalidEditorLength(editorState) && (
						<S.FWarning>
							<span>{language.maxCharsReached}</span>
						</S.FWarning>
					)}
					<Button
						type={'alt1'}
						label={loading ? `${language.sending}...` : language.send}
						handlePress={handleSubmit}
						disabled={loading || getSubmitDisabled(editorState)}
						height={33.5}
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
