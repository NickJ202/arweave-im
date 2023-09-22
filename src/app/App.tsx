import React from 'react';

import { DOM } from 'helpers/config';
import { Header } from 'navigation/header';
import { Panel } from 'navigation/panel';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { Routes } from 'routes';
import { WalletBlock } from 'wallet/WalletBlock';

import * as S from './styles';

export default function App() {
	const arProvider = useArweaveProvider();

	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);

	React.useEffect(() => {
		setTimeout(() => {
			if (!arProvider.walletAddress) {
				setShowWalletBlock(true);
			} else setShowWalletBlock(false);
		}, 200);
	}, [arProvider.walletAddress]);

	return (
		<>
			<div id={DOM.loader} />
			<div id={DOM.notification} />
			<div id={DOM.modal} />
			<div id={DOM.panel} />
			{showWalletBlock && <WalletBlock />}
			<S.Panel>
				<Panel overlay={false} active={false} handleClose={null} />
			</S.Panel>
			<Header />
			<Routes />
		</>
	);
}
