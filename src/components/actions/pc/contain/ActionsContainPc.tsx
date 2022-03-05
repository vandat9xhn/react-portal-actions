import React, { useEffect, useRef } from 'react';
import {
    common_types,
    getClassModuleCss,
    useForceUpdate,
} from 'react-commons-ts';
import { ClickingOutSideFull } from 'react-click-outside-ts';
//
import {
    getScrollElms,
    pos_orientation,
    x_always,
    y_always
} from '../../../../types/common';
//
import { usePosFollowBodyOrElm } from '../../../../hooks/usePosFollowBodyOrElm';
//
//
import ActionsContainPcStyles from './ActionsContainPc.scss';

//
const CARET_HEIGHT = 10;

//
function _getClassModuleCss(className = '') {
    return getClassModuleCss({
        className: className,
        styles: ActionsContainPcStyles
    });
}

//
export interface ActionsContainPcProps {
    class_action_contain?: string;
    zIndex?: number;

    ref_btn_elm: common_types.RefElmType<Element>;
    children: React.ReactNode | React.ReactElement;
    use_caret?: boolean;

    scroll_elm?: Element;
    header_head?: number;
    pos_orientation?: pos_orientation;
    is_at_body?: boolean;

    getActionsScrollElms?: getScrollElms;

    x_always?: x_always;
    transform_x_more?: number;
    y_always?: y_always;
    transform_y_more?: number;

    callbackOpen?: () => void;
    callbackClose?: () => void;
}

//
function ActionsContainPc({
    class_action_contain = '',
    zIndex = 100,

    ref_btn_elm,
    children,
    use_caret = true,

    scroll_elm,
    header_head,
    pos_orientation,
    is_at_body = true,

    getActionsScrollElms,

    x_always,
    transform_x_more,
    y_always,
    transform_y_more,

    callbackOpen,
    callbackClose
}: ActionsContainPcProps) {
    //
    const ref_child = useRef<HTMLDivElement>(null);
    const ref_caret_pos = useRef<ReturnType<typeof getCaretPos>>({});

    //
    const {
        ref_is_open,
        ref_starting,
        ref_pos,

        handleOpen,
        handleClose
        // calculatePos,
    } = usePosFollowBodyOrElm({
        ref_base_elm: ref_btn_elm,
        getScrollElms: getScrollElms,
        getChildWidth: getChildWidth,
        getChildHeight: getChildHeight,

        header_head: header_head,
        pos_orientation: pos_orientation,
        is_at_body: is_at_body,

        x_always: x_always,
        y_always: y_always,
        transform_x_more: transform_x_more,
        transform_y_more: transform_y_more,

        callbackClose: callbackClose
    });

    const {
        top_or_bottom,
        position_y,
        transform_y,
        max_height,

        left_or_right,
        position_x,
        transform_x,

        caret_pos
    } = ref_pos.current;

    //
    const forceUpdate = useForceUpdate();

    //
    useEffect(() => {
        handleOpen({ callbackOpen: callbackOpen });
    }, []);

    //
    useEffect(() => {
        ref_caret_pos.current = getCaretPos();
        forceUpdate();
    }, [ref_pos.current]);

    // ------

    //
    function getScrollElms() {
        if (getActionsScrollElms) {
            return getActionsScrollElms();
        }

        const elm_arr: ReturnType<getScrollElms> = [window];

        if (scroll_elm) {
            elm_arr.push(scroll_elm);
        } else if (ref_btn_elm.current) {
            const elm = ref_btn_elm.current.closest('[class~=div_fix_scroll]');
            elm && elm_arr.push(elm);
        }

        return elm_arr;
    }

    //
    function getChildWidth() {
        return ref_child.current
            ? ref_child.current.getBoundingClientRect().width
            : 0;
    }

    //
    function getChildHeight() {
        return ref_child.current ? ref_child.current.scrollHeight : 0;
    }

    //
    function getCaretPos() {
        if (!ref_child.current || !ref_btn_elm.current) {
            return {};
        }

        const { top, bottom, left, right } =
            ref_btn_elm.current.getBoundingClientRect();
        const {
            top: top_child,
            bottom: bottom_child,
            left: left_child,
            right: right_child
        } = ref_child.current.getBoundingClientRect();

        const x_center = (left + right) / 2;
        const y_center = (top + bottom) / 2;

        if (caret_pos == 'top') {
            return {
                bottom: '100%',
                right: right_child - x_center
            };
        }

        if (caret_pos == 'bottom') {
            return {
                top: `100%`,
                right: right_child - x_center,
                transform: `rotate(180deg)`
            };
        }

        if (caret_pos == 'left') {
            return {
                right: '100%',
                top: y_center - top_child,
                transform: `rotate(-90deg)`
            };
        }

        if (caret_pos == 'right') {
            return {
                left: '100%',
                top: y_center - top_child,
                transform: `rotate(90deg)`
            };
        }
    }

    // -----

    //
    function handleClickOutSide() {
        handleClose({ callbackClose: callbackClose });
    }

    // ---

    if (!ref_is_open.current) {
        return null;
    }

    //
    return (
        <ClickingOutSideFull
            refs_target={[ref_btn_elm]}
            ref_child={ref_child}
            is_show={ref_is_open.current}
            handleClickOutSide={handleClickOutSide}
        >
            <div
                className={`${_getClassModuleCss(
                    'ActionsContainPc'
                )} ${_getClassModuleCss(
                    `ActionsContainPc-${is_at_body ? 'fixed' : 'abs'}`
                )} ${
                    ref_starting.current
                        ? _getClassModuleCss('ActionsContainPc-hidden')
                        : ''
                }`}
                style={{
                    [left_or_right]: position_x,
                    [top_or_bottom]: position_y,
                    transform: `translate(${transform_x}, ${transform_y})`,
                    zIndex: zIndex
                }}
            >
                <div
                    style={{
                        [`padding${caret_pos
                            .slice(0, 1)
                            .toUpperCase()}${caret_pos.slice(1)}`]: use_caret
                            ? `${CARET_HEIGHT - 1}px`
                            : undefined
                    }}
                >
                    <div
                        className={_getClassModuleCss(
                            'ActionsContainPc_contain'
                        )}
                    >
                        <div
                            ref={ref_child}
                            className={`${_getClassModuleCss(
                                'ActionsContainPc_action_contain'
                            )} ${class_action_contain}`}
                            style={{
                                maxHeight: `${
                                    max_height -
                                    (use_caret &&
                                    ['top', 'bottom'].includes(caret_pos)
                                        ? CARET_HEIGHT - 1
                                        : 0)
                                }px`
                            }}
                        >
                            {children}
                        </div>

                        {use_caret ? (
                            <div
                                className={_getClassModuleCss(
                                    'ActionsContainPc_caret'
                                )}
                                style={{
                                    ...ref_caret_pos.current
                                }}
                            ></div>
                        ) : null}
                    </div>
                </div>
            </div>
        </ClickingOutSideFull>
    );
}

export default ActionsContainPc;
