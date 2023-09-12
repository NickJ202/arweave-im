import { GroupType } from 'lib';

export interface IProps {
    groupId: string;
    group: GroupType;
    handleClose: () => void;
    setDisabled: (disabled: boolean) => void;
}