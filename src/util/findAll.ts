import { ReactNode, Children } from 'react';

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
    const types: any = {
        other: []
    };

    // populate type map
    components.forEach((component) => {
        let componentName: string = component.displayName || component.name || "";
        types[componentName] = [];
    })

    // loop through all the react children
    Children.forEach(children, (child: any, index: number) => {
        const childType: string = child.displayName || child.name;

        // check if type exists in type map
        if (types[childType]) {
            types[childType].push({child, index});
        } else {
            types.other.push({child, index});
        }
    })

    return types;
}