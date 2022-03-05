import React, { useRef } from 'react';
//
import { getClassModuleCss } from 'react-commons-ts';
//
import PortalAtBody from '../../../portal_at_body/PortalAtBody';
import BtnToggle, { BtnToggleProps } from '../../../btns/btn_toggle/BtnToggle';
//
import ActionsContainPc, {
    ActionsContainPcProps
} from '../contain/ActionsContainPc';
//
import ActionsPcStyles from './ActionsPc.scss';

//
function _getClassModuleCss(className = '') {
    return getClassModuleCss({
        className: className,
        styles: ActionsPcStyles
    });
}

//
export interface ActionsPcProps
    extends Omit<ActionsContainPcProps, 'ref_btn_elm'> {
    use_own_title?: boolean;
    title_action?: BtnToggleProps['title_action'];
    is_show: boolean;
    class_action_contain?: string;

    toggleShow: () => void;
    handleClose: () => void;
}

//
function ActionsPc({
    use_own_title = false,
    title_action,
    is_show,
    class_action_contain,

    children,
    use_caret,
    zIndex,

    scroll_elm,
    pos_orientation,
    is_at_body = true,
    header_head,

    getActionsScrollElms,

    x_always,
    transform_x_more,
    y_always,
    transform_y_more,

    toggleShow,
    handleClose,
    callbackOpen,
    callbackClose
}: ActionsPcProps) {
    //
    const ref_btn_elm = useRef(null);

    //
    function onCallbackClose() {
        is_show && handleClose();
        callbackClose && callbackClose();
    }

    //
    function MyContain() {
        const Contain = (
            <ActionsContainPc
                ref_btn_elm={ref_btn_elm}
                class_action_contain={class_action_contain}
                use_caret={use_caret}
                zIndex={zIndex}
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
                callbackOpen={callbackOpen}
                callbackClose={onCallbackClose}
            >
                {children}
            </ActionsContainPc>
        );

        return is_at_body ? <PortalAtBody>{Contain}</PortalAtBody> : Contain;
    }

    //
    return (
        <div
            ref={ref_btn_elm}
            className={`${_getClassModuleCss('ActionsPc')} ${
                is_at_body ? '' : _getClassModuleCss('ActionsPc-elm')
            } ${_getClassModuleCss(
                is_show ? 'ActionsPc-show' : 'ActionsPc-hidden'
            )}`}
        >
            {use_own_title ? (
                title_action
            ) : (
                <BtnToggle
                    title_action={title_action}
                    toggleShow={toggleShow}
                />
            )}

            {is_show ? MyContain() : null}
        </div>
    );
}

export default ActionsPc;
