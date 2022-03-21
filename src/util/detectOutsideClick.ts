import { useState, useEffect, MutableRefObject, Dispatch, SetStateAction } from 'react';

/**
 * Will give a state that takes into consideration outside clicks
 *
 * @param element reference of componetn
 * @param initial the initial state
 * @param outsideMethod method that is triggered when a click occurs outside specified element
 * @return useState variables that adjust based on outside clicks
 */
export const detectOutsideClick = (
    element: MutableRefObject<any>,
    initial: boolean,
    outsideMethod?: (value: boolean) => any
): [boolean, Dispatch<SetStateAction<boolean>>] => {
    const [open, toggleOpen] = useState(initial);

    useEffect(() => {
        /**
         * Method that will change the state of an open
         *
         * @param event Click event
         */
        const onClick = (event: MouseEvent): void => {
            // checks to see if the event was clicked outside of the target element
            if (element.current !== null && !element.current.contains(event.target)) {
                // toggle if it is active
                toggleOpen(!open);
                if (outsideMethod) outsideMethod(open);
            }
        };

        // check if the item is open to open a listener
        if (open) {
            window.addEventListener('click', onClick);
        }

        return () => {
            window.removeEventListener('click', onClick);
        };
    }, [open, element]);

    return [open, toggleOpen];
};
