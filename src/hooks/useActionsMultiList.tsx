import { useEffect, useState } from 'react';
import { useBool, useForceUpdate } from 'react-commons-ts';
//
import { ActionMultiItemObjType } from '../types/common';

//
export interface useActionsMultiListProps {
    handle_API_L: () => Promise<ActionMultiItemObjType[][]>;
    deps_reset_api?: React.DependencyList;
}

//
export function useActionsMultiList({
    handle_API_L,
    deps_reset_api = []
}: useActionsMultiListProps) {
    //
    const [state_obj, setStateObj] = useState<{
        list_action_arr: ActionMultiItemObjType[][];
        has_fetched: boolean;
        is_fetching: boolean;
    }>({
        list_action_arr: [[]],
        has_fetched: false,
        is_fetching: false
    });

    const { list_action_arr, has_fetched, is_fetching } = state_obj;

    //
    const { is_true, setIsTrue, toggleBool } = useBool();
    const forceUpdate = useForceUpdate();

    //
    useEffect(() => {
        if (deps_reset_api.length) {
            setStateObj((state_obj) => {
                return {
                    ...state_obj,
                    list_action_arr: [[]],
                    has_fetched: false
                };
            });
        }
    }, deps_reset_api);

    // ------- API

    //
    async function getData_action() {
        setStateObj((state_obj) => {
            return {
                ...state_obj,
                is_fetching: true
            };
        });

        const data = await handle_API_L();

        setStateObj((state_obj) => {
            return {
                ...state_obj,
                list_action_arr: data,
                is_fetching: false,
                has_fetched: true
            };
        });
    }

    // ------- TOGGLE

    //
    function callbackOpen() {
        !has_fetched ? getData_action() : forceUpdate();
    }

    //
    function handleClose() {
        setIsTrue(false);
    }

    //
    function callbackClose() {
        handleClose();
    }

    // ----

    //
    return {
        list_action_arr,
        is_fetching,
        has_fetched,
        is_true,

        setStateObj,

        toggleBool,
        handleClose,
        callbackOpen,
        callbackClose
    };
}
