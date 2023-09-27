import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

// TODO: handle stamp
// TODO: footer notification
export default function MessageStamps(props: IProps) {
	return (
		<S.Action
			onClick={() => {}}
			connectedWalletStamped={props.stamps.connectedWalletStamped}
			disabled={props.stamps.connectedWalletStamped}
            title={props.stamps.connectedWalletStamped ? language.messageStamped : language.stamp}
		>
			<ReactSVG src={ASSETS.stamp} />
			<span>{props.stamps.total}</span>
		</S.Action>
	);
}
