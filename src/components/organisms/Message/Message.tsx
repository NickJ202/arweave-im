import React from 'react';
import { useSelector } from 'react-redux';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { useTheme } from 'styled-components';

import { MessageEnum } from 'lib';

import { Avatar } from 'components/atoms/Avatar';
import { Loader } from 'components/atoms/Loader';
import { MessageActions } from 'components/molecules/MessageActions';
import { EDITOR_STYLE_MAP } from 'helpers/config';
import { formatAddress, formatDate, getOwner } from 'helpers/utils';
import { RootState } from 'store';

import { Profile } from '../Profile';

import * as S from './styles';
import { IProps } from './types';

// TODO: first message hover issue actions
export default function Message(props: IProps) {
	const theme = useTheme();

	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

	const [showProfile, setShowProfile] = React.useState<boolean>(false);

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
						const updatedEditorState = EditorState.createWithContent(contentState);
						setEditorState(updatedEditorState);
					}
				} catch (e: any) {
					console.error(e);
				}
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
		} else return null;
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

	return (
		<>
			<S.Wrapper textOnly={props.useSameOwner} disabled={!props.data}>
				<S.AWrapper>
					<MessageActions id={props.data ? props.data.id : null} />
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
							<Editor customStyleMap={EDITOR_STYLE_MAP(theme)} editorState={editorState} onChange={() => {}} readOnly={true} tabIndex={-1} />
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
					{/* <S.MFooter>

					</S.MFooter> */}
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
