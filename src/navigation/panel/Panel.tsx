import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arweave from 'arweave';
import { defaultCacheOptions, LoggerFactory, WarpFactory } from 'warp-contracts';
import { DeployPlugin } from 'warp-contracts-plugin-deploy';

import { ClientType } from 'lib';
import { Client } from 'lib/clients';

import { API_CONFIG, CURRENCIES, DRE_NODE } from 'helpers/config';
import { formatChannelName } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

LoggerFactory.INST.logLevel('fatal');

export default function Panel(props: IProps) {
	const navigate = useNavigate();

	const arProvider = useArweaveProvider();

	const [lib, setLib] = React.useState<ClientType | null>(null);
	const [group, setGroup] = React.useState<any>(null);

	const [activeChannelId, setActiveChannelId] = React.useState<string | null>(null);

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
			if (lib) {
				setGroup(await lib.api.arClient.read(props.groupId));
			}
		})();
	}, [lib]);

	React.useEffect(() => {
		(async function () {
			if (group && !activeChannelId) {
				navigate(`${props.groupId}/${group.channels[0].id}`);
				setActiveChannelId(group.channels[0].id);
			}
		})();
	}, [group, activeChannelId]);

	function handleChannelChange(channelId: string) {
		setActiveChannelId(channelId);
		navigate(`${props.groupId}/${channelId}`);
	}

	function getChannels() {
		return group ? (
			<>
				{group.channels.map((channel: any, index: number) => {
					return (
						<S.Channel key={index} active={channel.id === activeChannelId}>
							<button onClick={() => handleChannelChange(channel.id)}>
								<span>{formatChannelName(channel.title)}</span>
							</button>
						</S.Channel>
					);
				})}
			</>
		) : null;
	}

	return (
		<S.Wrapper>
			<S.Group>
				<span>{group ? group.title : null}</span>
			</S.Group>
			<S.Channels>{getChannels()}</S.Channels>
		</S.Wrapper>
	);
}
