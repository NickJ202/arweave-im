import React from 'react';
import { ReactSVG } from 'react-svg';
import { convertFromRaw, Editor, EditorState } from 'draft-js';

import { MessageEnum } from 'lib';

import { AR_PROFILE, ASSETS } from 'helpers/config';
import { getTxEndpoint } from 'helpers/endpoints';
import { formatAddress, formatDate } from 'helpers/utils';

import * as S from './styles';
import { IProps } from './types';

export default function Message(props: IProps) {
	const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
	const [hasError, setHasError] = React.useState(false);

	const handleError = () => {
		setHasError(true);
	};

	const avatar =
		!hasError && props.data.owner && props.data.owner.avatar && props.data.owner.avatar !== AR_PROFILE.defaultAvatar ? (
			<img src={getTxEndpoint(props.data.owner.avatar)} onError={handleError} />
		) : (
			<ReactSVG src={ASSETS.user} />
		);
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
		if (props.data.owner) {
			if (props.data.owner.handle) return `${props.data.owner.handle}`;
			else return `${formatAddress(props.data.owner.walletAddress, false)}`;
		} else return '-';
	}

	return props.data ? (
		<S.Wrapper>
			<S.MAvatarWrapper>
				<S.Avatar>{avatar}</S.Avatar>
			</S.MAvatarWrapper>
			<S.MMessage>
				<S.MMessageHeader>
					<p>{getHeader()}</p>
					<span>{formatDate(props.data.dateCreated, 'epoch')}</span>
				</S.MMessageHeader>
				<S.MText>
					<Editor editorState={editorState} onChange={() => {}} readOnly={true} />
				</S.MText>
			</S.MMessage>
		</S.Wrapper>
	) : null;
}
