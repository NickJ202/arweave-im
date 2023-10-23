import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';
import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature';

import {
	getRandomHex,
	getTagValue,
	getTxEndpoint,
	GQLNodeResponseType,
	MemberType,
	PROFILE_HEX_CODES,
	STORAGE,
	TAGS,
} from 'lib';

import { Avatar } from 'components/atoms/Avatar';
import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { Notification } from 'components/atoms/Notification';
import { Modal } from 'components/molecules/Modal';
import { GroupCreate } from 'components/organisms/GroupCreate';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import { ResponseType, WalletEnum } from 'helpers/types';
import { checkAddress, formatAddress } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';
import * as groupActions from 'store/group/actions';
import * as notificationActions from 'store/notifications/actions';

import * as S from './styles';

export default function Landing() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const [groups, setGroups] = React.useState<GQLNodeResponseType[] | null>(null);
	const [handleUpdate, setHandleUpdate] = React.useState<boolean>(false);
	const [showJoinGroup, setShowJoinGroup] = React.useState<boolean>(false);

	const [loading, setLoading] = React.useState<boolean>(false);
	const [submitResponse, setSubmitResponse] = React.useState<ResponseType | null>(null);

	const [groupId, setGroupId] = React.useState<string>('');

	const [showWallet, setShowWallet] = React.useState<boolean>(false);
	const [label, setLabel] = React.useState<string | null>(null);

	React.useEffect(() => {
		setTimeout(() => {
			setShowWallet(true);
		}, 200);
	}, [arProvider.walletAddress]);

	React.useEffect(() => {
		dispatch(groupActions.setGroup(null));
		dispatch(notificationActions.clearNotifications(null));
	}, []);

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

	React.useEffect(() => {
		if (!showWallet) {
			setLabel(`${language.fetching}...`);
		} else {
			if (arProvider.walletAddress) {
				if (arProvider.arProfile && arProvider.arProfile.handle) {
					setLabel(arProvider.arProfile.handle);
				} else {
					setLabel(formatAddress(arProvider.walletAddress, false));
				}
			} else {
				setLabel(language.connect);
			}
		}
	}, [showWallet, arProvider.walletAddress, arProvider.arProfile]);

	function getSubmitDisabled() {
		return !groupId || !checkAddress(groupId);
	}

	function getInvalidField() {
		if (!groupId) return { status: false, message: null };
		if (!checkAddress(groupId)) return { status: true, message: language.enterValidAddress };
		return { status: false, message: null };
	}

	function getGroups() {
		if (arProvider.walletAddress) {
			if (groups === null) return <span>{`${language.loading}...`}</span>;
			if (groups.length <= 0) {
				return <span>{language.noGroupsFound}</span>;
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

	function getWalletInformation() {
		return arProvider.walletAddress ? (
			<>
				<span>{label}</span>
			</>
		) : null;
	}

	async function handleSubmit(e: any) {
		e.preventDefault();
		if (arProvider.walletAddress && cliProvider.lib) {
			setLoading(true);
			try {
				if (arProvider.wallet && window.arweaveWallet) {
					const signer = new InjectedArweaveSigner(arProvider.wallet);
					signer.getAddress = window.arweaveWallet.getActiveAddress;
					await signer.setPublicKey();

					const groupState = await cliProvider.lib.api.arClient.read(groupId);

					if (groupState && groupState.privateGroup) {
						setSubmitResponse({
							status: false,
							message: `${language.groupJoinRestricted}`,
						});
					} else if (
						groupState &&
						groupState.members.find((member: MemberType) => member.address === arProvider.walletAddress)
					) {
						setSubmitResponse({
							status: false,
							message: `${language.groupJoinExisting}`,
						});
					} else {
						const member = {
							groupId: groupId,
							groupTitle: '',
							walletAddress: arProvider.walletAddress,
							wallet: signer,
						};

						await cliProvider.lib.api.joinGroup(member);
						setSubmitResponse({
							status: true,
							message: `${language.groupJoined}!`,
						});
						await new Promise((r) => setTimeout(r, 1000));
						setHandleUpdate(!handleUpdate);
					}
				} else {
					let message = '';
					if (arProvider.walletType === WalletEnum.arweaveApp && !arProvider.wallet['_address']) {
						message = language.arweaveAppConnectionError;
					} else {
						message = language.errorOccurred;
					}
					setLoading(false);

					setSubmitResponse({
						status: false,
						message: message,
					});
				}
			} catch (e: any) {
				console.error(e);
				let message = '';
				if (e.message) {
					message = language.invalidGroupId;
				} else if (arProvider.walletType === WalletEnum.arweaveApp && !arProvider.wallet['_address']) {
					message = language.arweaveAppConnectionError;
				} else {
					message = language.errorOccurred;
				}
				setLoading(false);
				setSubmitResponse({
					status: false,
					message: message,
				});
			}
			setLoading(false);
			setShowJoinGroup(false);

		}
	}

	return (
		<>
			<S.Wrapper>
				<S.IWrapper>
					<S.ILogo>
						<ReactSVG src={ASSETS.logo} />
					</S.ILogo>
					<S.IGraphic>
						{Object.keys(PROFILE_HEX_CODES).map((index: string) => {
							return (
								<S.IAWrapper key={index}>
									<Avatar
										key={index}
										owner={STORAGE.none}
										dimensions={{ wrapper: 32.5, icon: 22.5 }}
										callback={null}
										hexCode={getRandomHex()}
									/>
								</S.IAWrapper>
							);
						})}
					</S.IGraphic>
				</S.IWrapper>
				<S.AWrapper>
					<S.AHeader>
						<h1>{`${language.welcomeTo} ${language.appName}`}</h1>
						<span>{parse(language.appDescription)}</span>
					</S.AHeader>
					<S.WWrapper>{getWalletInformation()}</S.WWrapper>
					<S.GWrapper className={'border-wrapper-primary'}>{getGroups()}</S.GWrapper>
					<S.GCWrapper>
						{arProvider.wallet ? (
							<>
								<GroupCreate setHandleUpdate={() => setHandleUpdate(!handleUpdate)} />
								<Button
									type={'alt1'}
									label={language.joinGroup.toUpperCase()}
									handlePress={() => setShowJoinGroup(true)}
									height={47.5}
									width={275}
								/>
							</>
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
					<S.GCWrapper>
						{arProvider.walletAddress && (
							<Button type={'alt2'} label={language.disconnect} handlePress={() => arProvider.handleDisconnect()} />
						)}
					</S.GCWrapper>
				</S.AWrapper>
			</S.Wrapper>
			{showJoinGroup && (
				<Modal
					header={language.joinGroup}
					handleClose={() => {
						if (submitResponse) setHandleUpdate(!handleUpdate);
						setShowJoinGroup(false);
					}}
				>
					<S.Form>
						<FormField
							label={language.groupId}
							value={groupId}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGroupId(e.target.value)}
							disabled={loading}
							invalid={getInvalidField()}
							autoFocus
						/>
						<S.SWrapper>
							<Button
								type={'alt1'}
								label={language.submit}
								handlePress={async (e) => await handleSubmit(e)}
								loading={loading}
								disabled={getSubmitDisabled() || loading || submitResponse !== null}
								noMinWidth
								formSubmit
							/>
						</S.SWrapper>
					</S.Form>
				</Modal>
			)}
			{submitResponse && (
				<Notification
					message={submitResponse.message}
					type={submitResponse.status ? 'success' : 'warning'}
					callback={() => setSubmitResponse(null)}
				/>
			)}
		</>
	);
}
