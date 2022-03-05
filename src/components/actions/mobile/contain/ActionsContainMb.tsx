import React, { useEffect } from 'react';
import { getClassModuleCss } from 'react-commons-ts';
//
import { toggleAppHiddenTemp } from '../../../../utils/toggleAppHiddenTemp';
//
import ActionsContainMbStyles from './ActionsContainMb.scss';

//
function _getClassModuleCss(className = '') {
    return getClassModuleCss({
        className: className,
        styles: ActionsContainMbStyles
    });
}

//
export interface ActionsContainMbProps {
    class_actions_mb?: string;
    class_action_bg_mb?: string;
    class_action_contain_mb?: string;
    children: React.ReactNode | React.ReactElement;

    handleClose: () => void;
    callbackOpen?: () => void;
}

//
function ActionsContainMb({
    class_actions_mb = '',
    class_action_bg_mb = '',
    class_action_contain_mb = '',
    children,

    handleClose,
    callbackOpen
}: ActionsContainMbProps) {
    //
    useEffect(() => {
        callbackOpen && callbackOpen();
        toggleAppHiddenTemp({ is_hidden: true });

        return () => {
            toggleAppHiddenTemp({ is_hidden: false });
        };
    }, []);

    // ----

    //
    function onClose(e: React.MouseEvent) {
        e.stopPropagation();
        handleClose();
    }

    //
    function stopPropagation(e: React.TouchEvent) {
        e.stopPropagation();
    }

    //
    return (
        <div
            className={`${_getClassModuleCss(
                'ActionsContainMb'
            )} ${class_actions_mb}`}
            onTouchStart={stopPropagation}
        >
            <div
                className={`${_getClassModuleCss('ActionsContainMb_bg')} ${class_action_bg_mb}`}
                onClick={onClose}
            ></div>

            <div
                className={`ActionsContainMb_contain ${class_action_contain_mb}`}
            >
                {children}
            </div>
        </div>
    );
}

export default ActionsContainMb;
