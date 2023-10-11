import { StampType } from 'lib';

export interface IProps {
	id: string;
	stamps: StampType;
	handleStampUpdate: () => void;
}
