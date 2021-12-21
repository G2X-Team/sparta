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
        const childName: string = child.displayName || child.name;
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

    /**
     * Will remove all instances of a given child from the stored formatted children at the cost
     * of an extra iteration of all of them.
     *
     * @param child child wanting to remove from formatted children
     * @return all instances of child
     */
    extract = (child: React.FC<any>): JSX.Element[] => {
        const childName: string = child.displayName || child.name;
        const {
            foundChildren: { [childName]: children },
        } = this;

        delete this.foundChildren[childName];

        // removes all instances of the child
        this.allChildren = this.allChildren.filter((child: JSX.Element) => {
            const name: string = child.type.displayName || child.type.name;
            return name != childName;
        });

        return children;
    };

    /**
     * Extracts all instances and matches of given children from stored formatted children at the
     * cost of an extra iteration of all of them plus an iteration of the input array.
     *
     * @param children children wanting to remove from formatted children
     * @return all instances of extracted children returned a matrix the same order it was
     * inputted in the parameters;
     */
    extractMultiple = (children: React.FC<any>[]): JSX.Element[][] => {
        const extracted: JSX.Element[][] = [];
        let comparator = '';

        // loop through every child and get the comparator string
        children.forEach((component: React.FC<any>, index: number) => {
            // get the name
            let componentName: string = component.displayName || component.name;

            // push the values to the extracted array and then remove it from the found children
            extracted.push(this.foundChildren[componentName]);
            delete this.foundChildren[componentName];

            // determine whether there is another comparison that needs to be made after
            if (index !== children.length - 1) componentName += '|';

            comparator += componentName;
        });

        // find all the children who don't match the extracted
        this.allChildren.filter((child: JSX.Element) => {
            const childName: string = child.type.displayName || child.type.name;
            return !childName.match(comparator);
        });

        return extracted;
    };
}

export default FormatChildren;
