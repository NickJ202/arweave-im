import React from 'react';
import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import useHandleStamp from 'hooks/useHandleStamp';
import { useFooterNotification } from 'providers/FooterNotificationProvider';

import * as S from './styles';
import { IProps } from './types';

export default function MessageStamps(props: IProps) {
	const { queueFooterNotification } = useFooterNotification();

	const { handleStamp, stampDisabled } = useHandleStamp({
		id: props.id,
	});

	const [count, setCount] = React.useState<number>(props.stamps ? props.stamps.total : 0);

	async function handleUpdate() {
		queueFooterNotification(`${language.stampingMessage}...`);
		const resultMessage = await handleStamp();
		if (resultMessage) {
			props.handleStampUpdate();
			queueFooterNotification(resultMessage);
			setCount(count + 1);
		}
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
		</>
	);
}
