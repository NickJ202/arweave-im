import { language } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

export default function ChannelHeader(props: IProps) {
	return (
		<S.Wrapper>
			<S.Title>
				<span>{props.header}</span>
			</S.Title>
			{props.members && (
				<S.MemberCount>
					<span>{`${language.members}: (${props.members.length})`}</span>
				</S.MemberCount>
			)}
		</S.Wrapper>
	);
}
