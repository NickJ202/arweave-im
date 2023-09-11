import React from 'react';
import { useParams } from 'react-router-dom';

import { ChannelType, GQLResponseType } from 'lib';

import { Loader } from 'components/atoms/Loader';
import { formatChannelName } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';

import { ChannelDetail } from './ChannelDetail';
import { ChannelHeader } from './ChannelHeader';

export default function Channel() {
	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const { groupId, channelId } = useParams();

	const [loading, setLoading] = React.useState<boolean>(false);

	const [group, setGroup] = React.useState<any>(null);
	const [data, setData] = React.useState<GQLResponseType | null>(null);

	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress && cliProvider.lib && groupId) {
				setGroup(await cliProvider.lib.api.arClient.read(groupId));
			}
		})();
	}, [arProvider.walletAddress, cliProvider.lib, groupId]);

	React.useEffect(() => {
		(async function () {
			if ((arProvider.walletAddress, cliProvider.lib && channelId)) {
				setData(null);
				setLoading(true);
				setData(
					await cliProvider.lib.api.getAssetsByChannel({
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
	}, [arProvider.walletAddress, cliProvider.lib, channelId]);

	async function handleUpdate(contractId: string) {
		if (cliProvider.lib && contractId) {
			const asset = await cliProvider.lib.api.getAssetById({
				assetId: contractId,
			});
			if (asset)
				setData({
					nodes: [...data.nodes, asset],
					nextCursor: data.nextCursor,
					previousCursor: data.previousCursor,
				});
		}
	}

	function getChannelName() {
		if (group && channelId) {
			return formatChannelName(group.channels.find((channel: ChannelType) => channel.id === channelId).title);
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
