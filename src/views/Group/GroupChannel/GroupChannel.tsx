import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AssetType, ChannelHeaderResponseType, ChannelResponseType, ChannelType, CURSORS } from 'lib';

import { language } from 'helpers/language';
import { formatChannelName } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';
import { useFooterNotification } from 'providers/FooterNotificationProvider';
import { RootState } from 'store';
import * as notificationsActions from 'store/notifications/actions';

import { GroupChannelDetail } from './GroupChannelDetail';
import { GroupChannelHeader } from './GroupChannelHeader';

export default function GroupChannel() {
	const dispatch = useDispatch();

	const { queueFooterNotification } = useFooterNotification();
	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const [loading, setLoading] = React.useState<boolean>(false);

	const [channelHeaderData, setChannelHeaderData] = React.useState<ChannelHeaderResponseType | null>(null);
	const [channelData, setChannelData] = React.useState<ChannelResponseType | null>(null);

	const [scrollToRecent, setScrollToRecent] = React.useState<boolean>(false);
	const [updateData, setUpdateData] = React.useState<boolean>(false);

	async function fetchChannelAssets(args: { cursor: string; getStamps: boolean }) {
		if (arProvider.walletAddress && cliProvider.lib && groupReducer) {
			const response = await cliProvider.lib.api.getAssetsByChannel({
				ids: [groupReducer.activeChannelId],
				owners: null,
				cursor: args.cursor,
				reduxCursor: null,
				walletAddress: arProvider.walletAddress,
				getStamps: args.getStamps,
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
			try {
				setChannelData(await fetchChannelAssets({ cursor: null, getStamps: true }));
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
				const updatedResponse = await fetchChannelAssets({ cursor: channelData.nextCursor, getStamps: true });
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
	React.useEffect(() => {
		async function pollData() {
			const updatedResponse = await fetchChannelAssets({ cursor: null, getStamps: false });
			if (channelData && channelData.data && updatedResponse && updatedResponse.nextCursor) {
				const updatedMessages = getUniqueMessages(channelData.data, updatedResponse.data);
				if (updatedMessages.length) {
					const updatedMessages: AssetType[] = getUniqueMessages(channelData.data, updatedResponse.data).map(
						(message: AssetType) => ({ ...message })
					);
					setChannelData({
						data: [...channelData.data, ...updatedMessages],
						nextCursor: updatedResponse.nextCursor,
						previousCursor: null,
					});
					dispatch(
						notificationsActions.setNotifications([
							{ channelId: groupReducer.activeChannelId, count: updatedMessages.length },
						])
					);
					handleScrollToRecent();
				}
			}
		}

		const intervalId = setInterval(pollData, 2000);
		return () => clearInterval(intervalId);
	}, [arProvider.walletAddress, cliProvider.lib, groupReducer, channelData]);

	async function handleScrollToRecent() {
		await new Promise((resolve) => setTimeout(resolve, 250));
		setScrollToRecent(true);
		await new Promise((resolve) => setTimeout(resolve, 250));
		setScrollToRecent(false);
	}

	// Fetch self posted message
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
				return null;
			}
		} else return null;
	}

	function getData() {
		return (
			<>
				<GroupChannelHeader channelName={getChannelName()} />
				<GroupChannelDetail
					groupId={groupReducer ? groupReducer.groupId : null}
					channelId={groupReducer ? groupReducer.activeChannelId : null}
					channelName={getChannelName()}
					channelData={channelData}
					channelHeaderData={channelHeaderData}
					handleUpdate={handleUpdate}
					scrollToRecent={scrollToRecent}
					setUpdateData={() => setUpdateData(!updateData)}
					loading={loading}
				/>
			</>
		);
	}

	return getData();
}

function getUniqueMessages(existingAssets: AssetType[], updatedAssets: AssetType[]) {
	function existsInList(obj: AssetType, list: AssetType[]) {
		return list.some((item) => item.id === obj.id);
	}

	let uniqueObjects = [];

	for (let obj of updatedAssets) {
		if (!existsInList(obj, existingAssets)) {
			uniqueObjects.push(obj);
		}
	}

	return uniqueObjects;
}
