//
export type x_always = 'left' | 'right' | '';
export type y_always = 'top' | 'bottom' | '';

//
export type pos_orientation = 'y' | 'x';

//
export type getScrollElms = () => (typeof window | Element)[];

// action obj
export interface ActionMultiItemObjType {
    name: string;
    Icon?: React.ReactElement;
    title: string | React.ReactElement;
    info?: string | React.ReactElement;
}
