import React, { ReactNode, Children } from 'react';

/**
 * Formats a specific child and will not allow any other children
 */
class FormatChild {
    // array containing formatted child instances
    formattedChildren: JSX.Element[] = [];

    /**
     * Creates a new JSX.Element formatting a single child
     *
     * @param children component's children prop
     * @param component single component that is being sought out for formatting
     * @param formatMethod the method that will be used to format the component
     * @param onlyType determines whether the sought out component should be the only type formatted
     * @param unique determines whether there should be only one component
     */
    constructor(
        children: ReactNode,
        component: React.FC<any>,
        formatMethod: (component: JSX.Element, index: number) => JSX.Element,
        onlyType = false,
        unique = false
    ) {
        // the component that is being found
        const componentName: string = component.displayName || component.name;
        let occurrences = 0;

        // loop through all the children in the component
        Children.forEach(children, (child: any, index: number) => {
            // set display name
            const childName: string = child?.type?.displayName || child?.type?.name;

            // if the component is unique, check the amount of occurrences
            if (childName == componentName) {
                occurrences++;
                if (unique && occurrences > 1) {
                    throw new Error(`Too many occurrences of ${componentName}, expected 1.`);
                }

                // push formatted child
                this.formattedChildren.push(formatMethod(child, index));
            } else if (onlyType) {
                throw new Error(
                    `Only ${componentName} expected as children. Recieved ${childName}`
                );
            } else {
                this.formattedChildren.push(child);
            }
        });
    }

    /**
     * Gets children after formatting
     *
     * @return formatted children
     */
    getAll = (): JSX.Element[] => this.formattedChildren;
}

export default FormatChild;
