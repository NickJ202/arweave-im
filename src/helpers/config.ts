import arLogo from 'assets/ar-logo.svg';
import arconnectWallet from 'assets/arconnect-wallet-logo.png';
import bold from 'assets/bold.svg';
import close from 'assets/close.svg';
import italic from 'assets/italic.svg';
import logo from 'assets/logo.svg';
import strikethrough from 'assets/strikethrough.svg';
import underline from 'assets/underline.svg';
import wallet from 'assets/wallet.svg';

import { WalletEnum } from './types';
export const APP = {
	appKey: 'appVersion',
	appVersion: '1.0.0',
	providerKey: 'providerVersion',
	providerVersion: '1.0.0',
};

export const ASSETS = {
	bold: bold,
	close: close,
	italic: italic,
	logo: logo,
	strikethrough: strikethrough,
	underline: underline,
	wallet: wallet,
	wallets: {
		arconnect: arconnectWallet,
		arweaveApp: arLogo,
	},
};

export const AR_WALLETS = [
	{ type: WalletEnum.arConnect, logo: ASSETS.wallets.arconnect },
	{ type: WalletEnum.arweaveApp, logo: ASSETS.wallets.arweaveApp },
];

export const WALLET_PERMISSIONS = ['ACCESS_ADDRESS', 'ACCESS_PUBLIC_KEY', 'SIGN_TRANSACTION', 'DISPATCH', 'SIGNATURE'];

export const DOM = {
	loader: 'loader',
	modal: 'modal',
	notification: 'notification'
};

export const API_CONFIG = {
	arweaveGet: 'arweave-search.goldsky.com',
	arweavePost: 'arweave.net',
	protocol: 'https',
	port: 443,
	timeout: 40000,
	logging: false,
};

export const CURRENCIES = {
	default: 'U' as 'U',
};
