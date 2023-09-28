import { DOM } from 'helpers/config';

import { Portal } from '../Portal';

import * as S from './styles';
import { IProps } from './types';

export default function FooterNotification(props: IProps) {
	return (
		<Portal node={DOM.footerNotification}>
            <S.Wrapper>
				<span>{props.message}</span>
            </S.Wrapper>
		</Portal>
	);
}
