import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature';

import { logValue, ProfileType } from 'lib';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { Modal } from 'components/molecules/Modal';
import { language } from 'helpers/language';
import { ResponseType, WalletEnum } from 'helpers/types';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';
import { RootState } from 'store';
import * as groupActions from 'store/group/actions';

import * as S from './styles';
import { IProps } from './types';

// TODO: notification
export default function GroupAction(props: IProps) {
	const dispatch = useDispatch();
	const groupReducer = useSelector((state: RootState) => state.groupReducer);

	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const [loading, setLoading] = React.useState<boolean>(false);
	const [submitResponse, setSubmitResponse] = React.useState<ResponseType | null>(null);

	const [walletAddress, setWalletAddress] = React.useState<string>('');
	const [channelTitle, setChannelTitle] = React.useState<string>('');

	function getSubmitDisabled() {
		switch (props.type) {
			case 'addMember':
				return !walletAddress;
			case 'addChannel':
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

					switch (props.type) {
						case 'addMember':
							id = await cliProvider.lib.api.addGroupMember({
								groupId: props.groupId,
								groupTitle: props.group.title,
								walletAddress: walletAddress,
								wallet: signer,
							});
							responseMessage = `${language.memberAdded}!`;
							break;
						case 'addChannel':
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
					switch (props.type) {
						case 'addMember':
							const updatedProfile: ProfileType = (
								await cliProvider.lib.api.getProfiles({ addresses: [walletAddress] })
							)[0];
							updatedProfiles.push(updatedProfile);
							break;
						case 'addChannel':
							break;
					}

					setTimeout(async () => {
						try {
							const groupState = await cliProvider.lib.api.arClient.read(props.groupId);
							const updatedGroupState = {
								...groupState,
								profiles: updatedProfiles,
							};
							dispatch(groupActions.updateGroupState(updatedGroupState));

							switch (props.type) {
								case 'addMember':
									break;
								case 'addChannel':
									dispatch(groupActions.setActiveChannelId(id));
									break;
							}
						} catch (e: any) {
							console.error(e);
						}
					}, 1000);

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

		switch (props.type) {
			case 'addMember':
				header = language.addGroupMember;
				formField = (
					<FormField
						label={language.walletAddress}
						value={walletAddress}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWalletAddress(e.target.value)}
						disabled={loading}
						invalid={{ status: false, message: null }}
						autoFocus
					/>
				);
				break;
			case 'addChannel':
				header = language.createChannel;
				formField = (
					<FormField
						label={language.channelTitle}
						value={channelTitle}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChannelTitle(e.target.value)}
						disabled={loading}
						invalid={{ status: false, message: null }}
						autoFocus
					/>
				);
				break;
		}
		return (
			<Modal header={header} handleClose={props.handleClose}>
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

	return getModal();
}
