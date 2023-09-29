import React from 'react';
import { useSelector } from 'react-redux';

import { AssetType, CURSORS } from 'lib';

import { Button } from 'components/atoms/Button';
import { Message } from 'components/organisms/Message';
import { MessageCreate } from 'components/organisms/MessageCreate';
import { Profile } from 'components/organisms/Profile';
import { language } from 'helpers/language';
import { formatAddress, formatDate, getOwner } from 'helpers/utils';
import { RootState } from 'store';

import * as S from './styles';
import { IProps } from './types';

export default function GroupChannelDetail(props: IProps) {
	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const mWrapperRef = React.useRef<HTMLDivElement | null>(null);

	const [showHeaderProfile, setShowHeaderProfile] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (mWrapperRef.current) {
			mWrapperRef.current.scrollTop = mWrapperRef.current.scrollHeight - mWrapperRef.current.clientHeight;
		}
	}, [props.scrollToRecent, props.channelData]);

	const handleScroll = () => {
		if (mWrapperRef.current && mWrapperRef.current.scrollTop === 0) {
			if (props.channelData && props.channelData.nextCursor && props.channelData.nextCursor !== CURSORS.end) {
				props.setUpdateData();
			}
		}
	};
	
	function getHeader() {
		if (props.channelHeaderData && groupReducer) {
			const owner = getOwner(groupReducer, props.channelHeaderData.initialOwner);
			return (
				<S.MHWrapper>
					<S.MHData>
						<p>
							<span>{language.channelCreatedOn}</span>&nbsp;
							{formatDate(props.channelHeaderData.dateCreated, 'epoch', false)}
							&nbsp;<span>{language.by}</span>&nbsp;
							<Button
							type={'alt2'}
							label={owner.handle ? owner.handle : formatAddress(owner.walletAddress, false)}
							handlePress={() => setShowHeaderProfile(true)}
						/>
						</p>
					</S.MHData>
				</S.MHWrapper>
			);
		} else return null;
	}

	// TODO: useSameOwner false after certain time interval
	function getChannelData() {
		if (props.channelData) {
			return (
				<>
					{props.channelData.data.length > 0 ? (
						props.channelData.data.map((asset: AssetType, index: number) => {
							let useSameOwner: boolean = false;
							if (index > 0) {
								useSameOwner = asset.owner === props.channelData.data[index - 1].owner;
							}
							return <Message key={index} data={asset} useSameOwner={useSameOwner} />;
						})
					) : (
						<S.EWrapper>
							<p>{language.noMessages}</p>
						</S.EWrapper>
					)}
				</>
			);
		} else {
			return (
				<>
					{Array.from({ length: 10 }, (_, i) => i + 1).map((index: number) => {
						return <Message key={index} data={null} useSameOwner={false} />;
					})}
				</>
			);
		}
	}

	return (
		<>
			<S.Wrapper>
				<S.MWrapper className={'scroll-wrapper'} ref={mWrapperRef} onScroll={handleScroll}>
					{getHeader()}
					{getChannelData()}
				</S.MWrapper>
				<S.CWrapper>
					<MessageCreate
						channelId={props.channelId}
						groupId={props.groupId}
						placeholder={props.channelName ? language.message(props.channelName) : null}
						handleUpdate={props.handleUpdate}
					/>
				</S.CWrapper>
			</S.Wrapper>
			{showHeaderProfile && (
				<Profile
					owner={props.channelHeaderData ? props.channelHeaderData.initialOwner : null}
					active={showHeaderProfile}
					handleClose={() => setShowHeaderProfile(false)}
				/>
			)}
		</>
	);
}
