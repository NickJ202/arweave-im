import React from 'react';
import { useParams } from 'react-router-dom';
import Arweave from 'arweave';
import { defaultCacheOptions, WarpFactory } from 'warp-contracts';
import { DeployPlugin } from 'warp-contracts-plugin-deploy';

import { AssetsResponseType, ClientType } from 'lib';
import { Client } from 'lib/clients';

import { Loader } from 'components/atoms/Loader';
import { API_CONFIG, CURRENCIES, DRE_NODE } from 'helpers/config';
import { formatChannelName } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import { ChannelDetail } from './ChannelDetail';
import { ChannelHeader } from './ChannelHeader';

// TODO: fetch data by channel id
// TODO: fetch group titie --> header
export default function Channel() {
	const arProvider = useArweaveProvider();

	const { groupId, channelId } = useParams();

	const [loading, setLoading] = React.useState<boolean>(false);
	const [lib, setLib] = React.useState<ClientType | null>(null);

	const [group, setGroup] = React.useState<any>(null);
	const [data, setData] = React.useState<AssetsResponseType | null>(null);

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
			if (lib && groupId) {
				setGroup(await lib.api.arClient.read(groupId));
			}
		})();
	}, [lib, groupId]);

	React.useEffect(() => {
		(async function () {
			if (lib && channelId) {
				setData(null);
				setLoading(true);
				setData(
					await lib.api.getAssetsByChannel({
						ids: [channelId],
						owner: null,
						uploader: null,
						cursor: null,
						reduxCursor: null,
						walletAddress: null,
					})
				);
				setLoading(false);
			}
		})();
	}, [lib, channelId]);

	async function handleUpdate(contractId: string) {
		if (lib && contractId) {
			const asset = await lib.api.getAssetById({
				assetId: contractId,
			});
			if (asset)
				setData({
					assets: [...data.assets, asset],
					nextCursor: data.nextCursor,
					previousCursor: data.previousCursor,
				});
		}
	}

	function getChannelName() {
		if (group && channelId) {
			return formatChannelName(group.channels.find((channel: any) => channel.id === channelId).title);
		} else return null;
	}

	function getData() {
		if (data) {
			return (
				<>
					<ChannelHeader header={getChannelName()} />
					<ChannelDetail
						channelId={channelId}
						channelName={getChannelName()}
						groupId={groupId}
						data={data}
						handleUpdate={handleUpdate}
					/>
				</>
			);
		} else {
			if (loading) return <Loader />;
			else return null;
		}
	}

	return getData();
}
