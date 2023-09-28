import React from 'react';
import { useSelector } from 'react-redux';

import { MemberType } from 'lib';

import { Avatar } from 'components/atoms/Avatar';
import { Button } from 'components/atoms/Button';
import { Profile } from 'components/organisms/Profile';
import { language } from 'helpers/language';
import { formatAddress, getOwner } from 'helpers/utils';
import { RootState } from 'store';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';
import { IProps } from './types';

export default function GroupChannelHeader(props: IProps) {
	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const [showMembersDropdown, setShowMembersDropdown] = React.useState<boolean>(false);

	const [activeAddress, setActiveAddress] = React.useState<string | null>(null);
	const [showProfile, setShowProfile] = React.useState<boolean>(false);

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
							<React.Fragment key={index}>
								<S.MemberLine
									onClick={() => {
										setActiveAddress(member.address);
										setShowMembersDropdown(false);
										setShowProfile(!showProfile);
									}}
								>
									<Avatar owner={member.address} dimensions={{ wrapper: 27.5, icon: 17.5 }} callback={null} />
									{getHandle(member.address)}
								</S.MemberLine>
							</React.Fragment>
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
					<span>{props.channelName}</span>
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
								label={`${groupReducer.data.members.length} ${
									groupReducer.data.members.length > 1 ? language.members : language.member
								}`}
								handlePress={() => setShowMembersDropdown(!showMembersDropdown)}
								noMinWidth
							/>
							{showMembersDropdown && (
								<S.MembersDropdown className={'border-wrapper-primary scroll-wrapper'}>
									<S.MDHeader>
										<p>{language.groupMembers}</p>
									</S.MDHeader>
									{getMembers()}
								</S.MembersDropdown>
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
