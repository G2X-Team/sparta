import type { ReactNode } from 'react';

/**
 * Function that is responsible for rendering all formatted children. This method can also be used
 * in a child component to format children the same way as the parent component by passing the
 * child's children as a parameter.
 *
 * @param children the children to format
 * @param passthrough additional children to be passed by parent. Use if you want to use the same
 * formatting as the old parent component while adding additional props from new parent.
 * @return formatted children
 */
export type RenderAll = (
    children?: ReactNode,
    passthrough?: { [key: string]: any }
) => Array<JSX.Element> | JSX.Element;

/** Parent props to be passed down to children */
export type ParentProps = {
    /** any props passed down by parent */
    [propName: string]: any;
    /** Function that replicates parent's method for formatting children */
    renderAll?: RenderAll;
    /** Index of the child in reference to its order in the DOM */
    childIndex?: number;
    /**
     * Index of the child in reference to the other children of the same component type in the
     * DOM
     */
    childTypeIndex?: number;
    /** Get the total amount of children of the same component type in the parent component */
    getChildrenTypeSize?: () => number;
    /** Get the total amount of children in the parent component*/
    getChildrenSize?: () => number;
};

/**
 * Overloads parent components for use in overload components
 */
export type Overload<Props extends { [value: string]: any }> = Props & {
    /** Props inherited by parents */
    parentProps: ParentProps;
};

/**
 * Describes an interfacing component
 */
export type Interface<Props extends { [value: string]: any }> = Props & {
    parentProps?: ParentProps;
};
