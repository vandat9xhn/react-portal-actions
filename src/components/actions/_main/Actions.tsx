import React from 'react';
import 'react-portal-actions-css/dist/static/css/action_common.min.css';
import { common_constant } from 'react-commons-ts';
//
import ActionsPc, { ActionsPcProps } from '../pc/_main/ActionsPc';
import ActionsMb, { ActionsMbProps } from '../mobile/_main/ActionsMb';

//
export interface ActionsProps extends ActionsMbProps, ActionsPcProps {}

//
function Actions({
    class_actions_mb,
    class_action_contain,
    class_action_contain_mb,

    title_action,
    use_title,
    use_own_title,
    is_show,
    children,

    scroll_elm,
    pos_orientation,
    is_at_body = true,
    header_head,

    getActionsScrollElms,

    x_always,
    transform_x_more,
    y_always,
    transform_y_more,

    use_caret,

    toggleShow,
    handleClose,
    callbackOpen,
    callbackClose
}: ActionsProps) {
    //
    if (common_constant.IS_MOBILE) {
        return (
            <ActionsMb
                class_actions_mb={class_actions_mb}
                class_action_contain_mb={class_action_contain_mb}
                title_action={title_action}
                use_own_title={use_own_title}
                use_title={use_title}
                is_show={is_show}
                children={children}
                //
                handleClose={handleClose}
                callbackOpen={callbackOpen}
                toggleShow={toggleShow}
            />
        );
    }

    //
    return (
        <ActionsPc
            title_action={title_action}
            use_own_title={use_own_title}
            is_show={is_show}
            class_action_contain={class_action_contain}
            children={children}
            //
            scroll_elm={scroll_elm}
            pos_orientation={pos_orientation}
            is_at_body={is_at_body}
            header_head={header_head}
            //
            getActionsScrollElms={getActionsScrollElms}
            //
            x_always={x_always}
            transform_x_more={transform_x_more}
            y_always={y_always}
            transform_y_more={transform_y_more}
            //
            use_caret={use_caret}
            //
            toggleShow={toggleShow}
            handleClose={handleClose}
            callbackOpen={callbackOpen}
            callbackClose={callbackClose}
        />
    );
}

export default Actions;
