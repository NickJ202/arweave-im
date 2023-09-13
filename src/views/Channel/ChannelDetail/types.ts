import { GQLResponseType } from 'lib';

export interface IProps {
	groupId: string;
	channelId: string;
	channelName: string | null;
	data: GQLResponseType | null;
	handleUpdate: (contractId: string) => Promise<void>;
	updateMessages: boolean;
}
