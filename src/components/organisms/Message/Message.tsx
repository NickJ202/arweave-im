import * as S from './styles';
import { IProps } from './types';

export default function Message(props: IProps) {
	return (
		<S.Wrapper>
			<S.MAvatarWrapper></S.MAvatarWrapper>
			<S.MMessage>
				<S.MMessageHeader>
					<p>{props.message.author}</p>
					<span>{'7:18 PM'}</span>
				</S.MMessageHeader>
				<S.MText>
					<p>{props.message.text}</p>
				</S.MText>
			</S.MMessage>
		</S.Wrapper>
	);
}
