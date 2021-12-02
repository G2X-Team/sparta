import { ReactNode, Children } from 'react';

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
 * This function gets all the children from the component's properties
 * to sort and index them into an object that can later be easily processed
 * and rendered.
 *
 * @param {Array} children children prop of component
 * @param {Array} components components to look for
 * @returns {Object} object whose props are the found subcomponents and other
 */
export const findAll = (children: ReactNode, components: any[]) => {
    // object containing all found types and others
    const found: FoundChildren = {
        other: [],
    };

    // populate type map
    components.forEach((component) => {
        let componentName: string =
            component.displayName || component.name || '';
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
        found[childName]
            ? found[childName].push(foundChild)
            : found.other.push(foundChild);
    });

    return found;
};

/**
 * Given an array of found children, this method will sort and return all components in the found
 * child objects in O(n) time
 *
 * @param found all found children
 * @param offset when templating components, sometimes it necessary to have an offset to correct the index
 * @returns all found components
 */
export const getComponents = (
    found: FoundChildren,
    offset: number = 0
): ReactNode[] => {
    // array storing sorted
    const sorted: ReactNode[] = [];

    // spread
    let spreadFound: FoundChild[] = [];
    Object.keys(found).forEach((key: string) => {
        if (found[key]) spreadFound = [...spreadFound, ...found[key]];
    });

    // loop through all children and extract the component and store it in array according to index
    for (let i: number = 0; i < spreadFound.length; i++) {
        sorted[spreadFound[i].index - offset] = spreadFound[i].component;
    }

    return sorted;
};
