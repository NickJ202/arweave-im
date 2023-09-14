import React from 'react';

import { AssetType, CURSORS } from 'lib';

import { Message } from 'components/organisms/Message';
import { MessageCreate } from 'components/organisms/MessageCreate';
import { language } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

export default function GroupChannelDetail(props: IProps) {
	const mWrapperRef = React.useRef<HTMLDivElement | null>(null);

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

	function getChannelData() {
		if (props.channelData) {
			return (
				<>
					{props.channelData.data.length > 0 ? (
						props.channelData.data.map((asset: AssetType, index: number) => {
							return <Message key={index} data={asset} />;
						})
					) : (
						<p>{language.noMessages}</p>
					)}
				</>
			);
		}
		else {
			return (
				<>
					{Array.from({ length: 10 }, (_, i) => i + 1).map((index: number) => {
						return <Message key={index} data={null} />;
					})}
				</>
			)
		}
	}

	return (
		<S.Wrapper>
			<S.MWrapper ref={mWrapperRef} onScroll={handleScroll}>{getChannelData()}</S.MWrapper>
			<S.CWrapper>
				<MessageCreate
					channelId={props.channelId}
					groupId={props.groupId}
					placeholder={props.channelName ? language.message(props.channelName) : null}
					handleUpdate={props.handleUpdate}
				/>
			</S.CWrapper>
		</S.Wrapper>
	);
}
