import { useEffect, useRef } from 'react';
import { common_types, useForceUpdate } from 'react-commons-ts';
//
import {
    getScrollElms,
    pos_orientation,
    x_always,
    y_always
} from '../types/common';
//
import { getPosAtBody } from '../utils/getPosAtBody';
import { getPosAtElm } from '../utils/getPosAtElm';
//
import { useWaitingResize } from './useWaitingResize';

//
interface usePosFollowBodyOrElmProps {
    ref_base_elm: common_types.RefElmType<Element>;
    getScrollElms?: getScrollElms;
    getChildWidth: () => number;
    getChildHeight: () => number;
    header_head?: number;
    pos_orientation?: pos_orientation;

    x_always?: x_always;
    y_always?: y_always;
    transform_x_more?: number;
    transform_y_more?: number;

    use_closing?: false;
    time_closing?: number;

    is_at_body?: boolean;
    use_scroll?: boolean;
    use_resize?: boolean;

    callbackClose?: () => void;
    callbackChangePos?: () => void;
}

//
export function usePosFollowBodyOrElm({
    ref_base_elm,
    getScrollElms = () => [window],
    getChildWidth,
    getChildHeight,
    header_head = 56,
    pos_orientation = 'y',

    x_always = '',
    y_always = '',
    transform_x_more = 0,
    transform_y_more = 0,

    use_closing = false,
    time_closing = 200,

    is_at_body = true,
    use_scroll = true,
    use_resize = true,

    callbackClose = () => {},
    callbackChangePos = () => {}
}: usePosFollowBodyOrElmProps) {
    //
    const ref_is_open = useRef(false);
    const ref_starting = useRef(false);
    const ref_closing = useRef(false);
    const ref_pos = useRef<{
        left_or_right: 'left' | 'right';
        position_x: string;
        transform_x: string;

        top_or_bottom: 'top' | 'bottom';
        position_y: string;
        transform_y: string;

        max_height: number;
        max_width: number;

        caret_pos: 'top' | 'bottom' | 'left' | 'right';
    }>({
        left_or_right: 'left',
        position_x: '0px',
        transform_x: '0px',

        top_or_bottom: 'top',
        position_y: '0px',
        transform_y: '0px',

        max_height: 0,
        max_width: 0,

        caret_pos: 'top'
    });

    const ref_has_add_scroll = useRef(false);

    //
    const forceUpdate = useForceUpdate();

    //
    use_resize && useWaitingResize({ handleResize: calculatePos });

    //
    use_scroll &&
        useEffect(() => {
            if (ref_is_open.current) {
                const scroll_elms = getScrollElms();

                if (!ref_has_add_scroll.current && scroll_elms.length) {
                    ref_has_add_scroll.current = true;

                    for (const scroll_elm of scroll_elms) {
                        scroll_elm &&
                            scroll_elm.addEventListener('scroll', calculatePos);
                    }

                    return () => {
                        for (const scroll_elm of scroll_elms) {
                            scroll_elm &&
                                scroll_elm.removeEventListener(
                                    'scroll',
                                    calculatePos
                                );
                        }
                    };
                }
            }
        }, [ref_is_open.current]);

    // -------

    //
    function changePos() {
        if (!ref_base_elm.current) {
            return;
        }

        //
        const { top, bottom, width } =
            ref_base_elm.current.getBoundingClientRect();

        if (top < 0 || bottom > innerHeight || width == 0) {
            handleClose({ callbackClose: callbackClose });

            return;
        }

        //
        const getPost = is_at_body ? getPosAtBody : getPosAtElm;

        ref_pos.current = {
            ...ref_pos.current,
            ...getPost({
                base_elm: ref_base_elm.current,
                child_width: getChildWidth(),
                child_height: getChildHeight(),
                header_head: header_head,
                pos_orientation: pos_orientation,

                x_always: x_always,
                y_always: y_always,
                transform_x_more: transform_x_more,
                transform_y_more: transform_y_more
            })
        };

        forceUpdate();
    }

    //
    async function handleOpen({ callbackOpen = forceUpdate }) {
        ref_starting.current = true;
        ref_is_open.current = true;
        callbackOpen();

        setTimeout(() => {
            ref_starting.current = false;
            changePos();
            forceUpdate();
        }, 0);
    }

    //
    function handleClose({ callbackClose = forceUpdate }) {
        use_closing && (ref_closing.current = true);
        ref_is_open.current = false;
        ref_starting.current = false;

        if (use_closing) {
            forceUpdate();

            setTimeout(() => {
                ref_closing.current = false;
                callbackClose();
            }, time_closing);
        } else {
            callbackClose();
        }
    }

    //
    function calculatePos() {
        if (!ref_is_open.current) {
            return;
        }

        changePos();
        // forceUpdate();
    }

    //
    return {
        ref_is_open,
        ref_starting,
        ref_closing,
        ref_pos,

        handleOpen,
        handleClose,
        calculatePos
    };
}
