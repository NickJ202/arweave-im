import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { GroupType, MemberType, ProfileType } from 'lib';

import { GroupReduxDataType, WalletEnum } from 'helpers/types';
import * as urls from 'helpers/urls';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';
import { RootState } from 'store';
import * as groupActions from 'store/group/actions';

import { GroupChannel } from './GroupChannel';

export default function Group() {
	const navigate = useNavigate();
	const { groupId } = useParams();

	const dispatch = useDispatch();
	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const [authMember, setAuthMember] = React.useState<boolean>(true);

	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress && cliProvider.lib && groupId) {
				const groupState: GroupType = await cliProvider.lib.api.arClient.read(groupId);

				const memberCheck = groupState.members.find(
					(member: MemberType) => member.address === arProvider.walletAddress
				);
				setAuthMember(memberCheck !== undefined);

				let reducerData: GroupReduxDataType | null = null;
				let activeChannelId: string | null = null;

				if (memberCheck) {
					const profiles: ProfileType[] = await cliProvider.lib.api.getProfiles({
						addresses: groupState.members.map((member: MemberType) => member.address),
					});
					reducerData = {
						...groupState,
						profiles: profiles,
					};
					activeChannelId = groupReducer ? groupReducer.activeChannelId : groupState.channels[0].id;
				} else {
					reducerData = {
						...groupState,
						profiles: groupReducer ? groupReducer.data.profiles : [],
					};
					activeChannelId = groupReducer ? groupReducer.activeChannelId : null;
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

	React.useEffect(() => {
		if (!authMember || !arProvider.walletAddress) {
			if (!localStorage.getItem(WalletEnum.arweaveApp)) navigate(urls.base);
			dispatch(groupActions.setGroup(null));
		}
	}, [authMember]);

	function getGroup() {
		if (authMember) return <GroupChannel />;
		else return null;
	}

	return getGroup();
}
