import { useEffect, useRef } from 'react';
import { waitingToDoLast } from 'react-commons-ts';

//
export function useWaitingResize({
    handleResize = () => {},
    time_waiting = 200
}) {
    //
    const ref_interval = useRef(null);

    //
    useEffect(() => {
        const handleWaitingLastAction = () =>
            waitingToDoLast({
                ref_interval: ref_interval,
                time: time_waiting,
                callback: handleResize
            });

        window.addEventListener('resize', handleWaitingLastAction);

        return () => {
            window.removeEventListener('resize', handleWaitingLastAction);
        };
    }, []);
}
