import React, { Children } from 'react';

/** Object categorizing all found components by name */
export interface FoundChildren {
    /** All found children categorized under a specific component name */
    [name: string]: JSX.Element[];
    /** All other children that don't match a specific component name */
    other: JSX.Element[];
}

export interface FormatMap {
    /** All different sought out components */
    [displayName: string]: React.FC<any>;
}

class FormatChildren {
    foundChildren: FoundChildren = { other: [] };
    allChildren: JSX.Element[] = [];

    /**
     * Given the props pertaining to the parent component and the sought out children, this
     * constructor will identify and format them.
     *
     * @param parentProps props pertaining to the parent component
     * @param components these are formatted components with the same name as the sought out
     * components. When found by this constructor, the sought out will be replaced by the
     * formatted.
     */
    constructor(parentProps: any, components: React.FC<any>[]) {
        // destructure children from parent props
        const { children } = parentProps;
        const formatMap: FormatMap = {};

        // loop through all sought out component types
        components.forEach((component: React.FC<any>) => {
            const componentName: string = component.displayName || component.name;
            formatMap[componentName] = component;
        });

        // loop through all children
        Children.forEach(children, (child: JSX.Element, index: number) => {
            const childName: string = child?.type?.displayName || child?.type?.name;

            // hande whether sought out component is found
            if (formatMap[childName]) {
                if (!this.foundChildren[childName]) this.foundChildren[childName] = [];

                // get component format
                const { [childName]: Component } = formatMap;

                // get required props
                const {
                    props: { parentProps: childParentProps, key: childKey, ...childProps },
                } = child;

                // assign props and finalize component format
                const formattedComponent: JSX.Element = (
                    <Component {...childProps} parentProps={parentProps} key={index} />
                );

                // push to storage
                this.foundChildren[childName].push(formattedComponent);
                this.allChildren.push(formattedComponent);
            } else {
                this.foundChildren.other.push(child);
                this.allChildren.push(child);
            }
        });

        console.log(this.foundChildren);
    }

    /**
     * Given a child, this component will return all instances of that component
     *
     * @param child component wanting to retrieve
     * @return all instances of the specified child
     */
    get = (child: React.FC<any>): JSX.Element[] => {
        const childName: string = child.displayName || child.name || '';
        return this.foundChildren[childName] ? this.foundChildren[childName] : [];
    };

    /**
     * Gets all children
     *
     * @return all children
     */
    getAll = (): JSX.Element[] => this.allChildren;

    /**
     * Gets all other components
     *
     * @return all other components
     */
    getOther = (): JSX.Element[] => this.foundChildren.other;
}

export default FormatChildren;
