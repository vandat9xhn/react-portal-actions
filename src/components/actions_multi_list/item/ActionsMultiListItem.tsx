import React from 'react';
import { common_constant, getClassModuleCss } from 'react-commons-ts';
import { ActionMultiItemObjType } from '../../../types/common';
//
import ActionsMultiListItemStyles from './ActionsMultiListItem.scss';

//
function _getClassModuleCss(className = '') {
    return getClassModuleCss({
        className: className,
        styles: ActionsMultiListItemStyles
    });
}

//
export interface ActionsMultiListItemProps extends ActionMultiItemObjType {
    stop_propagation?: boolean;

    handleAction: (action_name: string) => void;
    handleClose: () => void;
}

//
function ActionsMultiListItem({
    name,
    Icon,
    title,
    info,

    stop_propagation = true,

    handleAction,
    handleClose
}: ActionsMultiListItemProps) {
    //
    function onClick(e: React.MouseEvent) {
        stop_propagation && e.stopPropagation();

        handleClose();
        handleAction(name);
    }

    //
    return (
        <div
            className={`${_getClassModuleCss('ActionsMultiListItem')} ${
                common_constant.IS_MOBILE
                    ? _getClassModuleCss('ActionsMultiListItem-mobile')
                    : ''
            }`}
            onClick={onClick}
        >
            {Icon}

            <div>
                <div
                    className={_getClassModuleCss('ActionsMultiListItem_title')}
                >
                    {title}
                </div>

                {info && (
                    <div
                        className={`${_getClassModuleCss(
                            'ActionsMultiListItem_info'
                        )}`}
                    >
                        {info}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ActionsMultiListItem;
