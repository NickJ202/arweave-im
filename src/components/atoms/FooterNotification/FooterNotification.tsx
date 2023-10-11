import * as S from './styles';
import { IProps } from './types';

export default function FooterNotification(props: IProps) {
	return (
		<S.Wrapper>
			<span>{props.message}</span>
		</S.Wrapper>
	);
}
