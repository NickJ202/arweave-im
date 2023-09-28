import { IconButton } from 'components/atoms/IconButton';
import { ASSETS, REDIRECTS } from 'helpers/config';
import { language } from 'helpers/language';
import useHandleStamp from 'hooks/useHandleStamp';

import * as S from './styles';
import { IProps } from './types';

export default function MessageActions(props: IProps) {
	const { handleStamp, stampDisabled, renderStampNotifications } = useHandleStamp({
		id: props.id
	});

	async function handleUpdate() {
		await handleStamp();
		props.handleStampUpdate();
	}

	return props.id ? (
		<>
			<S.Wrapper>
				<IconButton
					type={'alt1'}
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
					type={'alt1'}
					src={ASSETS.viewblock}
					handlePress={() => window.open(REDIRECTS.viewblock(props.id), '_blank')}
					dimensions={{
						wrapper: 25,
						icon: 15,
					}}
					tooltip={language.viewblock}
				/>
			</S.Wrapper>
			{renderStampNotifications()}
		</>
	) : null;
}
