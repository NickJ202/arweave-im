import { MessageType } from 'lib';

export interface IProps {
	data: MessageType | null;
	useSameOwner: boolean;
	setHandleScrollUpdate: () => void;
}
