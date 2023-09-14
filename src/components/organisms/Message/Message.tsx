import React from 'react';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { convertFromRaw, Editor, EditorState } from 'draft-js';

import { MessageEnum, ProfileType } from 'lib';

import { Loader } from 'components/atoms/Loader';
import { AR_PROFILE, ASSETS } from 'helpers/config';
import { getTxEndpoint } from 'helpers/endpoints';
import { formatAddress, formatDate } from 'helpers/utils';
import { RootState } from 'store';

import * as S from './styles';
import { IProps } from './types';

export default function Message(props: IProps) {
	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
	const [hasError, setHasError] = React.useState(false);

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

	function getOwner() {
		if (groupReducer && props.data.owner) {
			return groupReducer.data.profiles.find((profile: ProfileType) => profile.walletAddress === props.data.owner);
		}
	}

	function getAvatar() {
		if (!props.data) return <Loader placeholder />
		const owner = getOwner();
		if (owner) {
			if (!hasError && owner.avatar && owner.avatar !== AR_PROFILE.defaultAvatar) {
				return <img src={getTxEndpoint(owner.avatar)} onError={() => setHasError(true)} />;
			} else return <ReactSVG src={ASSETS.user} />;
		}
		return <ReactSVG src={ASSETS.user} />;
	}

	function getHeader() {
		if (!props.data) return (
			<S.HLoader>
				<Loader placeholder />
			</S.HLoader>
		)
		const owner = getOwner();
		if (owner) {
			if (owner.handle) return <p>{owner.handle}</p>;
			else return <p>{formatAddress(owner.walletAddress, false)}</p>;
		} else return null;
	}

	function getDate() {
		if (!props.data) return null;
		return <span>{formatDate(props.data.dateCreated, 'epoch')}</span>
	}

	return (
		<S.Wrapper>
			<S.MAvatarWrapper>
				<S.Avatar>{getAvatar()}</S.Avatar>
			</S.MAvatarWrapper>
			<S.MMessage>
				<S.MMessageHeader>
					{getHeader()}
					{getDate()}
				</S.MMessageHeader>
				<S.MText>
					{props.data ? (
						<Editor editorState={editorState} onChange={() => {}} readOnly={true} />
					) : (
						<>
							{Array.from({ length: 2 }, (_, i) => i + 1).map((index: number) => {
								return (
									<S.MLoader key={index}>
										<Loader placeholder />
									</S.MLoader>
								)
							})}
						</>
					)}
				</S.MText>
			</S.MMessage>
		</S.Wrapper>
	);
}
