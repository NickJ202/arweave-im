import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { IconButton } from 'components/atoms/IconButton';
import { ASSETS } from 'helpers/config';
import * as urls from 'helpers/urls';
import { checkDesktop, checkWindowResize } from 'helpers/window';
import { Panel } from 'navigation/panel';
import { WalletConnect } from 'wallet/WalletConnect';

import * as S from './styles';

export default function Header() {
	const [showPanel, setShowPanel] = React.useState<boolean>(false);
	const [desktop, setDesktop] = React.useState(checkDesktop());

	function handleWindowResize() {
		if (checkDesktop()) {
			setDesktop(true);
		} else {
			setDesktop(false);
		}
	}

	checkWindowResize(handleWindowResize);

	return (
		<>
			<S.Wrapper>
				<Link to={urls.base}>
					<S.LWrapper>
						<ReactSVG src={ASSETS.logo} />
					</S.LWrapper>
				</Link>
				{!desktop && (
					<S.CWrapper>
						<IconButton
							type={'primary'}
							src={ASSETS.menu}
							handlePress={() => setShowPanel(!showPanel)}
							active={false}
							dimensions={{
								wrapper: 27.5,
								icon: 13.5,
							}}
						/>
					</S.CWrapper>
				)}
				<S.WWrapper>
					<WalletConnect />
				</S.WWrapper>
			</S.Wrapper>
			{showPanel && <Panel overlay={true} active={showPanel} handleClose={() => setShowPanel(false)} />}
		</>
	);
}
