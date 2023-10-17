import { DefaultTheme } from 'styled-components';

import arLogo from 'assets/ar-logo.svg';
import arconnectWallet from 'assets/arconnect-wallet-logo.png';
import arrowDown from 'assets/arrow-down.svg';
import bold from 'assets/bold.svg';
import checkmark from 'assets/checkmark.svg';
import close from 'assets/close.svg';
import code from 'assets/code.svg';
import copy from 'assets/copy.svg';
import info from 'assets/info.svg';
import italic from 'assets/italic.svg';
import link from 'assets/link.svg';
import logo from 'assets/logo.svg';
import menu from 'assets/menu.svg';
import stamp from 'assets/stamp.svg';
import strikethrough from 'assets/strikethrough.svg';
import underline from 'assets/underline.svg';
import user from 'assets/user.svg';
import viewblock from 'assets/viewblock.svg';
import wallet from 'assets/wallet.svg';

import { STYLING } from './styling';
import { WalletEnum } from './types';

export const APP = {
	appKey: 'appVersion',
	appVersion: '1.0.0',
};

export const ASSETS = {
	arrowDown: arrowDown,
	bold: bold,
	checkmark: checkmark,
	close: close,
	code: code,
	copy: copy,
	info: info,
	italic: italic,
	link: link,
	logo: logo,
	menu: menu,
	stamp: stamp,
	strikethrough: strikethrough,
	underline: underline,
	user: user,
	viewblock: viewblock,
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
	panel: 'panel',
};

export const API_CONFIG = {
	arweave: 'arweave.net',
	protocol: 'https',
	port: 443,
	timeout: 40000,
	logging: false,
};

export const DRE_NODE = 'https://dre-2.warp.cc/contract';

export const DEFAULT_LOGO = 'PH6Q_PJ2tkKfVWUFboMyYSj_UTYsAu8woxmJ8q8R1Fg';

export const AR_PROFILE = {
	defaultAvatar: 'OrG-ZG2WN3wdcwvpjz1ihPe4MI24QBJUpsJGIdL85wA',
};

export const REDIRECTS = {
	twitter: {
		profile: (handle: string) => `https://twitter.com/${handle}`,
	},
	viewblock: (tx: string) => `https://viewblock.io/arweave/tx/${tx}`,
};

export const EDITOR_STYLE_MAP = (theme: DefaultTheme) => {
	return {
		CODE: {
			fontFamily: theme.typography.family.code,
			fontSize: theme.typography.size.xxxSmall,
			color: theme.colors.editor.codeLine.color,
			backgroundColor: theme.colors.editor.codeLine.background,
			padding: '0.5px 3.5px',
			lineHeight: 1.75,
			display: 'block',
			width: 'fit-content',
			maxWidth: '90%',
			borderRadius: STYLING.dimensions.borderRadius,
			border: `1px solid ${theme.colors.editor.codeLine.border}`,
		},
		LINK: {
			color: theme.colors.link.color,
		},
	};
};
