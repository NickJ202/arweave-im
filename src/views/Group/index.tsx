import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { GroupType, MemberType, ProfileType } from 'lib';

import { GroupReduxDataType } from 'helpers/types';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';
import { RootState } from 'store';
import * as groupActions from 'store/group/actions';

import { GroupChannel } from './GroupChannel';

export default function Group() {
	const { groupId } = useParams();

	const dispatch = useDispatch();
	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress && cliProvider.lib && groupId) {
				const groupChange = !groupReducer || groupReducer.groupId !== groupId;
				const groupState: GroupType = await cliProvider.lib.api.arClient.read(groupId);
				
				let reducerData: GroupReduxDataType | null = null;
				let activeChannelId: string | null = null;

				if (groupChange) {
					const profiles: ProfileType[] = await cliProvider.lib.api.getProfiles({
						addresses: groupState.members.map((member: MemberType) => member.address),
					});
					reducerData = {
						...groupState,
						profiles: profiles,
					};
					activeChannelId = groupState.channels[0].id;
				} else {
					reducerData = {
						...groupState,
						profiles: groupReducer.data.profiles,
					};
					activeChannelId = groupReducer.activeChannelId;
				}

				try {
					dispatch(
						groupActions.setGroup({
							data: reducerData,
							groupId: groupId,
							activeChannelId: activeChannelId,
						})
					);
				} catch (e: any) {
					console.error(e);
					dispatch(groupActions.setGroup(null));
				}
			}
		})();
	}, [arProvider.walletAddress, cliProvider.lib, groupId]);

	return <GroupChannel />;
}
