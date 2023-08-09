import { WalletConnect } from 'wallet/WalletConnect';

import * as S from './styles';

export default function Header() {
	return (
		<S.Wrapper>
			<S.WWrapper>
				<WalletConnect />
			</S.WWrapper>
		</S.Wrapper>
	);
}
