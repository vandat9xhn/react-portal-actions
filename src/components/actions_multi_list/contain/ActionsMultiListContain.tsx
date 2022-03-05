import React from 'react';
import { common_constant, getClassModuleCss } from 'react-commons-ts';
//
import { ActionMultiItemObjType } from '../../../types/common';
//
import CircleLoading from '../../loading/circle_loading/CircleLoading';
import DivWidthLoading from '../../loading/div_width_loading/DivWidthLoading';
import PortalAtBody from '../../portal_at_body/PortalAtBody';
//
import ActionsMultiListItem, {
    ActionsMultiListItemProps
} from '../item/ActionsMultiListItem';
//
import ActionsMultiListContainStyles from './ActionsMultiListContain.scss';

//
function _getClassModuleCss(className = '') {
    return getClassModuleCss({
        className: className,
        styles: ActionsMultiListContainStyles
    });
}

//
export interface ActionsMultiListContainProps {
    list_action_arr: ActionMultiItemObjType[][];
    is_fetching: boolean;
    class_separate?: string;

    ComponentItem?: typeof ActionsMultiListItem;
    handleAction: ActionsMultiListItemProps['handleAction'];
    handleClose: ActionsMultiListItemProps['handleClose'];
}

//
function ActionsMultiListContain({
    list_action_arr,
    is_fetching,
    class_separate,

    ComponentItem = ActionsMultiListItem,
    handleAction,
    handleClose
}: ActionsMultiListContainProps) {
    return (
        <div className={_getClassModuleCss('ActionsMultiListContain')}>
            {list_action_arr.map((action_arr, action_ix) => (
                <div
                    key={action_ix}
                    className={_getClassModuleCss(
                        'ActionsMultiListContain_part'
                    )}
                >
                    {action_ix == 0 || common_constant.IS_MOBILE ? null : (
                        <div
                            className={`${_getClassModuleCss(
                                'ActionsMultiListContain_separate'
                            )} ${class_separate}`}
                        ></div>
                    )}

                    {action_arr.map((item, ix) => (
                        <ComponentItem
                            key={ix}
                            {...item}
                            handleAction={handleAction}
                            handleClose={handleClose}
                        />
                    ))}
                </div>
            ))}

            {is_fetching ? (
                common_constant.IS_MOBILE ? (
                    <PortalAtBody>
                        <div
                            className={`${_getClassModuleCss(
                                'ActionsMultiListContain_div_loading'
                            )}`}
                        >
                            <DivWidthLoading is_fetching={is_fetching} />
                        </div>
                    </PortalAtBody>
                ) : (
                    <div
                        className={_getClassModuleCss(
                            'ActionsMultiListContain_circle'
                        )}
                    >
                        <CircleLoading is_fetching={true} />
                    </div>
                )
            ) : null}
        </div>
    );
}

export default ActionsMultiListContain;
