import React from 'react';
import { common_constant } from 'react-commons-ts';
//
import ActionsHoldPc, { ActionsHoldPcProps } from '../pc/ActionsHoldPc';
import ActionsHoldMb, { ActionsHoldMbProps } from '../mobile/ActionsHoldMb';

//
interface ActionsHoldProps extends ActionsHoldMbProps, ActionsHoldPcProps {}

//
function ActionsHold({
    title_action,
    class_action_contain,
    class_action_contain_mb,

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
}: ActionsHoldProps) {
    //
    if (common_constant.IS_MOBILE) {
        return (
            <ActionsHoldMb
                title_action={title_action}
                class_action_contain_mb={class_action_contain_mb}
                force_close={force_close}
                time_hold={time_hold}
            >
                {children}
            </ActionsHoldMb>
        );
    }

    return (
        <ActionsHoldPc
            title_action={title_action}
            class_action_contain={class_action_contain}
            scroll_elm={scroll_elm}
            x_always={x_always}
            transform_x_more={transform_x_more}
            y_always={y_always}
            transform_y_more={transform_y_more}
            time_hold={time_hold}
            time_leave={time_leave}
            force_close={force_close}
            use_caret={use_caret}
            callbackOpen={callbackOpen}
            callbackClose={callbackClose}
        >
            {children}
        </ActionsHoldPc>
    );
}

export default ActionsHold;
