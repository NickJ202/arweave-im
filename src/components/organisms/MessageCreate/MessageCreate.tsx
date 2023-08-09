import React from 'react';
import Arweave from 'arweave';
import { convertToRaw, Editor, EditorState, getDefaultKeyBinding, KeyBindingUtil, RichUtils } from 'draft-js';
import { defaultCacheOptions, WarpFactory } from 'warp-contracts';
import { DeployPlugin } from 'warp-contracts-plugin-deploy';
const { hasCommandModifier } = KeyBindingUtil;
import { ClientType, CONTENT_TYPES } from 'lib';
import { Client } from 'lib/clients';

import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';
import { API_CONFIG, ASSETS, CURRENCIES, DRE_NODE } from 'helpers/config';
import { language } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import 'draft-js/dist/Draft.css';

import * as S from './styles';
import { IProps } from './types';

export default function MessageCreate(props: IProps) {
	const arProvider = useArweaveProvider();

	const editorRef = React.useRef<Editor | null>(null);

	const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

	const [messageActive, setMessageActive] = React.useState<boolean>(false);

	const [boldActive, setBoldActive] = React.useState<boolean>(false);
	const [italicActive, setItalicActive] = React.useState<boolean>(false);
	const [underlineActive, setUnderlineActive] = React.useState<boolean>(false);

	const [loading, setLoading] = React.useState<boolean>(false);
	const [lib, setLib] = React.useState<ClientType | null>(null);

	React.useEffect(() => {
		const arweaveGet = Arweave.init({
			host: API_CONFIG.arweaveGet,
			port: API_CONFIG.port,
			protocol: API_CONFIG.protocol,
			timeout: API_CONFIG.timeout,
			logging: API_CONFIG.logging,
		});

		const arweavePost = Arweave.init({
			host: API_CONFIG.arweavePost,
			port: API_CONFIG.port,
			protocol: API_CONFIG.protocol,
			timeout: API_CONFIG.timeout,
			logging: API_CONFIG.logging,
		});

		const warp = WarpFactory.forMainnet({
			...defaultCacheOptions,
			inMemory: true,
		}).use(new DeployPlugin());

		setLib(
			Client.init({
				currency: CURRENCIES.default,
				arweaveGet: arweaveGet,
				arweavePost: arweavePost,
				bundlrKey: window.arweaveWallet ? window.arweaveWallet : null,
				warp: warp,
				warpDreNode: DRE_NODE,
			})
		);
	}, [arProvider.wallet, arProvider.walletAddress]);

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

	const handleSubmit = async () => {
		if (lib && arProvider.walletAddress) {
			const rawContentState = convertToRaw(editorState.getCurrentContent());
			const serializedContent = JSON.stringify(rawContentState);

			setLoading(true);
			const contractId = await lib.api.createAsset({
				content: serializedContent,
				contentType: CONTENT_TYPES.textPlain,
				title: 'Test Message',
				description: serializedContent,
				type: 'Test-Message',
				topics: ['Test-Message'],
				owner: arProvider.walletAddress,
				ticker: 'MSG',
				dataProtocol: null,
				dataSource: null,
				renderWith: null,
				channelId: props.channelId,
				groupId: props.groupId,
			});

			await props.handleUpdate(contractId);
			setEditorState(() => EditorState.createEmpty());
			setLoading(false);
		}
	};

	const isEditorEmpty = (editorState: EditorState) => {
		const plainText = editorState.getCurrentContent().getPlainText();
		return !plainText.trim().length;
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
						placeholder={props.placeholder ? props.placeholder : language.sendMessage}
					/>
				</S.Editor>
			</S.Body>
			<S.Footer>
				<Button
					type={'primary'}
					label={loading ? `${language.sending}...` : language.send}
					handlePress={handleSubmit}
					disabled={loading || isEditorEmpty(editorState)}
					noMinWidth
				/>
			</S.Footer>
		</S.Wrapper>
	);
}
