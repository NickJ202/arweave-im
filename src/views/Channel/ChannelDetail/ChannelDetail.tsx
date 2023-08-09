import React from 'react';
import Arweave from 'arweave';
import { defaultCacheOptions, LoggerFactory, WarpFactory } from 'warp-contracts';
import { DeployPlugin } from 'warp-contracts-plugin-deploy';

import { ClientType } from 'lib';
import { Client } from 'lib/clients';

import { Message } from 'components/organisms/Message';
import { MessageCreate } from 'components/organisms/MessageCreate';
import { API_CONFIG, CURRENCIES } from 'helpers/config';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

export default function ChannelDetail(props: IProps) {
	const arProvider = useArweaveProvider();
	
	const [loading, setLoading] = React.useState<boolean>(false);
	const [lib, setLib] = React.useState<ClientType | null>(null);

	const [messages, setMessages] = React.useState<any>(null);

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
				warpDreNode: 'https://dre-1.warp.cc/contract',
			})
		);
	}, [arProvider.wallet, arProvider.walletAddress]);

	React.useEffect(() => {
		(async function () {
			if (lib) {
				setMessages(await lib.api.getAssetsByChannel({
					ids: [props.channelId],
					owner: null,
					uploader: null,
					cursor: null,
					reduxCursor: null,
					walletAddress: null
				}));
			}
		})();
	}, [lib]);

	console.log(messages)

	return messages ? (
		<S.Wrapper>
			<S.MWrapper>
				{messages.data.map((message: any, index: number) => {
					return <Message key={index} message={message} />;
				})}
			</S.MWrapper>
			<S.CWrapper>
				<MessageCreate channelId={props.channelId} groupId={props.groupId} />
			</S.CWrapper>
		</S.Wrapper>
	) : null;
}