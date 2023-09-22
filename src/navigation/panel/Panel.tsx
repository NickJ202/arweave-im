import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { ChannelType, GroupType } from 'lib';

import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { GroupDropdown } from 'components/organisms/GroupDropdown';
import { ASSETS } from 'helpers/config';
import * as urls from 'helpers/urls';
import { formatChannelName } from 'helpers/utils';
import { RootState } from 'store';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';
import { IProps } from './types';

// TODO: update groupReducer.activeChannelId on change
export default function Panel(props: IProps) {
	const navigate = useNavigate();

	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
	const [dropdownDisabled, setDropdownDisabled] = React.useState<boolean>(false);

	function handleChannelChange(channelId: string) {
		// setActiveChannelId(channelId);
		navigate(`${groupReducer.groupId}/${channelId}`);
	}

	function getChannels() {
		return groupReducer ? (
			<>
				{groupReducer.data.channels.map((channel: ChannelType, index: number) => {
					return (
						<S.Channel key={index} active={channel.id === groupReducer.activeChannelId}>
							<button onClick={() => handleChannelChange(channel.id)}>
								<span>{formatChannelName(channel.title)}</span>
							</button>
						</S.Channel>
					);
				})}
			</>
		) : null;
	}

	const Wrapper: any = props.overlay ? S.Wrapper : React.Fragment;

	return (
		<Wrapper>
			<S.PWrapper overlay={props.overlay}>
				{groupReducer ? (
					<>
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

									<IconButton type={'primary'} src={ASSETS.close} handlePress={props.handleClose} active={false} sm />
								</S.TWrapper>
							)}
							<S.Group>
								<S.GroupAction onClick={() => setShowDropdown(!showDropdown)} disabled={showDropdown}>
									<span>{groupReducer.data.title}</span>
									<ReactSVG src={ASSETS.arrowDown} />
								</S.GroupAction>
							</S.Group>
							<S.Channels>{getChannels()}</S.Channels>
						</CloseHandler>
						{showDropdown && (
							<CloseHandler
								active={showDropdown}
								disabled={!showDropdown || dropdownDisabled}
								callback={() => setShowDropdown(false)}
							>
								<GroupDropdown
									groupId={groupReducer.groupId}
									group={groupReducer.data}
									handleClose={() => setShowDropdown(false)}
									setDisabled={(disabled: boolean) => setDropdownDisabled(disabled)}
								/>
							</CloseHandler>
						)}
					</>
				) : (
					<S.LoadingWrapper>
						<Loader xSm relative />
					</S.LoadingWrapper>
				)}
			</S.PWrapper>
		</Wrapper>
	);
}
