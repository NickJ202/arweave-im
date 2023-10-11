import React from 'react';
import Arweave from 'arweave';
import { ArweaveWebWallet } from 'arweave-wallet-connector';
import { defaultCacheOptions, WarpFactory } from 'warp-contracts';
import { DeployPlugin } from 'warp-contracts-plugin-deploy';

import { ClientType } from 'lib';
import { Client } from 'lib/clients';

import { Modal } from 'components/molecules/Modal';
import { API_CONFIG, AR_WALLETS, ASSETS, DRE_NODE, WALLET_PERMISSIONS } from 'helpers/config';
import { getArweaveBalanceEndpoint } from 'helpers/endpoints';
import { language } from 'helpers/language';
import { ProfileType, WalletEnum } from 'helpers/types';

import * as S from './styles';

interface ArweaveContextState {
	wallets: { type: string; logo: string }[];
	wallet: any;
	walletAddress: string | null;
	walletType: WalletEnum | null;
	availableBalance: number | null;
	handleConnect: (walletType: WalletEnum.arConnect | WalletEnum.arweaveApp) => Promise<any>;
	handleDisconnect: () => void;
	walletModalVisible: boolean;
	setWalletModalVisible: (open: boolean) => void;
	arProfile: ProfileType | null;
}

interface ArweaveProviderProps {
	children: React.ReactNode;
}

const DEFAULT_CONTEXT = {
	wallets: [],
	wallet: null,
	walletAddress: null,
	walletType: null,
	availableBalance: null,
	handleConnect() {
		console.error(language.connectorNotFound);
		return null;
	},
	handleDisconnect() {
		console.error(language.connectorNotFound);
	},
	walletModalVisible: false,
	setWalletModalVisible(_open: boolean) {},
	arProfile: null,
	streak: null,
	currencyBalances: null,
	setUpdateBalance(_updateBalance: boolean) {},
};

const ARContext = React.createContext<ArweaveContextState>(DEFAULT_CONTEXT);

export function useArweaveProvider(): ArweaveContextState {
	return React.useContext(ARContext);
}

function WalletList(props: { handleConnect: (walletType: WalletEnum.arConnect | WalletEnum.arweaveApp) => void }) {
	return (
		<S.WalletListContainer>
			{AR_WALLETS.map((wallet, index) => (
				<S.WalletListItem key={index} onClick={() => props.handleConnect(wallet.type)}>
					<img src={`${wallet.logo}`} alt={''} />
					<span>{wallet.type.charAt(0).toUpperCase() + wallet.type.slice(1)}</span>
				</S.WalletListItem>
			))}
		</S.WalletListContainer>
	);
}

export function ArweaveProvider(props: ArweaveProviderProps) {
	const wallets = AR_WALLETS;

	const [walletModalVisible, setWalletModalVisible] = React.useState<boolean>(false);

	const [wallet, setWallet] = React.useState<any>(null);
	const [walletAddress, setWalletAddress] = React.useState<string | null>(null);
	const [walletType, setWalletType] = React.useState<WalletEnum | null>(null);

	const [availableBalance, setAvailableBalance] = React.useState<number | null>(null);
	const [arProfile, setArProfile] = React.useState<ProfileType | null>(null);

	const [lib, setLib] = React.useState<ClientType | null>(null);

	React.useEffect(() => {
		const arweave = Arweave.init({
			host: API_CONFIG.arweave,
			port: API_CONFIG.port,
			protocol: API_CONFIG.protocol,
			timeout: API_CONFIG.timeout,
			logging: API_CONFIG.logging,
		});

		const warp = WarpFactory.forMainnet({
			...defaultCacheOptions,
			inMemory: true,
		}).use(new DeployPlugin());

		setLib(
			Client.init({
				arweave: arweave,
				bundlrKey: window.arweaveWallet ? window.arweaveWallet : null,
				warp: warp,
				dreNode: DRE_NODE,
			})
		);
	}, [wallet, walletAddress]);

	async function handleArConnect() {
		if (!walletAddress) {
			if (window.arweaveWallet) {
				try {
					await global.window?.arweaveWallet?.connect(WALLET_PERMISSIONS as any);
					setWalletAddress(await global.window.arweaveWallet.getActiveAddress());
					setWallet(window.arweaveWallet);
					setWalletType(WalletEnum.arConnect);
					setWalletModalVisible(false);
				} catch (e: any) {
					alert(e);
				}
			} else {
				alert(language.connectorNotFound);
			}
		}
	}

	async function handleArweaveApp() {
		const wallet = new ArweaveWebWallet({
			name: language.appName,
			logo: ASSETS.logo,
		});
		wallet.setUrl(WalletEnum.arweaveApp);
		await wallet.connect();
		wallet.on('disconnect', () => {
			handleDisconnect();
		});
		setWallet(wallet);
		setWalletType(WalletEnum.arweaveApp);
		localStorage.setItem(WalletEnum.arweaveApp, 'true');
	}

	async function handleConnect(walletType: WalletEnum.arConnect | WalletEnum.arweaveApp) {
		let walletObj: any = null;
		switch (walletType) {
			case WalletEnum.arConnect:
				handleArConnect();
				break;
			case WalletEnum.arweaveApp:
				handleArweaveApp();
				break;
			default:
				if (window.arweaveWallet || walletType === WalletEnum.arConnect) {
					handleArConnect();
					break;
				} else {
					handleArweaveApp();
					break;
				}
		}
		setWalletModalVisible(false);
		return walletObj;
	}

	async function handleDisconnect() {
		await global.window?.arweaveWallet?.disconnect();
		setWallet(null);
		setWalletType(null);
		setWalletAddress(null);
		if (localStorage.getItem(WalletEnum.arweaveApp)) localStorage.removeItem(WalletEnum.arweaveApp);
	}

	const getUserBalance = async (wallet: string) => {
		const rawBalance = await fetch(getArweaveBalanceEndpoint(wallet));
		const jsonBalance = await rawBalance.json();
		return jsonBalance / 1e12;
	};

	React.useEffect(() => {
		async function handleWallet() {
			let walletAddress: string | null = null;
			try {
				walletAddress = await global.window.arweaveWallet.getActiveAddress();

				if (walletType !== WalletEnum.arweaveApp) {
					setWalletType(WalletEnum.arConnect);
					setWallet(window.arweaveWallet);
				}
			} catch {}
			if (walletAddress) {
				setWalletAddress(walletAddress as any);
				setAvailableBalance(await getUserBalance(walletAddress));
			}
		}

		handleWallet();

		window.addEventListener('arweaveWalletLoaded', handleWallet);

		return () => {
			window.removeEventListener('arweaveWalletLoaded', handleWallet);
		};
	}, [walletType]);

	React.useEffect(() => {
		(async function () {
			if (localStorage.getItem(WalletEnum.arweaveApp)) {
				await new Promise((resolve) => setTimeout(resolve, 250));
				await handleArweaveApp();
			}
		})();
	}, []);

	React.useEffect(() => {
		(async function () {
			if (walletAddress && lib) {
				const profile = (await lib.api.getProfiles({ addresses: [walletAddress] }))[0];
				if (profile) {
					setArProfile(profile);
				}
			}
		})();
	}, [walletAddress]);

	return (
		<>
			{walletModalVisible && (
				<Modal header={language.connect} handleClose={() => setWalletModalVisible(false)}>
					<WalletList handleConnect={handleConnect} />
				</Modal>
			)}
			<ARContext.Provider
				value={{
					wallet,
					walletAddress,
					walletType,
					availableBalance,
					handleConnect,
					handleDisconnect,
					wallets,
					walletModalVisible,
					setWalletModalVisible,
					arProfile,
				}}
			>
				{props.children}
			</ARContext.Provider>
		</>
	);
}
