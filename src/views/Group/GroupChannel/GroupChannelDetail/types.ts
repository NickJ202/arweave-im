import { ChannelHeaderResponseType, ChannelResponseType } from 'lib';

export interface IProps {
	groupId: string;
	channelId: string;
	channelName: string | null;
	channelHeaderData: ChannelHeaderResponseType | null;
	channelData: ChannelResponseType | null;
	handleUpdate: (contractId: string) => Promise<void>;
	scrollToRecent: boolean;
	setUpdateData: () => void;
}
