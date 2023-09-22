import React from 'react';
import { useSelector } from 'react-redux';
import { convertFromRaw, Editor, EditorState } from 'draft-js';

import { MessageEnum } from 'lib';

import { Avatar } from 'components/atoms/Avatar';
import { Loader } from 'components/atoms/Loader';
import { formatAddress, formatDate, getOwner } from 'helpers/utils';
import { RootState } from 'store';

import { Profile } from '../Profile';

import * as S from './styles';
import { IProps } from './types';

export default function Message(props: IProps) {
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
			)
			if (owner.handle) return <p>{owner.handle}</p>;
			else return <p>{formatAddress(owner.walletAddress, false)}</p>;
		} else return null;
	}

	function getDate() {
		if (!props.data) return null;
		return <span>{formatDate(props.data.dateCreated, 'epoch')}</span>;
	}

	return (
		<>
			<S.Wrapper>
				<Avatar
					owner={props.data ? props.data.owner : null}
					dimensions={{ wrapper: 32.5, icon: 22.5 }}
					callback={() => setShowProfile(!showProfile)}
				/>
				<S.MMessage>
					<S.MMessageHeader>
						{getHeader()}
						{getDate()}
					</S.MMessageHeader>
					<S.MText>
						{props.data ? (
							<Editor editorState={editorState} onChange={() => {}} readOnly={true} tabIndex={-1} />
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
