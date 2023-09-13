import React from 'react';
import { ReactSVG } from 'react-svg';
import { convertFromRaw, Editor, EditorState } from 'draft-js';

import { ProfileType, TAGS } from 'lib';

import { ASSETS } from 'helpers/config';
import { getTxEndpoint } from 'helpers/endpoints';
import { formatAddress, formatDate } from 'helpers/utils';
import { useClientProvider } from 'providers/ClientProvider';

import * as S from './styles';
import { IProps } from './types';

export default function Message(props: IProps) {
	const cliProvider = useClientProvider();

	const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

	const [profile, setProfile] = React.useState<ProfileType | null>(null);
	const [hasError, setHasError] = React.useState(false);

	React.useEffect(() => {
		(async function () {
			if (cliProvider.lib && props.data) {
				setProfile(
					await cliProvider.lib.api.getProfile({
						walletAddress: props.data.node.address,
					})
				);
			}
		})();
	}, [cliProvider.lib]);

	const handleError = () => {
		setHasError(true);
	};

	const avatar =
		!hasError && profile && profile.avatar ? (
			<img src={getTxEndpoint(profile.avatar)} onError={handleError} />
		) : (
			<ReactSVG src={ASSETS.user} />
		);
	React.useEffect(() => {
		if (props.data) {
			const rawContent = props.data.node.tags.find((tag: any) => tag.name === TAGS.keys.ans110.description).value;
			if (rawContent) {
				let dataObject: any;
				try {
					dataObject = JSON.parse(`"${rawContent}"`);
				} catch (e: any) {
					dataObject = rawContent;
				}
				try {
					const contentState = convertFromRaw(JSON.parse(dataObject));
					const updatedEditorState = EditorState.createWithContent(contentState);
					setEditorState(updatedEditorState);
				} catch (e: any) {
					console.error(e);
				}
			}
		}
	}, [props.data]);

	function getHeader() {
		if (profile) {
			if (profile.handle) return `${profile.handle}`;
			else return `${formatAddress(profile.walletAddress, false)}`;
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
					<span>
						{formatDate(props.data.node.tags.find((tag: any) => tag.name === TAGS.keys.dateCreated).value, 'epoch')}
					</span>
				</S.MMessageHeader>
				<S.MText>
					<Editor editorState={editorState} onChange={() => {}} readOnly={true} />
				</S.MText>
			</S.MMessage>
		</S.Wrapper>
	) : null;
}
