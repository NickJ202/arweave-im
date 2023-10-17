import React from 'react';
import { useSelector } from 'react-redux';

import { MemberType } from 'lib';

import { Avatar } from 'components/atoms/Avatar';
import { Button } from 'components/atoms/Button';
import { GroupAction } from 'components/organisms/GroupAction';
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
	const [showAction, setShowAction] = React.useState(false);

	const [activeAddress, setActiveAddress] = React.useState<string | null>(null);
	const [showProfile, setShowProfile] = React.useState<boolean>(false);

	function getHandle(address: string) {
		const owner = getOwner(groupReducer, address);
		if (owner) {
			if (owner.handle) return owner.handle;
			else return formatAddress(owner.walletAddress, false);
		} 
		else return formatAddress(address, false);
	}

	function getMembers() {
		if (groupReducer && groupReducer.data) {
			return (
				<>
					<S.MemberLine onClick={() => setShowAction(true)}>
						<S.MemberAdd>{`${language.addGroupMember} +`}</S.MemberAdd>
					</S.MemberLine>
					{groupReducer.data.members.map((member: MemberType, index: number) => {
						return (
							<S.MemberLine
								key={index}
								onClick={() => {
									setActiveAddress(member.address);
									setShowMembersDropdown(false);
									setShowProfile(!showProfile);
								}}
							>
								<Avatar owner={member.address} dimensions={{ wrapper: 27.5, icon: 17.5 }} callback={null} />
								<p>{getHandle(member.address)}</p>
							</S.MemberLine>
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
								height={32.5}
								noMinWidth
							/>
							{showMembersDropdown && (
								<S.MembersDropdown className={'border-wrapper-primary'}>
									<S.MDHeader>
										<p>{language.groupMembers}</p>
									</S.MDHeader>
									<S.MDBody className={'scroll-wrapper'}>{getMembers()}</S.MDBody>
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
			{groupReducer && showAction && (
				<GroupAction
					groupId={groupReducer.groupId}
					group={groupReducer.data}
					type={'addMember'}
					handleClose={() => {
						setShowAction(false);
					}}
				/>
			)}
		</>
	);
}
