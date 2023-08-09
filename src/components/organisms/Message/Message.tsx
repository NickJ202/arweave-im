import React from 'react';
import Arweave from 'arweave';
import { convertFromRaw, Editor, EditorState, getDefaultKeyBinding, KeyBindingUtil, RichUtils } from 'draft-js';

import { formatAddress } from 'helpers/utils';

import * as S from './styles';
import { IProps } from './types';

export default function Message(props: IProps) {
	const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
	const [messageData, setMessageData] = React.useState<any>(null);

	// const handleRead = (serializedContent: any) => {
	// 	const rawContentFromDB = JSON.parse(serializedContent);
	// 	const contentState = convertFromRaw(rawContentFromDB);
	// 	console.log(contentState)
	// 	setEditorState(EditorState.createWithContent(contentState));
	// };

	React.useEffect(() => {
		if (props.message) {
			const rawContent = JSON.parse(props.message.node.tags.find((tag: any) => tag.name === 'Description').value);
			const contentState = convertFromRaw(rawContent);
			const newEditorState = EditorState.createWithContent(contentState);
			setEditorState(newEditorState);
		}
	}, [props.message]);

	console.log(messageData);

	return props.message ? (
		<S.Wrapper>
			<S.MAvatarWrapper></S.MAvatarWrapper>
			<S.MMessage>
				<S.MMessageHeader>
					<p>{formatAddress(props.message.node.address, false)}</p>
					<span>{props.message.node.tags.find((tag: any) => tag.name === 'Date-Created').value}</span>
				</S.MMessageHeader>
				<S.MText>
					<Editor editorState={editorState} onChange={() => {}} readOnly={true} />
					{/* <p>{messageData}</p> */}
				</S.MText>
			</S.MMessage>
		</S.Wrapper>
	) : null;
}
