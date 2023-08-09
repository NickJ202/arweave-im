import React from 'react';

import { GQLResponseType } from 'lib';

import { Message } from 'components/organisms/Message';
import { MessageCreate } from 'components/organisms/MessageCreate';
import { language } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

export default function ChannelDetail(props: IProps) {
	const mWrapperRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		if (mWrapperRef.current) {
			mWrapperRef.current.scrollTop = mWrapperRef.current.scrollHeight;
		}
	}, [props.data]);

	return props.data ? (
		<S.Wrapper>
			<S.MWrapper ref={mWrapperRef}>
				{props.data.assets.length > 0 ? (
					props.data.assets.map((asset: GQLResponseType, index: number) => {
						return <Message key={index} data={asset} />;
					})
				) : (
					<p>{language.noMessages}</p>
				)}
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
	) : null;
}
