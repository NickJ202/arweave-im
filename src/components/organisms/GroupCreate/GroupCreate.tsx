import React from 'react';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { Modal } from 'components/molecules/Modal';
import { language } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';

import * as S from './styles';

export default function GroupCreate() {
	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const [showModal, setShowModal] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState<boolean>(false);

	const [title, setTitle] = React.useState<string>('');
	const [logo, setLogo] = React.useState<any>(null);
	const [logoBuffer, setLogoBuffer] = React.useState<any>(null);
	const [showLogoUpload, setShowLogoUpload] = React.useState(true);

	const logoInputRef = React.useRef<any>(null);

	function handleImageUpload(event: any) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			setLogo(reader.result);
		};
		if (file) {
			reader.readAsDataURL(file);
		}
		const readerBuff = new FileReader();
		readerBuff.onload = () => {
			setLogoBuffer(readerBuff.result);
		};
		if (file) {
			readerBuff.readAsArrayBuffer(file);
		}

		setShowLogoUpload(false);
	}

	function getSubmitDisabled() {
		return !title;
	}

	async function handleSubmit() {
		if (arProvider.walletAddress && cliProvider.lib) {
			setLoading(true);
			try {
				const group = {
					title: title,
					logo: {
						src: logo,
						buffer: logoBuffer,
					},
					owner: arProvider.walletAddress,
				};

				const id = await cliProvider.lib.api.createGroup(group);
				console.log(id);
			} catch (e: any) {
				console.error(e);
			}
			setLoading(false);
		}
	}

	return (
		<>
			<Button type={'primary'} label={language.createGroup} handlePress={() => setShowModal(true)} />
			{showModal && (
				<Modal header={language.createGroup} handleClose={() => setShowModal(false)}>
					<S.Form>
						<FormField
							label={language.title}
							value={title}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
							disabled={loading}
							invalid={{ status: false, message: null }}
						/>

						<S.ImageWrapper>
							<S.ImageHeader>
								<p>{language.logo}</p>
								<Button
									type={'primary'}
									label={language.upload}
									handlePress={() => logoInputRef.current.click()}
									disabled={loading}
									noMinWidth
								/>
							</S.ImageHeader>
							<S.Image disabled={loading}>
								{showLogoUpload && <label htmlFor={'file-input-banner'}>{language.uploadImage}</label>}
								<input
									ref={logoInputRef}
									id={'file-input-banner'}
									type={'file'}
									accept={'image/*'}
									onChange={(e: any) => handleImageUpload(e)}
									disabled={loading}
								/>
								{logo && <img src={logo} alt={'Preview'} />}
							</S.Image>
						</S.ImageWrapper>

						<S.SWrapper>
							<Button
								type={'primary'}
								label={language.submit}
								handlePress={handleSubmit}
								loading={loading}
								disabled={getSubmitDisabled() || loading}
								noMinWidth
							/>
						</S.SWrapper>
					</S.Form>
				</Modal>
			)}
		</>
	);
}
