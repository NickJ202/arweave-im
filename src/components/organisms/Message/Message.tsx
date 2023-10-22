import React from 'react';
import { useSelector } from 'react-redux';
import { CompositeDecorator, convertFromRaw, Editor, EditorState } from 'draft-js';
import { useTheme } from 'styled-components';

import { MessageEnum, StampType } from 'lib';

import { Avatar } from 'components/atoms/Avatar';
import { Loader } from 'components/atoms/Loader';
import { MessageActions } from 'components/molecules/MessageActions';
import { MessageStamps } from 'components/molecules/MessageStamps';
import { EDITOR_STYLE_MAP } from 'helpers/config';
// import { NotificationReduxType } from 'helpers/types';
import { formatAddress, formatDate, getOwner } from 'helpers/utils';
import { RootState } from 'store';

import { Profile } from '../Profile';

import * as S from './styles';
import { IProps } from './types';

const Link = ({ contentState, entityKey, children }) => {
	const { url } = contentState.getEntity(entityKey).getData();
	return (
		<a href={url} target="_blank" rel="noopener noreferrer">
			{children}
		</a>
	);
};

const findLinkEntities = (contentBlock: any, callback: any, contentState: any) => {
	contentBlock.findEntityRanges((character: any) => {
		const entityKey = character.getEntity();
		return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
	}, callback);
};

const linkDecorator = new CompositeDecorator([
	{
		strategy: findLinkEntities,
		component: Link,
	},
]);

export default function Message(props: IProps) {
	const theme = useTheme();

	const groupReducer = useSelector((state: RootState) => state.groupReducer);
	// const notificationsReducer = useSelector((state: RootState) => state.notificationsReducer);

	const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
	const [showProfile, setShowProfile] = React.useState<boolean>(false);

	const [stamps, setStamps] = React.useState<StampType>({
		total: 0,
		vouched: 0,
		connectedWalletStamped: false,
	});
	const [handleStampUpdate, setHandleStampUpdate] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (props.data && props.data.stamps && props.data.stamps.total > 0) {
			setStamps(props.data.stamps);
		}
	}, [props.data]);

	React.useEffect(() => {
		if (handleStampUpdate) {
			setStamps({
				total: stamps.total + 1,
				vouched: stamps.vouched,
				connectedWalletStamped: true,
			});
		}
	}, [handleStampUpdate]);

	React.useEffect(() => {
		if (props.data) {
			const rawContent = props.data.message;
			if (rawContent) {
				let dataObject: any;
				try {
					dataObject = JSON.parse(`"${rawContent}"`);
				} catch (e: any) {
					dataObject = rawContent;
				}
				try {
					const parsedDataObject = JSON.parse(dataObject);
					if (parsedDataObject.type === MessageEnum.Text && parsedDataObject.data) {
						const contentState = convertFromRaw(parsedDataObject.data);
						const updatedEditorState = EditorState.createWithContent(contentState, linkDecorator);
						setEditorState(updatedEditorState);
					}
				} catch (e: any) {}
			}
		}
	}, [props.data]);

	function getHeader() {
		if (!props.data)
			return (
				<S.HLoader>
					<Loader placeholder />
				</S.HLoader>
			);

		const owner = getOwner(groupReducer, props.data.owner);
		if (owner) {
			return (
				<button onClick={() => setShowProfile(!showProfile)}>
					{owner.handle ? owner.handle : formatAddress(owner.walletAddress, false)}
				</button>
			);
		} else return '-';
	}

	function getDate() {
		if (!props.data) return null;
		return <span>{formatDate(props.data.dateCreated, 'epoch', false)}</span>;
	}

	function getShortTime() {
		if (props.data && props.data.dateCreated) {
			return formatDate(props.data.dateCreated, 'epoch', true);
		} else return null;
	}

	function getFooter() {
		if (props.data && stamps && stamps.total > 0) {
			return (
				<S.MFooter>
					<MessageStamps id={props.data.id} stamps={stamps} handleStampUpdate={() => setHandleStampUpdate(true)} />
				</S.MFooter>
			);
		}
	}

	// const notificationObject =
	// 	notificationsReducer &&
	// 	notificationsReducer.find(
	// 		(notificationObject: NotificationReduxType) => groupReducer.activeChannelId === notificationObject.channelId
	// 	);

	return (
		<>
			<S.Wrapper
				textOnly={props.useSameOwner}
				disabled={!props.data}
				// isRecent={props.data && props.data.isRecent ? (props.data.isRecent && notificationObject) : false}
				isRecent={false}
			>
				<S.AWrapper>
					{props.data && stamps && (
						<MessageActions
							id={props.data.id}
							stamps={stamps}
							handleStampUpdate={() => setHandleStampUpdate(true)}
							setHandleScrollUpdate={props.setHandleScrollUpdate}
						/>
					)}
				</S.AWrapper>
				{!props.useSameOwner && (
					<Avatar
						owner={props.data ? props.data.owner : null}
						dimensions={{ wrapper: 32.5, icon: 22.5 }}
						callback={() => setShowProfile(!showProfile)}
					/>
				)}
				<S.MMessage textOnly={props.useSameOwner}>
					{!props.useSameOwner && (
						<S.MMessageHeader>
							{getHeader()}
							{getDate()}
						</S.MMessageHeader>
					)}
					{props.useSameOwner && (
						<S.TWrapper>
							<span>{getShortTime()}</span>
						</S.TWrapper>
					)}
					<S.MText textOnly={props.useSameOwner}>
						{props.data ? (
							<Editor
								customStyleMap={EDITOR_STYLE_MAP(theme)}
								editorState={editorState}
								onChange={() => {}}
								readOnly={true}
								tabIndex={-1}
							/>
						) : (
							<>
								{Array.from({ length: 2 }, (_, i) => i + 1).map((index: number) => {
									return (
										<S.MLoader key={index}>
											<Loader placeholder />
										</S.MLoader>
									);
								})}
							</>
						)}
					</S.MText>
					{getFooter()}
				</S.MMessage>
			</S.Wrapper>
			{showProfile && (
				<Profile
					owner={props.data ? props.data.owner : null}
					active={showProfile}
					handleClose={() => setShowProfile(false)}
				/>
			)}
		</>
	);
}
