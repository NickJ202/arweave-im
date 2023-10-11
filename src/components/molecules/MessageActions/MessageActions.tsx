import { IconButton } from 'components/atoms/IconButton';
import { ASSETS, REDIRECTS } from 'helpers/config';
import { language } from 'helpers/language';
import useHandleStamp from 'hooks/useHandleStamp';
import { useFooterNotification } from 'providers/FooterNotificationProvider';

import * as S from './styles';
import { IProps } from './types';

export default function MessageActions(props: IProps) {
	const { queueFooterNotification } = useFooterNotification();

	const { handleStamp, stampDisabled } = useHandleStamp({
		id: props.id,
	});

	async function handleUpdate() {
		queueFooterNotification(`${language.stampingMessage}...`);
		const resultMessage = await handleStamp();
		if (resultMessage) queueFooterNotification(resultMessage);
		props.handleStampUpdate();
	}

	return props.id ? (
		<>
			<S.Wrapper>
				<IconButton
					type={'alt2'}
					src={ASSETS.stamp}
					handlePress={handleUpdate}
					dimensions={{
						wrapper: 25,
						icon: 15,
					}}
					disabled={props.stamps.connectedWalletStamped || stampDisabled}
					tooltip={props.stamps.connectedWalletStamped ? language.messageStamped : language.stamp}
				/>
				<IconButton
					type={'alt2'}
					src={ASSETS.viewblock}
					handlePress={() => window.open(REDIRECTS.viewblock(props.id), '_blank')}
					dimensions={{
						wrapper: 25,
						icon: 15,
					}}
					tooltip={language.viewblock}
				/>
			</S.Wrapper>
		</>
	) : null;
}
