import { ChannelHeaderResponseType, ChannelResponseType } from 'lib';

export interface IProps {
	groupId: string | null;
	channelId: string | null;
	channelName: string | null;
	channelHeaderData: ChannelHeaderResponseType | null;
	channelData: ChannelResponseType | null;
	handleUpdate: (contractId: string) => Promise<void>;
	scrollToRecent: boolean;
	setUpdateData: () => void;
	loading: boolean;
}
