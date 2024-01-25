import type { FC } from 'react';
import type { ParentProps } from '../../interfaces/Overload';

/** Object categorizing all found components by name */
export interface FoundChildren {
    /** All found children categorized under a specific component name */
    [name: string]: JSX.Element[];
    /** All other children that don't match a specific component name */
    other: JSX.Element[];
}

export type ElementDictionary = Record<string, JSX.Element[]>;

export type ComponentRecord = Record<string, FC<any>>;

export interface SpartaRef {
    /** Parent props */
    parentProps: ParentProps;
    /** Record containing replacement components */
    componentMap: ComponentRecord;
}

export interface Overloader {
    /** Required property that allows us to find user-wrapped Sparta components */
    'sparta-overload': true;
    /**
     * This is a reference that is automatically passed by Sparta processing, only used to
     * pass to the `OverloadHandler`
     */
    spartaRef?: SpartaRef;
}
