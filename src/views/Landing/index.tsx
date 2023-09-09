import React from 'react';

import { Modal } from 'components/molecules/Modal';
import { GroupCreate } from 'components/organisms/GroupCreate';
import { language } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';
import { WalletConnect } from 'wallet/WalletConnect';

import * as S from './styles';

export default function Landing() {
	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const [groups, setGroups] = React.useState<any>(null);

	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress && cliProvider.lib) {
				const groupsResponse = await cliProvider.lib.api.getGroupsByUser({
					walletAddress: arProvider.walletAddress,
				});
				setGroups(groupsResponse.nodes);
			}
		})();
	}, [arProvider.walletAddress, cliProvider.lib]);

	function getGroups() {
		if (groups === null) return <p>{`${language.loading}...`}</p>;
		if (groups.length <= 0) {
			return <GroupCreate />;
		} else {
			return <p>has groups</p>;
		}
	}

	return (
		<Modal header={language.groupSelect} handleClose={null}>
			{arProvider.walletAddress ? (
				getGroups()
			) : (
				<S.WWrapper>
					<WalletConnect />
				</S.WWrapper>
			)}
		</Modal>
	);
}
