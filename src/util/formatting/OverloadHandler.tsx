import React, { FC } from 'react';
import { RenderAll } from '../../interfaces/Overload';
import FormatChildren from './FormatChildren';
import { SpartaRef } from './types';

interface IOverloadHandler {
    /** Children that will need Sparta Processing */
    children: any;
    /** component properties */
    spartaRef?: SpartaRef;
}

/**
 * This component will perpetuate sparta processing to all children
 *
 * @return sparta processed children
 */
export const OverloadHandler: FC<IOverloadHandler> = ({ spartaRef, children }) => {
    /**
     * This function will render all children with DeepFormat.
     *
     * @return formatted children
     */
    const renderAll: RenderAll = () => {
        // check if spartaRef is valid
        if (!spartaRef || !spartaRef?.parentProps) return children;

        // get component map
        const { parentProps, componentMap } = spartaRef;

        // deep format children relayed by component map
        const deepFormat = new FormatChildren(children, componentMap, parentProps);

        // return formatted children
        return deepFormat.getAll();
    };

    return <>{renderAll()}</>;
};
