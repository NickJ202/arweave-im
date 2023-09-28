import { StampType } from 'lib';

export interface IProps {
	id: string | null;
	stamps: StampType | null;
	handleStampUpdate: () => void;
}
