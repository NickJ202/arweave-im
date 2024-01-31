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
export type ValidationType = { status: boolean; message: string | null };

export type ReduxActionType = {
	type: string;
	payload: any;
};

export type GroupReduxDataType = GroupType & {
	profiles: ProfileType[];
};

export type GroupReduxType = {
	data: GroupReduxDataType;
	groupId: string;
	activeChannelId: string;
};

export type NotificationReduxType = {
	channelId: string;
	count: number;
};

export type FormFieldType = 'number' | 'password';

export type GroupActionType = 'addMember' | 'addChannel';

export type NotificationType = 'success' | 'warning' | 'neutral';
