import { FooterNotification } from 'components/atoms/FooterNotification';
import { language } from 'helpers/language';
import { useFooterNotification } from 'providers/FooterNotificationProvider';

import * as S from './styles';

export default function Footer() {
	const { activeNotification } = useFooterNotification();

	return (
		<S.Wrapper>
			<S.Title>
				<span>{language.appName}</span>
			</S.Title>
			{activeNotification && (
				<S.FNotification>
					<FooterNotification message={activeNotification} />
				</S.FNotification>
			)}
		</S.Wrapper>
	);
}
