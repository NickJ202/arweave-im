import React from 'react';
import { useSelector } from 'react-redux';

import { ChannelType, MemberType } from 'lib';

import { Avatar } from 'components/atoms/Avatar';
import { Button } from 'components/atoms/Button';
import { Profile } from 'components/organisms/Profile';
import { language } from 'helpers/language';
import { formatAddress, formatChannelName, getOwner } from 'helpers/utils';
import { RootState } from 'store';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';

export default function GroupChannelHeader() {
	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const [showMembersDropdown, setShowMembersDropdown] = React.useState<boolean>(false);

	const [activeAddress, setActiveAddress] = React.useState<string | null>(null);
	const [showProfile, setShowProfile] = React.useState<boolean>(false);

	function getChannelName() {
		if (groupReducer) {
			return formatChannelName(
				groupReducer.data.channels.find((channel: ChannelType) => channel.id === groupReducer.activeChannelId).title
			);
		} else return null;
	}

	function getHandle(address: string) {
		const owner = getOwner(groupReducer, address);
		if (owner) {
			if (owner.handle) return <p>{owner.handle}</p>;
			else return <p>{formatAddress(owner.walletAddress, false)}</p>;
		} else return null;
	}

	function getMembers() {
		if (groupReducer && groupReducer.data) {
			return (
				<>
					{groupReducer.data.members.map((member: MemberType, index: number) => {
						return (
							<>
								<S.MemberLine
									key={index}
									onClick={() => {
										setActiveAddress(member.address);
										setShowMembersDropdown(false);
										setShowProfile(!showProfile);
									}}
								>
									<Avatar owner={member.address} dimensions={{ wrapper: 27.5, icon: 17.5 }} callback={null} />
									{getHandle(member.address)}
								</S.MemberLine>
							</>
						);
					})}
				</>
			);
		} else return null;
	}

	return (
		<>
			<S.Wrapper>
				<S.Title>
					<span>{getChannelName()}</span>
				</S.Title>
				<S.Members>
					{groupReducer && (
						<CloseHandler
							active={showMembersDropdown}
							disabled={!showMembersDropdown || showProfile}
							callback={() => setShowMembersDropdown(false)}
						>
							<Button
								type={'primary'}
								label={`${groupReducer.data.members.length} ${language.members}`}
								handlePress={() => setShowMembersDropdown(!showMembersDropdown)}
								noMinWidth
							/>
							{showMembersDropdown && (
								<S.MembersDropdown className={'border-wrapper-primary'}>{getMembers()}</S.MembersDropdown>
							)}
						</CloseHandler>
					)}
				</S.Members>
			</S.Wrapper>
			{showProfile && activeAddress && (
				<Profile
					owner={activeAddress}
					active={showProfile}
					handleClose={() => {
						setActiveAddress(null);
						setShowMembersDropdown(false);
						setShowProfile(false);
					}}
				/>
			)}
		</>
	);
}
