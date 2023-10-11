import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { getTagValue, getTxEndpoint, GQLNodeResponseType, STORAGE, TAGS } from 'lib';

import { Button } from 'components/atoms/Button';
import { GroupCreate } from 'components/organisms/GroupCreate';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import { formatAddress } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';
import * as groupActions from 'store/group/actions';

import * as S from './styles';

export default function Landing() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const [groups, setGroups] = React.useState<GQLNodeResponseType[] | null>(null);
	const [handleUpdate, setHandleUpdate] = React.useState<boolean>(false);

	React.useEffect(() => {
		dispatch(groupActions.setGroup(null));
	}, [])

	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress && cliProvider.lib) {
				const groupsResponse = await cliProvider.lib.api.getGroupsByUser({
					walletAddress: arProvider.walletAddress,
				});
				setGroups(groupsResponse.nodes);
			}
		})();
	}, [arProvider.walletAddress, cliProvider.lib, handleUpdate]);

	function getGroups() {
		if (arProvider.walletAddress) {
			if (groups === null) return <span>{`${language.loading}...`}</span>;
			if (groups.length <= 0) {
				return <span>{language.noGroups}</span>;
			} else {
				return (
					<>
						<p>{language.groupSelect}</p>
						<S.GDetailWrapper className={'scroll-wrapper'}>
							{groups.map((group: any, index: number) => {
								const groupId = group.node.id;
								const groupTitle = getTagValue(group.node.tags, TAGS.keys.ans110.title);								
								const groupLogo = getTagValue(group.node.tags, TAGS.keys.logo);

								const label = groupTitle === STORAGE.none ? formatAddress(groupId, false) : groupTitle;

								return (
									<S.GDetailLine key={index} onClick={() => navigate(groupId)}>
										{groupLogo && groupLogo !== STORAGE.none && (
											<S.GDetailLogo>
												<img src={getTxEndpoint(groupLogo)} />
											</S.GDetailLogo>
										)}
										<span>{label}</span>
									</S.GDetailLine>
								);
							})}
						</S.GDetailWrapper>
					</>
				);
			}
		} else {
			return <span>{language.walletConnectGroupView}</span>;
		}
	}

	return (
		<S.Wrapper>
			<S.IWrapper>
				<ReactSVG src={ASSETS.logo} />
			</S.IWrapper>
			<S.AWrapper>
				<S.AHeader>
					<h1>{`${language.welcomeTo} ${language.appName}`}</h1>
					<span>{language.appDescription}</span>
				</S.AHeader>
				<S.GWrapper className={'border-wrapper-primary'}>{getGroups()}</S.GWrapper>
				<S.GCWrapper>
					{arProvider.wallet ? (
						<GroupCreate setHandleUpdate={() => setHandleUpdate(!handleUpdate)} />
					) : (
						<Button
							type={'primary'}
							label={language.connect.toUpperCase()}
							handlePress={() => arProvider.setWalletModalVisible(true)}
							height={47.5}
							width={275}
						/>
					)}
				</S.GCWrapper>
			</S.AWrapper>
		</S.Wrapper>
	);
}
