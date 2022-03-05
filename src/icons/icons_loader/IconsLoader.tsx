import React from 'react';
import { getClassModuleCss } from 'react-commons-ts';
//
import IconsLoaderStyles from './IconsLoader.scss';

//
function _getClassModuleCss(className = '') {
    return getClassModuleCss({
        className: className,
        styles: IconsLoaderStyles
    });
}

//
function IconsLoader({
    size_icon = '2rem',
    x = 0,
    y = 0,
    is_fetching = false
}) {
    //
    return (
        <svg
            className={`${_getClassModuleCss('IconsLoader')} ${
                is_fetching ? '' : _getClassModuleCss('IconsLoader-active')
            }`}
            viewBox={`${x} ${y} 200 200`}
            fill='none'
            width={size_icon}
            height={size_icon}
        >
            {/* spinner x=0 y=0 */}
            <g strokeWidth='25'>
                <circle cx='100' cy='100' r='85' stroke='#00a1fc' />
                <path d='M100,15 A85,85 0 0 1 155,35' stroke='#f5f5f580' />
            </g>
        </svg>
    );
}

export default IconsLoader;
