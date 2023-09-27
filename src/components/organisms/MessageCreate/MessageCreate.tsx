import React from 'react';
import { convertToRaw, Editor, EditorState, getDefaultKeyBinding, KeyBindingUtil, RichUtils } from 'draft-js';
import { useTheme } from 'styled-components';

import { CONTENT_TYPES, MessageEnum, TAGS } from 'lib';
const { hasCommandModifier } = KeyBindingUtil;

import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';
import { ASSETS , EDITOR_STYLE_MAP } from 'helpers/config';
import { language } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';

import 'draft-js/dist/Draft.css';

import * as S from './styles';
import { IProps } from './types';

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

	const [loading, setLoading] = React.useState<boolean>(false);

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

		if (e.keyCode === 220 && hasCommandModifier(e)) {
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
			const newState = RichUtils.insertSoftNewline(editorState);
			setEditorState(newState);
			return 'handled';
		}

		const newState = RichUtils.handleKeyCommand(editorState, command);
		switch (command) {
			case 'bold':
				setBoldActive(!boldActive);
				break;
			case 'italic':
				setItalicActive(!italicActive);
				break;
			case 'underline':
				setUnderlineActive(!underlineActive);
				break;
			case 'code':
				setCodeActive(!codeActive);
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

	const handleContainerClick = () => {
		editorRef.current?.focus();
	};

	const handleBold = () => {
		const newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
		setEditorState(newState);
		setBoldActive(!boldActive);
	};

	const handleItalic = () => {
		const newState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
		setEditorState(newState);
		setItalicActive(!italicActive);
	};

	const handleUnderline = () => {
		const newState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
		setEditorState(newState);
		setUnderlineActive(!underlineActive);
	};

	const handleCode = () => {
		const newState = RichUtils.toggleInlineStyle(editorState, 'CODE');
		setEditorState(newState);
		setCodeActive(!codeActive);
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

	const getSubmitDisabled = (editorState: EditorState) => {
		const plainText = editorState.getCurrentContent().getPlainText();
		return !plainText.trim().length;
	};

	return (
		<S.Wrapper>
			<S.Header>
				<IconButton
					type={'alt1'}
					src={ASSETS.bold}
					handlePress={handleBold}
					active={boldActive}
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
					active={italicActive}
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
					active={underlineActive}
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
					active={codeActive}
					disabled={!messageActive}
					dimensions={{
						wrapper: 22.5,
						icon: 13.5,
					}}
				/>
			</S.Header>
			<S.Body>
				<S.Editor onClick={handleContainerClick}>
					<Editor
						ref={editorRef}
						customStyleMap={EDITOR_STYLE_MAP(theme)}
						editorState={editorState}
						handleKeyCommand={handleKeyCommand}
						onChange={setEditorState}
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
	);
}
