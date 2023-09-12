import React from 'react';
import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature';

import { getTxEndpoint } from 'lib';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { Modal } from 'components/molecules/Modal';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import { ResponseType, WalletEnum } from 'helpers/types';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';

import * as S from './styles';
import { IProps } from './types';

export default function GroupDropdown(props: IProps) {
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
								wallet: signer,
							});
							responseMessage = `${language.channelCreated}!`;
							break;
					}

					console.log(id);

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
					<>
						{formField}
						<S.SWrapper>
							<Button
								type={'primary'}
								label={language.submit}
								handlePress={async (e) => await handleSubmit(e)}
								loading={loading}
								disabled={getSubmitDisabled() || loading}
								noMinWidth
							/>
						</S.SWrapper>
					</>
				)}
			</Modal>
		);
	}

	return (
		<>
			<S.Wrapper>
				<S.Header>
					<S.Logo>
						<img src={getTxEndpoint(props.group.logo)} />
					</S.Logo>
					<S.Title>
						<span>{props.group.title}</span>
					</S.Title>
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
