import React from 'react';
import { useSelector } from 'react-redux';

import { ChannelHeaderResponseType, ChannelResponseType, ChannelType, CURSORS } from 'lib';

import { language } from 'helpers/language';
import { formatChannelName } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';
import { useFooterNotification } from 'providers/FooterNotificationProvider';
import { RootState } from 'store';

import { GroupChannelDetail } from './GroupChannelDetail';
import { GroupChannelHeader } from './GroupChannelHeader';

export default function GroupChannel() {
	const { queueFooterNotification } = useFooterNotification();
	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const [loading, setLoading] = React.useState<boolean>(false);

	const [channelHeaderData, setChannelHeaderData] = React.useState<ChannelHeaderResponseType | null>(null);
	const [channelData, setChannelData] = React.useState<ChannelResponseType | null>(null);

	const [scrollToRecent, setScrollToRecent] = React.useState<boolean>(false);
	const [updateData, setUpdateData] = React.useState<boolean>(false);

	async function fetchChannelAssets(args: { cursor: string }) {
		if (arProvider.walletAddress && cliProvider.lib && groupReducer) {
			const response = await cliProvider.lib.api.getAssetsByChannel({
				ids: [groupReducer.activeChannelId],
				owners: null,
				cursor: args.cursor,
				reduxCursor: null,
				walletAddress: arProvider.walletAddress,
			});

			if (response && response.data) return response;
			return null;
		}
	}

	// Initial message fetch
	React.useEffect(() => {
		(async function () {
			setChannelData(null);
			setLoading(true);
			// await new Promise((resolve) => setTimeout(resolve, 250));
			try {
				setChannelData(await fetchChannelAssets({ cursor: null }));
				await handleScrollToRecent();
			} catch (e: any) {
				console.error(e);
				setChannelData({
					data: [],
					nextCursor: null,
					previousCursor: null,
				});
			}
			setLoading(false);
		})();
	}, [arProvider.walletAddress, cliProvider.lib, groupReducer]);

	React.useEffect(() => {
		(async function () {
			if (cliProvider.lib && groupReducer) {
				setChannelHeaderData(await cliProvider.lib.api.getChannelById({ channelId: groupReducer.activeChannelId }));
			}
		})();
	}, [cliProvider.lib, groupReducer]);

	React.useEffect(() => {
		if (loading) queueFooterNotification(`${language.fetchingMessages}...`);
	}, [loading]);

	// Update previous messages
	React.useEffect(() => {
		(async function () {
			if (channelData && channelData.nextCursor && channelData.nextCursor !== CURSORS.end) {
				setLoading(true);
				const currentData = [...channelData.data];
				const updatedResponse = await fetchChannelAssets({ cursor: channelData.nextCursor });
				setChannelData({
					data: [...updatedResponse.data, ...currentData],
					nextCursor: updatedResponse.nextCursor,
					previousCursor: updatedResponse.previousCursor,
				});
				setScrollToRecent(false);
				setLoading(false);
			}
		})();
	}, [updateData]);

	// Poll messages
	// React.useEffect(() => {
	// 	async function pollData() {
	// 		const updatedResponse = await fetchData({ cursor: null });

	// 		if (updatedResponse && updatedResponse.data && channelData && channelData.data) {
	// 			if (updatedResponse.data.length > channelData.data.length) {
	// 				setChannelData(updatedResponse);
	// 				setScrollToRecent(!scrollToRecent);
	// 			}
	// 		}
	// 	}

	// 	const intervalId = setInterval(pollData, 1000);
	// 	return () => clearInterval(intervalId);
	// }, [arProvider.walletAddress, cliProvider.lib, groupReducer, channelData]);

	async function handleScrollToRecent() {
		setScrollToRecent(true);
		await new Promise((resolve) => setTimeout(resolve, 250));
		setScrollToRecent(false);
	}

	// Fetch new message
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
				await handleScrollToRecent();
		}
	}

	function getChannelName() {
		if (groupReducer) {
			try {
				return formatChannelName(
					groupReducer.data.channels.find((channel: ChannelType) => channel.id === groupReducer.activeChannelId).title
				);
			} catch (e: any) {
				return '-';
			}
		} else return null;
	}

	function getData() {
		if (groupReducer) {
			return (
				<>
					<GroupChannelHeader channelName={getChannelName()} />
					<GroupChannelDetail
						channelId={groupReducer.activeChannelId}
						channelName={getChannelName()}
						groupId={groupReducer.groupId}
						channelData={channelData}
						channelHeaderData={channelHeaderData}
						handleUpdate={handleUpdate}
						scrollToRecent={scrollToRecent}
						setUpdateData={() => setUpdateData(!updateData)}
						loading={loading}
					/>
				</>
			);
		} else {
			return null;
		}
	}

	return getData();
}
