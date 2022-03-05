import React from 'react';
import { common_constant } from 'react-commons-ts';
//
import ActionsHoldPc from '../pc/ActionsHoldPc';
import ActionsHoldMb, { ActionsHoldMbProps } from '../mobile/ActionsHoldMb';

//
interface ActionsHoldProps extends ActionsHoldMbProps {}

//
function ActionsHold({
    title_action,
    force_close,
    children
}: ActionsHoldProps) {
    //
    if (common_constant.IS_MOBILE) {
        return (
            <ActionsHoldMb
                title_action={title_action}
                force_close={force_close}
            >
                {children}
            </ActionsHoldMb>
        );
    }

    return (
        <ActionsHoldPc title_action={title_action}>{children}</ActionsHoldPc>
    );
}

export default ActionsHold;
