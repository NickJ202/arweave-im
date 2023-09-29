import React from 'react';
import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import useHandleStamp from 'hooks/useHandleStamp';

import * as S from './styles';
import { IProps } from './types';

export default function MessageStamps(props: IProps) {
	const { handleStamp, stampDisabled, renderStampNotifications } = useHandleStamp({
		id: props.id,
	});

	const [count, setCount] = React.useState<number>(props.stamps ? props.stamps.total : 0);

	async function handleUpdate() {
		await handleStamp();
		setCount(count + 1);
	}

	return (
		<>
			<S.Action
				onClick={handleUpdate}
				disabled={props.stamps.connectedWalletStamped || stampDisabled}
				title={props.stamps.connectedWalletStamped ? language.messageStamped : language.stamp}
			>
				<ReactSVG src={ASSETS.stamp} />
				<span>{count}</span>
			</S.Action>
			{renderStampNotifications()}
		</>
	);
}
