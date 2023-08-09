import { AssetsResponseType } from 'lib';

export interface IProps {
	groupId: string;
	channelId: string;
	channelName: string | null;
	data: AssetsResponseType | null;
	handleUpdate: (contractId: string) => Promise<void>;
}
