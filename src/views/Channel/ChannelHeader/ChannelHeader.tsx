import * as S from './styles';
import { IProps } from './types';

export default function ChannelHeader(props: IProps) {
	return (
		<S.Wrapper>
			<span>{props.header}</span>
		</S.Wrapper>
	);
}
