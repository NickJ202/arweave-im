import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { ChannelType, GroupType } from 'lib';

import { IconButton } from 'components/atoms/IconButton';
import { GroupDropdown } from 'components/organisms/GroupDropdown';
import { ASSETS } from 'helpers/config';
import * as urls from 'helpers/urls';
import { formatChannelName } from 'helpers/utils';
import { useClientProvider } from 'providers/ClientProvider';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';
import { IProps } from './types';

export default function Panel(props: IProps) {
	const location = useLocation();
	const navigate = useNavigate();

	const cliProvider = useClientProvider();

	const [groupId, setGroupId] = React.useState<string | null>(null);
	const [group, setGroup] = React.useState<GroupType | null>(null);
	const [activeChannelId, setActiveChannelId] = React.useState<string | null>(null);

	const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
	const [dropdownDisabled, setDropdownDisabled] = React.useState<boolean>(false);

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

	const Wrapper = props.overlay ? S.Wrapper : React.Fragment;

	return group && activeChannelId ? (
		<Wrapper>
			<S.PWrapper overlay={props.overlay}>
				<CloseHandler
					active={props.active && !showDropdown}
					disabled={!props.active || showDropdown}
					callback={props.handleClose}
				>
					{props.overlay && (
						<S.TWrapper>
							<Link to={urls.base}>
								<S.LWrapper>
									<ReactSVG src={ASSETS.logo} />
								</S.LWrapper>
							</Link>

							<IconButton
								type={'primary'}
								src={ASSETS.close}
								handlePress={props.handleClose}
								active={false}
								dimensions={{
									wrapper: 27.5,
									icon: 13.5,
								}}
							/>
						</S.TWrapper>
					)}
					<S.Group>
						<S.GroupAction onClick={() => setShowDropdown(!showDropdown)} disabled={showDropdown}>
							<span>{group ? group.title : null}</span>
							<ReactSVG src={ASSETS.arrowDown} />
						</S.GroupAction>
					</S.Group>
					<S.Channels>{getChannels()}</S.Channels>
				</CloseHandler>
			</S.PWrapper>
			{showDropdown && (
				<CloseHandler
					active={showDropdown}
					disabled={!showDropdown || dropdownDisabled}
					callback={() => setShowDropdown(false)}
				>
					<GroupDropdown
						groupId={groupId}
						group={group}
						handleClose={() => setShowDropdown(false)}
						setDisabled={(disabled: boolean) => setDropdownDisabled(disabled)}
					/>
				</CloseHandler>
			)}
		</Wrapper>
	) : null;
}
