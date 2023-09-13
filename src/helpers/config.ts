import arLogo from 'assets/ar-logo.svg';
import arconnectWallet from 'assets/arconnect-wallet-logo.png';
import arrowDown from 'assets/arrow-down.svg';
import bold from 'assets/bold.svg';
import close from 'assets/close.svg';
import info from 'assets/info.svg';
import italic from 'assets/italic.svg';
import logo from 'assets/logo.svg';
import menu from 'assets/menu.svg';
import strikethrough from 'assets/strikethrough.svg';
import underline from 'assets/underline.svg';
import user from 'assets/user.svg';
import wallet from 'assets/wallet.svg';

import { WalletEnum } from './types';
export const APP = {
	appKey: 'appVersion',
	appVersion: '1.0.0',
	providerKey: 'providerVersion',
	providerVersion: '1.0.0',
};

export const ASSETS = {
	arrowDown: arrowDown,
	bold: bold,
	close: close,
	info: info,
	italic: italic,
	logo: logo,
	menu: menu,
	strikethrough: strikethrough,
	underline: underline,
	user: user,
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
	notification: 'notification',
};

export const API_CONFIG = {
	arweave: 'arweave.net',
	protocol: 'https',
	port: 443,
	timeout: 40000,
	logging: false,
};

export const DRE_NODE = 'https://dre-1.warp.cc/contract';

export const DEFAULT_LOGO = 'PH6Q_PJ2tkKfVWUFboMyYSj_UTYsAu8woxmJ8q8R1Fg';

export const AR_PROFILE = {
	defaultAvatar: 'OrG-ZG2WN3wdcwvpjz1ihPe4MI24QBJUpsJGIdL85wA',
};
