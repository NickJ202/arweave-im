import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AssetType, CURSORS } from 'lib';

import { Button } from 'components/atoms/Button';
import { Message } from 'components/organisms/Message';
import { MessageCreate } from 'components/organisms/MessageCreate';
import { Profile } from 'components/organisms/Profile';
import { language } from 'helpers/language';
import { NotificationReduxType } from 'helpers/types';
import { formatAddress, formatDate, getOwner } from 'helpers/utils';
import { RootState } from 'store';
import * as notificationActions from 'store/notifications/actions';

import * as S from './styles';
import { IProps } from './types';

export default function GroupChannelDetail(props: IProps) {
	const dispatch = useDispatch();

	const groupReducer = useSelector((state: RootState) => state.groupReducer);
	const notificationsReducer = useSelector((state: RootState) => state.notificationsReducer);

	const mWrapperRef = React.useRef<HTMLDivElement | null>(null);

	const [handleScrollUpdate, setHandleScrollUpdate] = React.useState<boolean>(false);
	const [showHeaderProfile, setShowHeaderProfile] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (mWrapperRef.current && props.scrollToRecent && props.channelData) {
			mWrapperRef.current.scrollTop = mWrapperRef.current.scrollHeight - mWrapperRef.current.clientHeight;
		}
	}, [handleScrollUpdate, props.scrollToRecent, props.channelData]);

	function handleScroll() {
		if (
			mWrapperRef.current &&
			mWrapperRef.current.scrollHeight / mWrapperRef.current.scrollTop > 5 &&
			!props.scrollToRecent
		) {
			if (props.channelData && props.channelData.nextCursor && props.channelData.nextCursor !== CURSORS.end) {
				props.setUpdateData();
			}
		}
	}

	function handleNotificationsClear() {
		if (
			notificationsReducer &&
			notificationsReducer.find(
				(notificationObject: NotificationReduxType) => notificationObject.channelId === groupReducer.activeChannelId
			)
		) {
			dispatch(notificationActions.clearNotifications(groupReducer.activeChannelId));
		}
	}

	function getHeader() {
		if (props.channelHeaderData && groupReducer) {
			const owner = getOwner(groupReducer, props.channelHeaderData.initialOwner);
			return (
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
			);
		} else return <p>{`${language.fetching}...`}</p>;
	}

	function getChannelData() {
		if (props.channelData) {
			return (
				<>
					{props.loading &&
						!props.scrollToRecent &&
						Array.from({ length: 10 }, (_, i) => i + 1).map((index: number) => {
							return <Message key={index} data={null} useSameOwner={false} setHandleScrollUpdate={() => {}} />;
						})}

					{props.channelData.data.length > 0 ? (
						props.channelData.data.map((asset: AssetType, index: number) => {
							let useSameOwner: boolean = false;
							const timeIntervalThreshold = 3600000;
							if (index > 0) {
								const currentData = props.channelData.data[index - 1];
								const timeDifference =
									new Date(asset.dateCreated).getTime() - new Date(currentData.dateCreated).getTime();

								useSameOwner = asset.owner === currentData.owner && timeDifference < timeIntervalThreshold;
							}
							return (
								<Message
									key={index}
									data={asset}
									useSameOwner={useSameOwner}
									setHandleScrollUpdate={() => setHandleScrollUpdate(!handleScrollUpdate)}
								/>
							);
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
						return <Message key={index} data={null} useSameOwner={false} setHandleScrollUpdate={() => {}} />;
					})}
				</>
			);
		}
	}

	return (
		<>
			<S.Wrapper onClick={handleNotificationsClear}>
				<S.MWrapper className={'scroll-wrapper'} ref={mWrapperRef} onScroll={handleScroll}>
					<S.MHWrapper>{getHeader()}</S.MHWrapper>
					{getChannelData()}
				</S.MWrapper>
				<S.CWrapper>
					<MessageCreate
						channelId={props.channelId}
						groupId={props.groupId}
						placeholder={language.message(props.channelName ? props.channelName : '-')}
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
