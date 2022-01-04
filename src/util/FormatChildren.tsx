import React, { Children } from 'react';

/** Object categorizing all found components by name */
export interface FoundChildren {
    /** All found children categorized under a specific component name */
    [name: string]: JSX.Element[];
    /** All other children that don't match a specific component name */
    other: JSX.Element[];
}

interface ComponentDictionary {
    /** Used to get all components given a specific display name */
    [displayName: string]: JSX.Element[];
}

export interface ComponentMap {
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
     * @param componentMap these are formatted components with the same name as the sought out
     * components. When found by this constructor, the sought out will be replaced by the
     * formatted.
     */
    constructor(parentProps: any, componentMap: ComponentMap = {}) {
        // destructure children from parent props
        const { children } = parentProps;

        // loop through all children
        Children.forEach(children, (child: JSX.Element, index: number) => {
            const childName: string = child?.type?.displayName || child?.type?.name;

            // hande whether sought out component is found
            if (componentMap[childName]) {
                if (!this.foundChildren[childName]) this.foundChildren[childName] = [];

                // get component format
                const { [childName]: Component } = componentMap;

                // get required props
                const {
                    props: { parentProps: childParentProps, key: childKey, ...childProps },
                } = child;

                // assign props and finalize component format
                const formattedComponent: JSX.Element = <Component {...childProps} key={index} />;
                const cloned: JSX.Element = React.cloneElement(formattedComponent, { parentProps });

                // push to storage
                this.foundChildren[childName].push(cloned);
                this.allChildren.push(cloned);
            } else {
                this.foundChildren.other.push(child);
                this.allChildren.push(child);
            }
        });
    }

    /**
     * Given a child, this component will return all instances of that component
     *
     * @param child component wanting to retrieve
     * @return all instances of the specified child
     */
    get = (child: React.FC<any>): JSX.Element[] => {
        const childName: string = child?.displayName || child?.name;
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
     * Will remove all instances of a given child in the component map from the stored
     * formatted children at the cost of an extra iteration of all of them.
     *
     * @param componentMap child wanting to remove from formatted children
     * @return all instances of child
     */
    extract = (componentMap: ComponentMap): ComponentDictionary => {
        // define an object to keep track of all extracted components
        const extracted: ComponentDictionary = {};

        // removes all instances of the child
        this.allChildren = this.allChildren.filter((child: JSX.Element) => {
            const name: string = child?.type?.displayName || child?.type?.name;

            // determine whether display name is present in both maps
            if (componentMap[name] && this.foundChildren[name]) {
                // if found get the extracted components and move them to the extracted dictionary
                const {
                    foundChildren: { [name]: extractedComponents },
                } = this;
                extracted[name] = extractedComponents;

                // delete the component from found children
                delete this.foundChildren[name];
            }

            // only add component to list if it not in the given component map
            return !componentMap[name];
        });

        return extracted;
    };
}

export default FormatChildren;