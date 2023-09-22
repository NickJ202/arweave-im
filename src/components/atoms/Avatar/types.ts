export interface IProps {
    owner: string;
    dimensions: {
        wrapper: number;
        icon: number
    };
    callback: () => void | null;
}