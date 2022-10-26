import React, { FC } from 'react';
import { RenderAll } from '../../interfaces/Overload';
import DeepFormat from './index';
import { ApolloRef } from './types';

interface IOverloadHandler {
    /** Children that will need Apollo Processing */
    children: any;
    /** component properties */
    apolloRef?: ApolloRef;
}

/**
 * This component will perpetuate apollo processing to all children
 *
 * @return apollo processed children
 */
export const OverloadHandler: FC<IOverloadHandler> = ({ apolloRef, children }) => {
    /**
     * This function will render all children with DeepFormat.
     *
     * @return formatted children
     */
    const renderAll: RenderAll = () => {
        // check if apolloRef is valid
        if (!apolloRef || !apolloRef?.parentProps) return children;

        // get component map
        const { parentProps, componentMap } = apolloRef;

        // deep format children relayed by component map
        const deepFormat = new DeepFormat(children, componentMap, parentProps);

        // return formatted children
        return deepFormat.getAll();
    };

    return <>{renderAll()}</>;
};
