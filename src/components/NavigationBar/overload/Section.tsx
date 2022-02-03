import React, { useEffect, useState } from 'react';
import { Props, Section as CSection } from '../../Section/Section';
import type { FC } from 'react';

import FormatChildren from '../../../util/FormatChildren';
import { Dropdown, Option, Button, Icon } from '../../..';

/**
 * Formats section so that when it is in navigation mode, it will shrink to a hamburger
 * menu with dropdown capabilities
 *
 * @return Formatted section component
 */
const Section: FC<Props> = ({
    parentProps: { mobile, titleColor },
    children,
    navigation,
    ...props
}: Props): JSX.Element => {
    // state
    const [sectionChildren, setSectionChildren] = useState(children);

    useEffect(() => {
        if (mobile && navigation) {
            const parentProps = { children };
            const formatted = new FormatChildren(parentProps, { Option });

            // check if there are other types other than options
            if (formatted.getOther().length !== 0) {
                throw new Error(
                    'Only options can be placed in Section components with navigation toggled true'
                );
            }

            setSectionChildren(
                <Dropdown>
                    <Button>
                        <Icon name="menu" clickable color={titleColor} />
                    </Button>
                    {formatted.get(Option)}
                </Dropdown>
            );
        }
    }, [mobile]);

    return <CSection {...props}>{sectionChildren}</CSection>;
};

export default Section;
