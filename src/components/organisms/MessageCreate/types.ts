export interface IProps {
	groupId: string;
	channelId: string;
	placeholder: string | null;
	handleUpdate: (contractId: string) => Promise<void>;
}
