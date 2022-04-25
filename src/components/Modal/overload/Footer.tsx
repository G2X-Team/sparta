import type { FC } from 'react';
import React from 'react';
import FormatChildren from '../../../util/FormatChildren';

import ButtonGroup from './ButtonGroup';
import { IFooter, Footer as CFooter } from '../../Footer/Footer';

/**
 * Overloaded Footer that identifies button groups
 *
 * @return formatted footer
 */
const Footer: FC<IFooter> = ({ parentProps, children, ...props }: IFooter) => {
    // gets all props
    const allProps = { ...props, ...parentProps };

    // find button groups
    const formattedFooter = new FormatChildren(children, { ButtonGroup }, allProps);

    // format and extract button groups
    const buttonGroups = formattedFooter.get('ButtonGroup');

    // check that there is no more than one button group
    if (buttonGroups.length > 1)
        throw new Error('The Footer of the Modal can only have 1 ButtonGroup component');

    // get the button group
    const [buttonGroup] = buttonGroups;

    return (
        <CFooter {...props} parentProps={parentProps} style={footerStyle}>
            {formattedFooter.getOther()}
            {buttonGroup}
        </CFooter>
    );
};

// style for footer
const footerStyle: React.CSSProperties = {
    position: 'relative',
};

export default Footer;
