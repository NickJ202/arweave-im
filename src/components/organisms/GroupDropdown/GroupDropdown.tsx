import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature';

import { getTxEndpoint, logValue, ProfileType } from 'lib';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { TxAddress } from 'components/atoms/TxAddress';
import { Modal } from 'components/molecules/Modal';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import { ResponseType, WalletEnum } from 'helpers/types';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';
import { RootState } from 'store';
import * as groupActions from 'store/group/actions';

import * as S from './styles';
import { IProps } from './types';

// TODO: "Only the owner can update the state of this contract"
export default function GroupDropdown(props: IProps) {
	const dispatch = useDispatch();
	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const [showModal, setShowModal] = React.useState(false);
	const [modalType, setModalType] = React.useState<'member' | 'channel' | null>(null);

	const [walletAddress, setWalletAddress] = React.useState<string>('');
	const [channelTitle, setChannelTitle] = React.useState<string>('');

	const [loading, setLoading] = React.useState<boolean>(false);
	const [submitResponse, setSubmitResponse] = React.useState<ResponseType | null>(null);

	function handleShowModal(type: 'member' | 'channel') {
		setShowModal(true);
		props.setDisabled(true);
		setModalType(type);
	}

	function getSubmitDisabled() {
		switch (modalType) {
			case 'member':
				return !walletAddress;
			case 'channel':
				return !channelTitle;
		}
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

					let id: string;
					let responseMessage: string;

					switch (modalType) {
						case 'member':
							id = await cliProvider.lib.api.addGroupMember({
								groupId: props.groupId,
								groupTitle: props.group.title,
								walletAddress: walletAddress,
								wallet: signer,
							});
							responseMessage = `${language.memberAdded}!`;
							break;
						case 'channel':
							id = await cliProvider.lib.api.addGroupChannel({
								groupId: props.groupId,
								channelTitle: channelTitle,
								owner: arProvider.walletAddress,
								wallet: signer,
							});
							responseMessage = `${language.channelCreated}!`;
							break;
					}

					logValue(`Deployed Transaction`, id, 0);

					const updatedProfiles: ProfileType[] = groupReducer.data.profiles;
					switch (modalType) {
						case 'member':
							const updatedProfile: ProfileType = (
								await cliProvider.lib.api.getProfiles({ addresses: [walletAddress] })
							)[0];
							updatedProfiles.push(updatedProfile);
							break;
						case 'channel':
							break;
					}

					const groupState = await cliProvider.lib.api.arClient.read(props.groupId);
					const updatedGroupState = {
						...groupState,
						profiles: updatedProfiles,
					};
					dispatch(groupActions.updateGroupState(updatedGroupState));

					switch (modalType) {
						case 'member':
							break;
						case 'channel':
							dispatch(groupActions.setActiveChannelId(id));
							break;
					}

					setSubmitResponse({
						status: true,
						message: responseMessage,
					});
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
					message = e.message;
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
		}
	}

	function getModal() {
		let header: string;
		let formField: React.ReactNode;

		switch (modalType) {
			case 'member':
				header = language.addGroupMember;
				formField = (
					<FormField
						label={language.walletAddress}
						value={walletAddress}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWalletAddress(e.target.value)}
						disabled={loading}
						invalid={{ status: false, message: null }}
					/>
				);
				break;
			case 'channel':
				header = language.createChannel;
				formField = (
					<FormField
						label={language.channelTitle}
						value={channelTitle}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChannelTitle(e.target.value)}
						disabled={loading}
						invalid={{ status: false, message: null }}
					/>
				);
				break;
		}

		return (
			<Modal
				header={header}
				handleClose={() => {
					setShowModal(false);
					setModalType(null);
					props.setDisabled(false);
					props.handleClose();
				}}
			>
				{submitResponse ? (
					<p>{submitResponse.message}</p>
				) : (
					<S.Form>
						{formField}
						<S.SWrapper>
							<Button
								type={'alt1'}
								label={language.submit}
								handlePress={async (e) => await handleSubmit(e)}
								loading={loading}
								disabled={getSubmitDisabled() || loading}
								noMinWidth
								formSubmit
							/>
						</S.SWrapper>
					</S.Form>
				)}
			</Modal>
		);
	}

	return (
		<>
			<S.Wrapper className={'border-wrapper-primary'}>
				<S.Header>
					<S.Logo>
						<img src={getTxEndpoint(props.group.logo)} />
					</S.Logo>
					<S.TAWrapper>
						<S.Title>
							<p>{props.group.title}</p>
						</S.Title>
						<S.GroupId>
							<p>{`${language.groupId}:`}</p>
							&nbsp;
							<TxAddress address={props.groupId} wrap={false} />
						</S.GroupId>
					</S.TAWrapper>
					<S.Close>
						<IconButton
							type={'primary'}
							sm
							warning
							src={ASSETS.close}
							handlePress={() => props.handleClose()}
							active={false}
						/>
					</S.Close>
				</S.Header>
				<S.Body>
					<S.Action onClick={() => handleShowModal('member')}>
						<span>{language.addGroupMember}</span>
					</S.Action>
					<S.Action onClick={() => handleShowModal('channel')}>
						<span>{language.createChannel}</span>
					</S.Action>
				</S.Body>
			</S.Wrapper>
			{showModal && getModal()}
		</>
	);
}
