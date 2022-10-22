import React, { FC } from 'react';
import { ParentProps, RenderAll } from '../interfaces/Overload';
import DeepFormat from './DeepFormat';

interface IApolloWrapper {
    /** Children that will need Apollo Processing */
    children: any;
    /** component properties */
    props: {
        [key: string]: any;
        'apollo-overrides'?: { [key: string]: any; parentProps?: ParentProps };
    };
}

/**
 * This component will perpetuate apollo processing to all children
 *
 * @return apollo processed children
 */
const HandleOverloads: FC<IApolloWrapper> = ({
    props: { 'apollo-overloads': overloads },
    children,
}) => {
    /**
     * This function will render all children with DeepFormat.
     *
     * @return formatted children
     */
    const renderAll: RenderAll = () => {
        if (!overloads || !overloads?.parentProps) return children;

        const { parentProps, ...componentMap } = overloads;

        // get deep format
        const deepFormat = new DeepFormat(children, componentMap, parentProps);

        // return formatted children
        return deepFormat.getAll();
    };

    return <>{renderAll()}</>;
};

export default HandleOverloads;
