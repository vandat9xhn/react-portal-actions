import React from 'react';
import { getClassModuleCss } from 'react-commons-ts';
//
import DivWidthLoadingStyles from './DivWidthLoading.scss';

//
function _getClassModuleCss(className = '') {
    return getClassModuleCss({
        className: className,
        styles: DivWidthLoadingStyles
    });
}

//
function DivWidthLoading({ is_fetching = false }) {
    //
    return (
        <div className={`${_getClassModuleCss('DivWidthLoading')}`}>
            <div
                className={`${_getClassModuleCss(
                    'DivWidthLoading_contain'
                )} ${_getClassModuleCss(
                    is_fetching
                        ? 'DivWidthLoading_contain-loading'
                        : 'DivWidthLoading_contain-done'
                )}`}
            ></div>
        </div>
    );
}

export default DivWidthLoading;
