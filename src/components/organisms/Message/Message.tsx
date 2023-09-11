import React from 'react';
import { ReactSVG } from 'react-svg';
import Arweave from 'arweave';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { defaultCacheOptions, LoggerFactory, WarpFactory } from 'warp-contracts';
import { DeployPlugin } from 'warp-contracts-plugin-deploy';

import { ClientType, ProfileType, TAGS } from 'lib';
import { Client } from 'lib/clients';

import { API_CONFIG, ASSETS, CURRENCIES, DRE_NODE } from 'helpers/config';
import { getTxEndpoint } from 'helpers/endpoints';
import { formatAddress, formatDate } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

LoggerFactory.INST.logLevel('fatal');

export default function Message(props: IProps) {
	const arProvider = useArweaveProvider();

	const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

	const [lib, setLib] = React.useState<ClientType | null>(null);
	const [profile, setProfile] = React.useState<ProfileType | null>(null);
	const [hasError, setHasError] = React.useState(false);

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

	React.useEffect(() => {
		(async function () {
			if (lib && props.data) {
				setProfile(
					await lib.api.getProfile({
						walletAddress: props.data.node.address,
					})
				);
			}
		})();
	}, [lib]);

	const handleError = () => {
		setHasError(true);
	};

	const avatar =
		!hasError && profile && profile.avatar ? (
			<img src={getTxEndpoint(profile.avatar)} onError={handleError} />
		) : (
			<ReactSVG src={ASSETS.user} />
		);
	React.useEffect(() => {
		if (props.data) {
			const rawContent = props.data.node.tags.find((tag: any) => tag.name === TAGS.keys.ans110.description).value;
			if (rawContent) {
				let dataObject: any;
				try {
					dataObject = JSON.parse(`"${rawContent}"`);
				} catch (e: any) {
					dataObject = rawContent;
				}
				try {
					const contentState = convertFromRaw(JSON.parse(dataObject));
					const updatedEditorState = EditorState.createWithContent(contentState);
					setEditorState(updatedEditorState);
				} catch (e: any) {
					console.error(e);
				}
			}
		}
	}, [props.data]);

	function getHeader() {
		if (profile) {
			if (profile.handle) return `${profile.handle}`;
			else return `${formatAddress(profile.walletAddress, false)}`;
		} else return null;
	}

	return props.data ? (
		<S.Wrapper>
			<S.MAvatarWrapper>
				<S.Avatar>{avatar}</S.Avatar>
			</S.MAvatarWrapper>
			<S.MMessage>
				<S.MMessageHeader>
					<p>{getHeader()}</p>
					<span>
						{formatDate(props.data.node.tags.find((tag: any) => tag.name === TAGS.keys.dateCreated).value, 'epoch')}
					</span>
				</S.MMessageHeader>
				<S.MText>
					<Editor editorState={editorState} onChange={() => {}} readOnly={true} />
				</S.MText>
			</S.MMessage>
		</S.Wrapper>
	) : null;
}
