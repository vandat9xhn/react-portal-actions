import React from 'react';
//
import {
    useActionsHold,
    useActionsHoldProps
} from '../../../hooks/useActionsHold';
//
import ActionsPc, { ActionsPcProps } from '../../actions/pc/_main/ActionsPc';

//
export interface ActionsHoldPcProps
    extends useActionsHoldProps,
        Omit<
            ActionsPcProps,
            'toggleShow' | 'handleClose' | 'is_show' | 'use_own_title'
        > {}

//
function ActionsHoldPc({
    title_action,
    class_action_contain,
    children,

    scroll_elm,

    x_always,
    transform_x_more,
    y_always,
    transform_y_more,

    time_hold,
    time_leave,
    force_close,

    use_caret,

    callbackOpen,
    callbackClose
}: ActionsHoldPcProps) {
    //
    const {
        is_show,
        toggleShow,
        handleClose,
        handleMouseEnter,
        handleMouseLeave
    } = useActionsHold({
        time_hold: time_hold,
        time_leave: time_leave,
        force_close: force_close
    });

    //
    return (
        <div
            className='ActionsHoldPc'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <ActionsPc
                class_action_contain={class_action_contain}
                use_own_title={true}
                title_action={title_action}
                is_show={is_show}
                use_caret={use_caret}
                scroll_elm={scroll_elm}
                //
                x_always={x_always}
                transform_x_more={transform_x_more}
                y_always={y_always}
                transform_y_more={transform_y_more}
                //
                toggleShow={toggleShow}
                handleClose={handleClose}
                callbackOpen={callbackOpen}
                callbackClose={callbackClose}
            >
                {children}
            </ActionsPc>
        </div>
    );
}

export default ActionsHoldPc;
