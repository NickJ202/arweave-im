import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { MemberType } from 'lib';

import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';
import { RootState } from 'store';
import * as groupActions from 'store/group/actions';

import { GroupChannel } from './GroupChannel';

// TODO: quiet update reducer on page load / member / channel add
export default function Group() {
	const { groupId } = useParams();

	const dispatch = useDispatch();
	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress && cliProvider.lib && groupId) {
				if (!groupReducer || groupReducer.groupId !== groupId) {
					try {
						const groupState = await cliProvider.lib.api.arClient.read(groupId);
						const profiles = await cliProvider.lib.api.getProfiles({
							addresses: groupState.members.map((member: MemberType) => member.address),
						});

						dispatch(
							groupActions.setGroup({
								data: {
									...groupState,
									profiles: profiles,
								},
								groupId: groupId,
								activeChannelId: groupState.channels[0].id,
							})
						);
					} catch (e: any) {
						console.error(e);
						dispatch(groupActions.setGroup(null));
					}
				}
			}
		})();
	}, [arProvider.walletAddress, cliProvider.lib, groupId]);

	return <GroupChannel />;
}
