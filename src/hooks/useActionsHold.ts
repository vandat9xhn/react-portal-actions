import { useEffect, useState } from 'react';
import { useHold } from 'react-commons-ts';

//
export interface useActionsHoldProps {
    time_hold?: number;
    time_leave?: number;
    force_close?: boolean;
}

//
export function useActionsHold({
    time_hold = 500,
    time_leave = 800,
    force_close
}: useActionsHoldProps) {
    //
    const [is_show, setIsShow] = useState(false);

    //
    const { StartHold: StartHoldEnter, StopHold: StopHoldEnter } = useHold({
        time: time_hold
    });
    const { StartHold: StartHoldLeave, StopHold: StopHoldLeave } = useHold({
        time: time_leave
    });

    //
    useEffect(() => {
        if (force_close != undefined) {
            StopHoldEnter();
            setIsShow(false);
        }
    }, [force_close]);

    // ------

    function toggleShow() {}

    function handleClose() {
        if (is_show) {
            StopHoldEnter();
            setIsShow(false);
        }
    }

    // ------

    //
    function handleMouseEnter() {
        StopHoldLeave();

        StartHoldEnter(() => {
            setIsShow(true);
        });
    }

    //
    function handleMouseLeave() {
        StopHoldEnter();

        StartHoldLeave(() => {
            setIsShow(false);
        });
    }

    // ----

    return {
        is_show,
        toggleShow,
        handleClose,
        handleMouseEnter,
        handleMouseLeave
    };
}
