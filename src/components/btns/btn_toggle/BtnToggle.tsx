import React from 'react';
import { getClassModuleCss } from 'react-commons-ts';
//
import IconThreeDot from '../../../icons/three_dot/IconThreeDot';
//
import BtnToggleStyles from './BtnToggle.scss';

//
function _getClassModuleCss(className = '') {
    return getClassModuleCss({ className: className, styles: BtnToggleStyles });
}

//
export interface BtnToggleProps {
    title_action?: React.ReactElement | React.ReactNode;
    toggleShow: () => void;
}

//
const BtnToggleDefaultProps = {
    title_action: (
        <div className={_getClassModuleCss('BtnToggle_icon')}>
            <IconThreeDot size_icon='1.25rem' color='#757575' />
        </div>
    )
};

//
function BtnToggle({
    title_action = BtnToggleDefaultProps.title_action,
    toggleShow
}: BtnToggleProps) {
    //
    return (
        <div className={_getClassModuleCss('BtnToggle')} onClick={toggleShow}>
            {title_action}
        </div>
    );
}

export default BtnToggle;
