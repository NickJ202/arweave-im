import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { ASSETS } from 'helpers/config';
import * as urls from 'helpers/urls';
import { WalletConnect } from 'wallet/WalletConnect';

import * as S from './styles';


export default function Header() {
	return (
		<S.Wrapper>
			<Link to={urls.base}>
					<S.LWrapper>
						<ReactSVG src={ASSETS.logo} />
					</S.LWrapper>
				</Link>
			<S.WWrapper>
				<WalletConnect />
			</S.WWrapper>
		</S.Wrapper>
	);
}
