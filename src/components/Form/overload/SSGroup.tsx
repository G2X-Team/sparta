import type { FC } from 'react';
import React from 'react';

import Overload from '../../../interfaces/Overload';
import FormatChildren from '../../../util/FormatChildren';

import type { Props as GroupProps } from '../../Group/Group';
import { Group as CGroup } from '../../Group/Group';

/**
 * Formatted Group, will serve as passthrough for parent props when in remix validation mode
 *
 * @return formatted group that complies with remix validation
 */
const Group: FC<Overload<GroupProps>> = ({ parentProps, children, ...props }) => {
    /**
     * Formats children components and passes the parent props through
     *
     * @return formatted children
     */
    const renderAll = (): JSX.Element[] => {
        const newParentProps = { children, ...parentProps };
        const formatted = new FormatChildren(newParentProps, { });
        return [];
    };
    return <CGroup>{renderAll()}</CGroup>;
};

export default Group;
