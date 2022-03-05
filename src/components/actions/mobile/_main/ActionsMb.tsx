import React from 'react';
import { getClassModuleCss } from 'react-commons-ts';
//
import BtnToggle, { BtnToggleProps } from '../../../btns/btn_toggle/BtnToggle';
import PortalAtBody from '../../../portal_at_body/PortalAtBody';
//
import ActionsContainMb, {
    ActionsContainMbProps
} from '../contain/ActionsContainMb';
//
import ActionsMbStyles from './ActionsMb.scss';

//
function _getClassModuleCss(className = '') {
    return getClassModuleCss({
        className: className,
        styles: ActionsMbStyles
    });
}

//
export interface ActionsMbProps extends ActionsContainMbProps, BtnToggleProps {
    use_own_title?: boolean;
    use_title?: boolean;
    is_show: boolean;
}

//
function ActionsMb({
    class_actions_mb = '',
    class_action_bg_mb = '',
    class_action_contain_mb,

    title_action,
    use_own_title,
    use_title = true,
    is_show,
    children,

    toggleShow,
    handleClose,
    callbackOpen
}: ActionsMbProps) {
    //
    return (
        <div className={`${_getClassModuleCss('ActionsMb')}`}>
            {use_own_title ? (
                title_action
            ) : use_title ? (
                <BtnToggle
                    title_action={title_action}
                    toggleShow={toggleShow}
                />
            ) : null}

            {is_show ? (
                <PortalAtBody>
                    <ActionsContainMb
                        class_actions_mb={class_actions_mb}
                        class_action_bg_mb={class_action_bg_mb}
                        class_action_contain_mb={class_action_contain_mb}
                        children={children}
                        handleClose={handleClose}
                        callbackOpen={callbackOpen}
                    />
                </PortalAtBody>
            ) : null}
        </div>
    );
}

export default ActionsMb;
