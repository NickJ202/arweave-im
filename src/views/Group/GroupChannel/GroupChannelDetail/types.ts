import { ChannelResponseType } from 'lib';

export interface IProps {
	groupId: string;
	channelId: string;
	channelName: string | null;
	channelData: ChannelResponseType | null;
	handleUpdate: (contractId: string) => Promise<void>;
	scrollToRecent: boolean;
	setUpdateData: () => void;
}
