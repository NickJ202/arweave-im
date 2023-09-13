import React from 'react';
import { useParams } from 'react-router-dom';

import { ChannelResponseType, ChannelType,CURSORS } from 'lib';

import { Loader } from 'components/atoms/Loader';
import { formatChannelName } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';

import { ChannelDetail } from './ChannelDetail';
import { ChannelHeader } from './ChannelHeader';

// TODO: paginate messages
export default function Channel() {
	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const { groupId, channelId } = useParams();

	const [loading, setLoading] = React.useState<boolean>(false);

	const [group, setGroup] = React.useState<any>(null);
	const [channelData, setChannelData] = React.useState<ChannelResponseType | null>(null);

	const [scrollToRecent, setScrollToRecent] = React.useState<boolean>(false);
	const [updateData, setUpdateData] = React.useState<boolean>(false);

	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress && cliProvider.lib && groupId) {
				setGroup(await cliProvider.lib.api.arClient.read(groupId));
			}
		})();
	}, [arProvider.walletAddress, cliProvider.lib, groupId]);

	async function fetchData(args: { cursor: string }) {
		if (arProvider.walletAddress && cliProvider.lib && channelId) {
			const response = await cliProvider.lib.api.getAssetsByChannel({
				ids: [channelId],
				owners: null,
				cursor: args.cursor,
				reduxCursor: null,
				walletAddress: null,
			});

			if (response && response.data) return response;
			return null;
		}
	}

	React.useEffect(() => {
		(async function () {
			setLoading(true);
			setChannelData(await fetchData({ cursor: null }));
			setLoading(false);
		})();
	}, [arProvider.walletAddress, cliProvider.lib, channelId]);

	React.useEffect(() => {
		async function pollData() {
			const updatedResponse = await fetchData({ cursor: null });

			if (updatedResponse && updatedResponse.data && channelData && channelData.data) {
				if (updatedResponse.data.length > channelData.data.length) {
					setChannelData(updatedResponse);
					setScrollToRecent(!scrollToRecent);
				}
			}
		}

		const intervalId = setInterval(pollData, 1000);
		return () => clearInterval(intervalId);
	}, [arProvider.walletAddress, cliProvider.lib, channelId, channelData]);

	React.useEffect(() => {
		(async function () {
			if (channelData && channelData.nextCursor && channelData.nextCursor !== CURSORS.end){
				const updatedResponse = await fetchData({ cursor: channelData.nextCursor });
				console.log(updatedResponse)
			}
		})()
	}, [updateData])

	async function handleUpdate(contractId: string) {
		if (cliProvider.lib && contractId) {
			const asset = await cliProvider.lib.api.getAssetById({
				assetId: contractId,
			});
			if (asset)
				setChannelData({
					data: [...channelData.data, asset],
					nextCursor: channelData.nextCursor,
					previousCursor: channelData.previousCursor,
				});
			setScrollToRecent(!scrollToRecent);
		}
	}

	function getChannelName() {
		if (group && channelId) {
			return formatChannelName(group.channels.find((channel: ChannelType) => channel.id === channelId).title);
		} else return null;
	}

	function getData() {
		if (channelData && group) {
			return (
				<>
					<ChannelHeader header={getChannelName()} members={group.members} />
					<ChannelDetail
						channelId={channelId}
						channelName={getChannelName()}
						groupId={groupId}
						channelData={channelData}
						handleUpdate={handleUpdate}
						scrollToRecent={scrollToRecent}
						setUpdateData={() => setUpdateData(!updateData)}
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
