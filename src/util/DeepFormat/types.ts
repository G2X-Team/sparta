import { FC } from 'react';
import { ParentProps } from '../../interfaces/Overload';

export interface ApolloRef {
    /** Props that were passed by parent component */
    parentProps: ParentProps;
    /** Map with all replacement components */
    componentMap: Record<string, FC<any>>;
}

export interface Overloader {
    /** This property ensures that the component will be overloaded */
    'apollo-overload': true;
    /**
     * These props are automatically filled by internal processing, all you have to do
     * is pass them to the `OverloadHandler` component.
     */
    apolloRef?: ApolloRef;
}
