import { pos_orientation, x_always, y_always } from '../types/common';
//
import { html_elm } from '../initial';

//
type header_head = number;
type base_elm = Element;
type child_width = number;
type child_height = number;

type transform_x_more = number;
type transform_y_more = number;

//
export function getPosXAtBody({
    child_width,
    base_elm,
    x_always = '',
    transform_x_more = 0
}: {
    child_width: child_width;
    base_elm: base_elm;
    x_always?: x_always;
    transform_x_more?: transform_x_more;
}): {
    left_or_right: 'left' | 'right';
    position_x: string;
    transform_x: string;
} {
    const { left, right } = base_elm.getBoundingClientRect();
    const { width: window_width } = html_elm.getBoundingClientRect();

    // ---- ALWAYS LEFT
    if (x_always == 'left') {
        const new_left = left + transform_x_more;

        if (new_left <= 0) {
            return {
                left_or_right: 'left',
                position_x: `0px`,
                transform_x: `0px`
            };
        }

        if (new_left + child_width >= window_width) {
            return {
                left_or_right: 'right',
                position_x: `0px`,
                transform_x: `0px`
            };
        }

        return {
            left_or_right: 'left',
            position_x: `${new_left}px`,
            transform_x: `0px`
        };
    }

    // ---- ALWAYS RIGHT
    if (x_always == 'right') {
        const new_right = right + transform_x_more;

        if (new_right >= window_width) {
            return {
                left_or_right: 'right',
                position_x: `0px`,
                transform_x: `0px`
            };
        }

        if (new_right - child_width <= 0) {
            return {
                left_or_right: 'left',
                position_x: `0px`,
                transform_x: `0px`
            };
        }

        return {
            left_or_right: 'right',
            position_x: `${window_width - new_right}px`,
            transform_x: `0px`
        };
    }

    // -------- AUTO
    const center = (left + right) / 2;
    const child_haft_width = child_width / 2;
    const new_center = center + transform_x_more;

    if (new_center >= child_haft_width) {
        // new_center
        if (window_width - new_center >= child_haft_width) {
            return {
                left_or_right: 'left',
                position_x: `${new_center}px`,
                transform_x: `-50%`
            };
        }

        // right
        return {
            left_or_right: 'right',
            position_x: `0px`,
            transform_x: `0px`
        };
    }

    return {
        left_or_right: 'left',
        position_x: `0px`,
        transform_x: `0px`
    };
}

//
export function getPosYAtBody({
    base_elm,
    header_head = 55,
    y_always = '',
    transform_y_more = 0
}: {
    base_elm: base_elm;
    header_head?: header_head;
    y_always?: y_always;
    transform_y_more?: transform_y_more;
}): {
    top_or_bottom: 'top' | 'bottom';
    position_y: string;
    transform_y: string;
    max_height: number;
    caret_pos: 'bottom' | 'top';
} {
    const { top, bottom } = base_elm.getBoundingClientRect();
    const new_top = top + transform_y_more;
    const new_bottom = bottom + transform_y_more;

    const h_top = new_top - header_head;
    const h_bottom = innerHeight - new_bottom;

    if ((h_top > h_bottom && y_always == '') || y_always == 'bottom') {
        return {
            top_or_bottom: 'top',
            position_y: `${new_top + 0}px`,
            transform_y: '-100%',
            max_height: h_top,

            caret_pos: 'bottom'
        };
    }

    return {
        top_or_bottom: 'top',
        position_y: `${new_bottom + 0}px`,
        transform_y: '0%',
        max_height: h_bottom,

        caret_pos: 'top'
    };
}

// ------

//
export function getPosXAtBodyOrientationX({
    base_elm,
    x_always = '',
    transform_x_more = 0
}: {
    base_elm: base_elm;
    x_always?: x_always;
    transform_x_more?: transform_x_more;
}): {
    left_or_right: 'left' | 'right';
    position_x: string;
    transform_x: string;
    max_width: number;
    caret_pos: 'left' | 'right';
} {
    const { left, right } = base_elm.getBoundingClientRect();
    const new_left = left + transform_x_more;
    const new_right = right + transform_x_more;

    const w_left = new_left;
    const w_right = innerWidth - new_right;

    if ((w_left > w_right && x_always == '') || x_always == 'right') {
        return {
            left_or_right: 'left',
            position_x: `${new_left + scrollX}px`,
            transform_x: `-100%`,
            max_width: w_left,

            caret_pos: 'right'
        };
    }

    return {
        left_or_right: 'left',
        position_x: `${new_right + scrollX}px`,
        transform_x: '0px',
        max_width: w_right,

        caret_pos: 'left'
    };
}

//
export function getPosYAtBodyOrientationX({
    child_height,
    base_elm,
    y_always = '',
    transform_y_more = 0
}: {
    child_height: child_height;
    base_elm: base_elm;
    y_always?: y_always;
    transform_y_more?: transform_y_more;
}): {
    top_or_bottom: 'top' | 'bottom';
    position_y: string;
    transform_y: string;
} {
    const { top, bottom } = base_elm.getBoundingClientRect();
    const window_height = innerHeight;
    // const { height: window_height } = html_elm.getBoundingClientRect();

    // ---- ALWAYS TOP
    if (y_always == 'top') {
        const new_top = top + transform_y_more;

        if (new_top <= 0) {
            return {
                top_or_bottom: 'top',
                position_y: `0px`,
                transform_y: `${0}px`
            };
        }

        if (new_top + child_height >= window_height) {
            return {
                top_or_bottom: 'bottom',
                position_y: `0px`,
                transform_y: `${0}px`
            };
        }

        return {
            top_or_bottom: 'top',
            position_y: `${new_top}px`,
            transform_y: `0px`
        };
    }

    // ---- ALWAYS BOTTOM
    if (y_always == 'bottom') {
        const new_bottom = bottom + transform_y_more;

        if (new_bottom >= window_height) {
            return {
                top_or_bottom: 'bottom',
                position_y: `0px`,
                transform_y: `0px`
            };
        }

        if (new_bottom - child_height <= 0) {
            return {
                top_or_bottom: 'top',
                position_y: `0px`,
                transform_y: `0px`
            };
        }

        return {
            top_or_bottom: 'bottom',
            position_y: `${window_height - new_bottom}px`,
            transform_y: `0px`
        };
    }

    // -------- AUTO
    const center = (top + bottom) / 2;
    const child_haft_height = child_height / 2;
    const new_center = center + transform_y_more;

    if (new_center >= child_haft_height) {
        // new_center
        if (window_height - new_center >= child_haft_height) {
            return {
                top_or_bottom: 'top',
                position_y: `${new_center}px`,
                transform_y: `-50%`
            };
        }

        // bottom
        return {
            top_or_bottom: 'bottom',
            position_y: `0px`,
            transform_y: `0px`
        };
    }

    return {
        top_or_bottom: 'top',
        position_y: `0px`,
        transform_y: `0px`
    };
}

// ------

//
export function getPosAtBody({
    base_elm,
    child_width,
    child_height,
    header_head = 56,

    x_always = '',
    y_always = '',
    transform_x_more = 0,
    transform_y_more = 0,

    pos_orientation = 'y'
}: {
    base_elm: base_elm;
    child_width: child_width;
    child_height: child_height;
    header_head?: header_head;

    x_always?: x_always;
    y_always?: y_always;
    transform_x_more?: transform_x_more;
    transform_y_more?: transform_y_more;

    pos_orientation: pos_orientation;
}) {
    if (pos_orientation == 'y') {
        return {
            ...getPosXAtBody({
                child_width: child_width,
                base_elm: base_elm,

                x_always: x_always,
                transform_x_more: transform_x_more
            }),
            ...getPosYAtBody({
                base_elm: base_elm,
                header_head: header_head,

                y_always: y_always,
                transform_y_more: transform_y_more
            })
        };
    }

    return {
        ...getPosXAtBodyOrientationX({
            base_elm: base_elm,
            x_always: x_always,
            transform_x_more: transform_x_more
        }),
        ...getPosYAtBodyOrientationX({
            base_elm: base_elm,
            child_height: child_height,

            y_always: y_always,
            transform_y_more: transform_y_more
        }),
        max_height: innerHeight - header_head
    };
}
