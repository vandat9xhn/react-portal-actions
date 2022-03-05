import React from 'react';
import { getClassModuleCss } from 'react-commons-ts';
//
import IconsLoader from '../../../icons/icons_loader/IconsLoader';
//
import CircleLoadingStyles from './CircleLoading.scss';

//
function _getClassModuleCss(className = '') {
    return getClassModuleCss({
        className: className,
        styles: CircleLoadingStyles
    });
}

//
function CircleLoading({ is_fetching = false, size_icon = '2rem' }) {
    //
    return (
        <div
            className={`${_getClassModuleCss('CircleLoading')} ${
                is_fetching ? '' : _getClassModuleCss('CircleLoading-none')
            }`}
        >
            <div className='CircleLoading_circle'>
                <IconsLoader size_icon={size_icon} is_fetching={is_fetching} />
            </div>
        </div>
    );
}

export default CircleLoading;
