import React, { useEffect } from 'react';
//
import {
    useActionsMultiList,
    useActionsMultiListProps
} from '../../../hooks/useActionsMultiList';
//
import Actions, { ActionsProps } from '../../actions/_main/Actions';
import ActionsMultiListContain, {
    ActionsMultiListContainProps
} from '../contain/ActionsMultiListContain';

//
interface ActionsMultiListProps
    extends Omit<ActionsProps, 'is_show' | 'children'>,
        Omit<ActionsMultiListContainProps, 'list_action_arr' | 'is_fetching'>,
        useActionsMultiListProps {
    whenIsShowChange?: (is_true: boolean) => void;
}

//
function ActionsMultiList({
    title_action,
    class_action_contain,
    use_title,

    scroll_elm,
    pos_orientation,
    is_at_body,
    getActionsScrollElms,

    x_always,
    y_always,
    transform_x_more,
    transform_y_more,

    class_separate,
    deps_reset_api,

    ComponentItem,
    handle_API_L,
    handleAction,

    whenIsShowChange
}: ActionsMultiListProps) {
    //
    const {
        list_action_arr,
        is_fetching,
        is_true,

        toggleBool,
        handleClose,
        callbackOpen,
        callbackClose
    } = useActionsMultiList({
        handle_API_L: handle_API_L,
        deps_reset_api: deps_reset_api
    });

    //
    useEffect(() => {
        whenIsShowChange && whenIsShowChange(is_true);
    }, [is_true]);

    //
    return (
        <div className='ActionsMultiList'>
            <Actions
                title_action={title_action}
                class_action_contain={`action-contain-pc ${class_action_contain}`}
                class_action_contain_mb={'action-contain-mb-bottom'}
                use_title={use_title}
                is_show={is_true}
                //
                scroll_elm={scroll_elm}
                pos_orientation={pos_orientation}
                is_at_body={is_at_body}
                getActionsScrollElms={getActionsScrollElms}
                //
                x_always={x_always}
                y_always={y_always}
                transform_x_more={transform_x_more}
                transform_y_more={transform_y_more}
                //
                toggleShow={toggleBool}
                handleClose={handleClose}
                callbackOpen={callbackOpen}
                callbackClose={callbackClose}
            >
                <ActionsMultiListContain
                    list_action_arr={list_action_arr}
                    is_fetching={is_fetching}
                    class_separate={class_separate}
                    //
                    ComponentItem={ComponentItem}
                    handleAction={handleAction}
                    handleClose={handleClose}
                />
            </Actions>
        </div>
    );
}

export default ActionsMultiList;
