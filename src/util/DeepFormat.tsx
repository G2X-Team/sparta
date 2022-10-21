import React, { Children, cloneElement, Fragment } from 'react';
import { ParentProps } from '../interfaces/Overload';

export interface ComponentMap {
    /** All different sought out components */
    [displayName: string]: React.FC<any>;
}

export default class DeepFormat {
    private formattedChildren: JSX.Element[] = [];
    private static internalIndex = 0;

    /**
     * Helper function that will replace all sought out components with their formatted
     * counterparts, regardless of depth in DOM.
     *
     * @param child the children to execute deep replacement
     * @param componentMap map of components to replace
     * @param parentProps properties to pass to the parent component
     * @return formatted children
     */
    static replace = (
        child: JSX.Element,
        componentMap: ComponentMap,
        parentProps: ParentProps
    ): JSX.Element => {
        // extract child apollo name
        const childName = child?.props?.['data-apollo'] || 'not-found';

        // if child is a sought out component, replace it with its formatted counterpart
        if (componentMap[childName]) {
            // get component format
            const { [childName]: Component } = componentMap;

            // get required props
            const {
                ref,
                props: { parentProps: childParentProps, ...childProps },
            } = child as any;

            // clone element and return
            const formattedComponent: JSX.Element = (
                <Component
                    {...childProps}
                    ref={ref}
                    key={`deepFormat-${childName}-${DeepFormat.internalIndex}`}
                />
            );

            DeepFormat.internalIndex++;
            return cloneElement(formattedComponent, {
                parentProps,
            });
        }

        // return the child with its replaced children
        const key = `deepFormat-component-${DeepFormat.internalIndex}`;
        DeepFormat.internalIndex++;

        // check if child has override props
        const overloads = child?.props?.['apollo-overloads'];
        if (overloads && Object.keys(overloads).some((key) => !!componentMap[key])) {
            const newOverloads = { parentProps, ...overloads, ...componentMap };
            return (
                <Fragment key={key}>
                    {cloneElement(child, { 'apollo-overloads': newOverloads })}
                </Fragment>
            );
        }

        // return the child if there are no children or is an apollo component
        if (!child?.props?.children || childName !== 'not-found')
            return <Fragment key={key}>{child}</Fragment>;

        // if child has children, recursively replace them
        const children = Children.map(child.props.children, (c) =>
            DeepFormat.replace(c, componentMap, parentProps)
        );

        return <Fragment key={key}>{cloneElement(child, child.props, children)}</Fragment>;
    };

    /**
     * This object will take the children property of any component and replace all coinciding
     * elements with their formatted counterparts stated in the `componentMap` parameter. You
     * can also pass in a `parentProps` parameter to pass props to the replaced components.
     *
     * @param children Children property
     * @param componentMap map containing all component replacements
     * @param parentProps properties to pass to replaced components
     */
    constructor(children: any, componentMap: ComponentMap = {}, parentProps: ParentProps = {}) {
        // loop through all children
        Children.forEach(children, (child: JSX.Element, index: number) => {
            // replace child
            const formattedChild = DeepFormat.replace(child, componentMap, parentProps);

            // add child to formatted children
            this.formattedChildren[index] = formattedChild;
        });
    }

    /**
     * Returns the formatted children.
     *
     * @return formatted children
     */
    getAll = (): JSX.Element[] => this.formattedChildren;
}
