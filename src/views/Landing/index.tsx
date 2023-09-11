import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getTagValue,GQLNodeResponseType, STORAGE, TAGS } from 'lib';

import { Button } from 'components/atoms/Button';
import { Modal } from 'components/molecules/Modal';
import { GroupCreate } from 'components/organisms/GroupCreate';
import { language } from 'helpers/language';
import { formatAddress } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';
import { WalletConnect } from 'wallet/WalletConnect';

import * as S from './styles';

export default function Landing() {
	const navigate = useNavigate();

	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const [groups, setGroups] = React.useState<GQLNodeResponseType[] | null>(null);

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
			return (
				<>
					<S.GWrapper>
						{groups.map((group: any, index: number) => {
							const groupId = getTagValue(group.node.tags, TAGS.keys.groupId);
							const groupTitle = getTagValue(group.node.tags, TAGS.keys.groupTitle);

							const label = groupTitle === STORAGE.none ? formatAddress(groupId, false) : groupTitle

							return (
								<Button
									key={index}
									type={'primary'}
									label={label}
									handlePress={() => navigate(groupId)}
								/>
							)
						})}
					</S.GWrapper>
					<GroupCreate />
				</>
			);
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
