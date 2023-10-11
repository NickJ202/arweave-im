import { GroupType } from 'lib';

export interface IProps {
    groupId: string;
    group: GroupType;
    type: 'addMember' | 'addChannel';
    handleClose: () => void;
}