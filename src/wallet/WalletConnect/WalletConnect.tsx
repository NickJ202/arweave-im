import React from 'react';

import { Avatar } from 'components/atoms/Avatar';
import { Profile } from 'components/organisms/Profile';
import { language } from 'helpers/language';
import { formatAddress } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';

export default function WalletConnect(_props: { callback?: () => void }) {
	const arProvider = useArweaveProvider();

	const [showWallet, setShowWallet] = React.useState<boolean>(false);
	const [showWalletDropdown, setShowWalletDropdown] = React.useState<boolean>(false);
	const [showProfile, setShowProfile] = React.useState<boolean>(false);

	const [copied, setCopied] = React.useState<boolean>(false);
	const [label, setLabel] = React.useState<string | null>(null);

	React.useEffect(() => {
		setTimeout(() => {
			setShowWallet(true);
		}, 200);
	}, [arProvider.walletAddress]);

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

	function handlePress() {
		if (arProvider.walletAddress) {
			setShowWalletDropdown(true);
		} else {
			arProvider.setWalletModalVisible(true);
		}
	}

	const copyAddress = React.useCallback(async () => {
		if (arProvider.walletAddress) {
			if (arProvider.walletAddress.length > 0) {
				await navigator.clipboard.writeText(arProvider.walletAddress);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		}
	}, [arProvider.walletAddress]);

	function handleDisconnect() {
		arProvider.handleDisconnect();
		setShowWalletDropdown(false);
	}

	return (
		<>
			<CloseHandler
				callback={() => {
					setShowWalletDropdown(false);
				}}
				active={showWalletDropdown}
				disabled={false}
			>
				<S.Wrapper>
					<Avatar owner={arProvider.walletAddress} dimensions={{ wrapper: 32.5, icon: 22.5 }} callback={handlePress} />
					{showWalletDropdown && (
						<S.Dropdown className={'border-wrapper-primary'}>
							<S.DHeaderWrapper>
								<Avatar owner={arProvider.walletAddress} dimensions={{ wrapper: 32.5, icon: 22.5 }} callback={null} />
								<S.DHeader>
									<p>{label}</p>
									<span>{formatAddress(arProvider.walletAddress, false)}</span>
								</S.DHeader>
							</S.DHeaderWrapper>
							<S.DBodyWrapper>
								<li onClick={copyAddress}>{copied ? `${language.copied}!` : language.copyWalletAddress}</li>
								<li onClick={() => setShowProfile(!showProfile)}>{language.viewProfile}</li>
							</S.DBodyWrapper>
							<S.DFooterWrapper>
								<li onClick={handleDisconnect}>{language.disconnect}</li>
							</S.DFooterWrapper>
						</S.Dropdown>
					)}
				</S.Wrapper>
			</CloseHandler>
			{showProfile && (
				<Profile owner={arProvider.walletAddress} active={showProfile} handleClose={() => setShowProfile(false)} />
			)}
		</>
	);
}
