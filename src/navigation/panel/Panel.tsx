import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { ChannelType, GroupType } from 'lib';

import { GroupDropdown } from 'components/organisms/GroupDropdown';
import { ASSETS } from 'helpers/config';
import { formatChannelName } from 'helpers/utils';
import { useClientProvider } from 'providers/ClientProvider';

import * as S from './styles';

export default function Panel() {
	const location = useLocation();
	const navigate = useNavigate();

	const cliProvider = useClientProvider();

	const [groupId, setGroupId] = React.useState<string | null>(null);
	const [group, setGroup] = React.useState<GroupType | null>(null);
	const [activeChannelId, setActiveChannelId] = React.useState<string | null>(null);

	const [showDropdown, setShowDropdown] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (location.pathname && location.pathname.length > 1) {
			const locationId = location.pathname.split('/')[1];
			if (!locationId) {
				setActiveChannelId(null);
			} else setGroupId(locationId);
		} else {
			setGroup(null);
			setGroupId(null);
			setActiveChannelId(null);
		}
	}, [location.pathname]);

	React.useEffect(() => {
		(async function () {
			if (cliProvider.lib && groupId) {
				setGroup(await cliProvider.lib.api.arClient.read(groupId));
			}
		})();
	}, [cliProvider.lib, groupId]);

	React.useEffect(() => {
		(async function () {
			if (group && !activeChannelId) {
				navigate(`${groupId}/${group.channels[0].id}`);
				setActiveChannelId(group.channels[0].id);
			}
		})();
	}, [group, activeChannelId]);

	function handleChannelChange(channelId: string) {
		setActiveChannelId(channelId);
		navigate(`${groupId}/${channelId}`);
	}

	function getChannels() {
		return group ? (
			<>
				{group.channels.map((channel: ChannelType, index: number) => {
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

	return group && activeChannelId ? (
		<>
			<S.Wrapper>
				<S.Group>
					<S.GroupAction onClick={() => setShowDropdown(!showDropdown)}>
						<span>{group ? group.title : null}</span>
						<ReactSVG src={ASSETS.arrowDown} />
					</S.GroupAction>
				</S.Group>
				<S.Channels>{getChannels()}</S.Channels>
			</S.Wrapper>
			{showDropdown && <GroupDropdown groupId={groupId} group={group} />}
		</>
	) : null;
}
