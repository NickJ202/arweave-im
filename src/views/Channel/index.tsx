import React from 'react';
import { useParams } from 'react-router-dom';

import { ChannelType, GQLResponseType } from 'lib';

import { Loader } from 'components/atoms/Loader';
import { formatChannelName } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';

import { ChannelDetail } from './ChannelDetail';
import { ChannelHeader } from './ChannelHeader';

// TODO: add profiles to messages data
// TODO: change message data tag to message-data
export default function Channel() {
	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const { groupId, channelId } = useParams();

	const [loading, setLoading] = React.useState<boolean>(false);

	const [group, setGroup] = React.useState<any>(null);
	const [data, setData] = React.useState<GQLResponseType | null>(null);

	const [updateMessages, setUpdateMessages] = React.useState<boolean>(false);

	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress && cliProvider.lib && groupId) {
				setGroup(await cliProvider.lib.api.arClient.read(groupId));
			}
		})();
	}, [arProvider.walletAddress, cliProvider.lib, groupId]);

	async function fetchData() {
		if (arProvider.walletAddress && cliProvider.lib && channelId) {
			const response = await cliProvider.lib.api.getAssetsByChannel({
				ids: [channelId],
				owner: null,
				uploader: null,
				cursor: null,
				reduxCursor: null,
				walletAddress: null,
			});

			if (response && response.nodes) return response;
			return null;
		}
	}

	React.useEffect(() => {
		(async function () {
			setLoading(true);
			setData(await fetchData());
			setLoading(false);
		})();
	}, [arProvider.walletAddress, cliProvider.lib, channelId]);

	React.useEffect(() => {
		async function updateData() {
			const updatedResponse = await fetchData();

			if (updatedResponse && updatedResponse.nodes && data && data.nodes) {
				if (updatedResponse.nodes.length > data.nodes.length) {
					setData(updatedResponse);
					setUpdateMessages(!updateMessages);
				};
			}
		}

		const intervalId = setInterval(updateData, 1000);
		return () => clearInterval(intervalId);
	}, [arProvider.walletAddress, cliProvider.lib, channelId, data]);

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
				setUpdateMessages(!updateMessages)
		}
	}

	function getChannelName() {
		if (group && channelId) {
			return formatChannelName(group.channels.find((channel: ChannelType) => channel.id === channelId).title);
		} else return null;
	}

	function getData() {
		if (data && group) {
			return (
				<>
					<ChannelHeader header={getChannelName()} members={group.members} />
					<ChannelDetail
						channelId={channelId}
						channelName={getChannelName()}
						groupId={groupId}
						data={data}
						handleUpdate={handleUpdate}
						updateMessages={updateMessages}
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
