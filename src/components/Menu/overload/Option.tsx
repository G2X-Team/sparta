import type { FC, MouseEvent, RefObject } from 'react';
import React from 'react';

import type { IOption } from '../../Option/Option';
import { Option as COption } from '../../Option/Option';

/**
 * Formats option such that it can be used in menu
 *
 * @return Formatted option
 */
const Option: FC<IOption> = ({
    parentProps: { childTypeIndex, getChildTypeSize, first, last, handleOptionClick },
    onClick,
    children,
    ...props
}) => {
    /**
     * Method that will return ref if applicable
     *
     * @return ref if first or last
     */
    const giveRef = (): RefObject<HTMLLIElement> | undefined => {
        switch (childTypeIndex) {
            case 0:
                return first;
            case getChildTypeSize() - 1:
                return last;
            default:
                return undefined;
        }
    };

    /**
     * Handles option click
     *
     * @param event mouse event
     */
    const handleClick = (event?: MouseEvent<HTMLLIElement>): void => {
        if (handleOptionClick) handleOptionClick(event);
        if (onClick) onClick(event);
    };

    return (
        <COption {...props} ref={giveRef()} onClick={handleClick}>
            {children}
        </COption>
    );
};

export default Option;
