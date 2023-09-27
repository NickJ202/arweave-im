import { GroupType } from 'lib';

export type ButtonType = 'primary' | 'alt1' | 'alt2';

export enum WalletEnum {
	arConnect = 'arconnect',
	arweaveApp = 'arweave.app',
}

export type ProfileType = {
	handle: string | null;
	avatar: string | null;
	twitter: string | null;
	discord: string | null;
	walletAddress?: string;
};

export type RefType = { current: HTMLElement };

export type DateType = 'iso' | 'epoch';

export type ResponseType = { status: boolean; message: string | null };

export type ReduxActionType = {
	type: string;
	payload: any;
};

export type GroupReduxType = {
	data: GroupType & {
		profiles: ProfileType[];
	};
	groupId: string;
	activeChannelId: string;
};
