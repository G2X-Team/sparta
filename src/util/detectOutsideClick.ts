import { useState, useEffect, MutableRefObject, Dispatch, SetStateAction } from 'react';

export const detectOutsideClick = 
    (element: MutableRefObject<any>, initial: boolean): 
        [boolean, Dispatch<SetStateAction<boolean>>] => {
    const [open, toggleOpen] = useState(initial);

    useEffect(() => {
        /**
         * Method that will change the state of an open
         * 
         * @param event Click event
         */
        const onClick = (event: MouseEvent) => {
            // checks to see if the element is clicked and the event was clicked outside of the target element
            if (element.current !== null && !element.current.contains(event.target)) {
                // toggle if it is active
                toggleOpen(!open);
            }
        };

        // check if the item is open to open a listener
        if (open) {
            window.addEventListener('click', onClick);
        }

        return () => {
            window.removeEventListener('click', onClick);
        }

    }, [open, element])

    return [open, toggleOpen];
}