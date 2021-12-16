import React, { ReactNode, Children } from 'react';

/** Object that gives found child component and its position index in the DOM */
export interface FoundChild {
    /** component stored by object */
    component: JSX.Element;
    /** index describing what position in the children array it was found */
    index: number;
}

/** Object categorizing all found components by name */
export interface FoundChildren {
    /** All found children categorized under a specific component name */
    [name: string]: FoundChild[];
    /** All other children that don't match a specific component name */
    other: FoundChild[];
}

/**
 * This helper simplifies the process of formatting component children and relieves
 * the user from worrying about specific typing, sorting, and labeling of children
 */
class FormattedChildren {
    /** Object that keeps track of all found children including their index and component*/
    foundChildren: FoundChildren;

    /**
     * Given a `children` prop and a list of sought out components this constructor will
     * instantiate the objects class variable
     *
     * @param children component's children prop
     * @param components components that are going to be sought out for labeling
     */
    constructor(children: ReactNode, components: React.FC<any>[]) {
        // object containing all found types and others
        const found: FoundChildren = {
            other: [],
        };

        // populate type map
        components.forEach((component) => {
            const componentName: string = component.displayName || component.name || '';
            found[componentName] = [];
        });

        // loop through all the react children
        Children.forEach(children, (child: any, index: number) => {
            const childName: string = child?.type?.displayName || child?.type?.name;
            const foundChild: FoundChild = {
                component: child,
                index,
            };

            // push the child to its respective category, if it doesn't have one its left in other
            found[childName] ? found[childName].push(foundChild) : found.other.push(foundChild);
        });

        this.foundChildren = found;
    }

    /**
     * Given the child that the user wants to extract from the `FormattedChildren`, this method
     * will remove it from the `foundChildren` class variable and return a list of sorted
     * childs that match the parameter
     *
     * @param child child to be extracted
     * @return ordered list of specified child
     */
    extract = (child: React.FC<any>): JSX.Element[] => {
        // check if the specified child exists within the class variable
        const childName: string = child.displayName || child.name || '';
        if (!this.foundChildren[childName]) throw new Error(`No ${childName} found.`);

        // extract the components from the class variable
        const components: JSX.Element[] = this.foundChildren[childName].map(
            (foundChild: FoundChild) => foundChild.component
        );

        // delete the entry in the class object and return the new components
        delete this.foundChildren[childName];
        return components;
    };

    /**
     * Given a target component, and a method that formats that component, this method will change
     * all of the components from the foundChildren class variable matching the specified parameter
     *
     * @param child child component wanting to format
     * @param formatMethod method that will format all children matching the parameter
     */
    format = (
        child: React.FC<any>,
        formatMethod: (component: JSX.Element) => JSX.Element
    ): void => {
        // check if the specified child exists within the class variable
        const childName: string = child.displayName || child.name || '';
        if (!this.foundChildren[childName]) throw new Error(`No ${childName} found.`);

        // create a new found children list for specified child using provided format method
        const formatted: FoundChild[] = this.foundChildren[childName].map((child: FoundChild) => {
            const { component, index } = child;
            return { component: formatMethod(component), index };
        });

        // change the previous components to the current
        this.foundChildren[childName] = formatted;
    };

    /**
     * Provided a sought out component, this method will return a list of those components from the
     * foundChildren class variable
     *
     * @param child child component looking to get
     * @return list of components pertaining to sought out child
     */
    get = (child: React.FC<any>): JSX.Element[] => {
        // check if the specified child exists within the class variable
        const childName: string = child.displayName || child.name || '';
        if (!this.foundChildren[childName]) throw new Error(`No ${childName} found.`);

        // return the components stored in the class variabe
        return this.foundChildren[childName].map((child: FoundChild) => child.component);
    };

    /**
     * Gets all other components not sought out and returns them
     *
     * @return all other components
     */
    getOther = (): JSX.Element[] =>
        this.foundChildren.other.map((child: FoundChild) => child.component);

    /**
     * Gets all components sorted in the order they were rendered from the foundChildren class
     * variable
     *
     * @return all formatted children's components
     */
    getAll = (): JSX.Element[] => {
        // array storing sorted
        const sorted: JSX.Element[] = [];

        // spread
        let spreadFound: FoundChild[] = [];
        Object.keys(this.foundChildren).forEach((key: string) => {
            if (this.foundChildren[key]) spreadFound = [...spreadFound, ...this.foundChildren[key]];
        });

        // loop through all children and extract the component and store it in array
        for (const foundChild of spreadFound) {
            const { component, index } = foundChild;
            sorted[index] = component;
        }

        return sorted;
    };
}

export default FormattedChildren;
