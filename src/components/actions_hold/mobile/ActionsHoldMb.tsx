import React, { useEffect } from 'react';
import { useBool, useHold } from 'react-commons-ts';
//
import ActionsMb, {
    ActionsMbProps
} from '../../actions/mobile/_main/ActionsMb';

//
export interface ActionsHoldMbProps {
    title_action?: ActionsMbProps['title_action'];
    class_action_contain_mb?: string;
    children: ActionsMbProps['children'];

    time_hold?: number;
    force_close?: boolean;
}

//
function ActionsHoldMb({
    title_action,
    class_action_contain_mb,
    children,

    time_hold,
    force_close
}: ActionsHoldMbProps) {
    //
    const { is_true, setIsTrue } = useBool();

    //
    const { StartHold, StopHold } = useHold({
        time: time_hold
    });

    //
    useEffect(() => {
        if (force_close != undefined) {
            handleClose();
        }
    }, [force_close]);

    // -----

    //
    function handleClose() {
        setIsTrue(false);
    }

    //
    function toggleShow() {}

    //
    function handleTouchStart() {
        StartHold(() => {
            setIsTrue(true);
        });
    }

    //
    function handleTouchEnd() {
        StopHold();
    }

    //
    return (
        <ActionsMb
            title_action={
                <div
                    className='ActionsHoldMb_title'
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {title_action}
                </div>
            }
            class_action_contain_mb={class_action_contain_mb}
            use_own_title={true}
            is_show={is_true}
            toggleShow={toggleShow}
            handleClose={handleClose}
        >
            {children}
        </ActionsMb>
    );
}

export default ActionsHoldMb;
