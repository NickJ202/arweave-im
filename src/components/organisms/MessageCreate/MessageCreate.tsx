import React from 'react';
import {
	convertToRaw,
	Editor,
	EditorState,
	getDefaultKeyBinding,
	KeyBindingUtil,
	RichUtils,
} from 'draft-js';
const { hasCommandModifier } = KeyBindingUtil;
import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';

import 'draft-js/dist/Draft.css';

import * as S from './styles';

export default function MessageCreate() {
	const editorRef = React.useRef<Editor | null>(null);

	const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

	const [messageActive, setMessageActive] = React.useState<boolean>(false);

	const [boldActive, setBoldActive] = React.useState<boolean>(false);
	const [italicActive, setItalicActive] = React.useState<boolean>(false);
	const [underlineActive, setUnderlineActive] = React.useState<boolean>(false);

	const mapKeyToEditorCommand = (e: React.KeyboardEvent) => {
		if (e.keyCode === 83 && hasCommandModifier(e)) {
			return 'myeditor-save';
		}
		return getDefaultKeyBinding(e);
	};

	const handleContainerClick = () => {
		editorRef.current?.focus();
	};

	const handleKeyCommand = (command: string, editorState: EditorState) => {
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

	// const handleRead = (serializedContent: any) => {
	// 	const rawContentFromDB = JSON.parse(serializedContent);
	// 	const contentState = convertFromRaw(rawContentFromDB);
	// 	setEditorState(EditorState.createWithContent(contentState));
	// };

	const handleSubmit = () => {
		const rawContentState = convertToRaw(editorState.getCurrentContent());
		const serializedContent = JSON.stringify(rawContentState);
		console.log(serializedContent);
	};

	return (
		<S.Wrapper>
			<S.Header>
				<IconButton 
					type={'primary'}
					src={ASSETS.bold}
					handlePress={handleBold}
					active={boldActive}
					disabled={!messageActive}
				/>
				<IconButton 
					type={'primary'}
					src={ASSETS.italic}
					handlePress={handleItalic}
					active={italicActive}
					disabled={!messageActive}
				/>
				<IconButton 
					type={'primary'}
					src={ASSETS.underline}
					handlePress={handleUnderline}
					active={underlineActive}
					disabled={!messageActive}
				/>
			</S.Header>
			<S.Body>
				<S.Editor onClick={handleContainerClick}>
					<Editor
						ref={editorRef}
						editorState={editorState}
						handleKeyCommand={handleKeyCommand}
						onChange={setEditorState}
						onFocus={() => setMessageActive(true)}
						onBlur={() => setMessageActive(false)}
						keyBindingFn={mapKeyToEditorCommand}
						placeholder={'Message # Channel'}
					/>
				</S.Editor>
			</S.Body>
			<S.Footer>
				<Button 
					type={'primary'}
					label={language.send}
					handlePress={handleSubmit}
					disabled={true}
					noMinWidth
				/>
			</S.Footer>
		</S.Wrapper>
	);
}
