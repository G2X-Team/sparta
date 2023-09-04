import React, { Children, cloneElement, Fragment } from 'react';
import type { ParentProps } from '../../interfaces/Overload';
import type { ElementDictionary, ComponentRecord, FoundChildren } from './types';

class FormatChildren {
    /** an object containing all subsets of children organized by sparta name */
    foundChildren: FoundChildren = { other: [], user: [] };
    /** all cihldren */
    allChildren: JSX.Element[] = [];

    /**
     * Given the props pertaining to the parent component and the sought out children, this
     * constructor will identify and format them.
     *
     * @param children Children property
     * @param componentMap these are formatted components with the same name as the sought out
     * components. When found by this constructor, the sought out will be replaced by the
     * formatted.
     * @param parentProps props pertaining to the parent component
     */
    constructor(children: any, componentMap: ComponentRecord = {}, parentProps: ParentProps = {}) {
        // loop through all children
        Children.forEach(children, (child: JSX.Element, index: number) => {
            const childName =
                child && child.props && child?.props['data-sparta']
                    ? child.props['data-sparta']
                    : 'not-found';

            // hande whether sought out component is found
            if (componentMap[childName] || child?.props?.['sparta-overload']) {
                if (!this.foundChildren[childName]) this.foundChildren[childName] = [];

                // get required props
                const {
                    ref,
                    props: { parentProps: childParentProps, ...childProps },
                } = child as any;

                // assign props and finalize component format
                /**
                 * Gets child type size
                 *
                 * @return size of child category
                 */
                const getChildTypeSize = (): number => this.foundChildren[childName].length;

                /**
                 * Gets size of all children
                 *
                 * @return size of all children
                 */
                const getChildrenSize = (): number => this.allChildren.length;

                if (child?.props?.['sparta-overload']) {
                    const cloned = cloneElement(child, {
                        apolloRef: {
                            componentMap: componentMap,
                            parentProps: {
                                childIndex: index,
                                childTypeIndex: getChildTypeSize(),
                                getChildrenSize,
                                getChildTypeSize,
                                ...parentProps,
                            },
                        },
                    });
                    this.foundChildren.user.push(<Fragment key={index}>P{cloned}</Fragment>);
                    this.allChildren.push(cloned);
                    return;
                }

                // get component format
                const { [childName]: Component } = componentMap;
                const formattedComponent: JSX.Element = (
                    <Component {...childProps} ref={ref} key={index} />
                );
                const cloned: JSX.Element = React.cloneElement(formattedComponent, {
                    parentProps: {
                        childIndex: index,
                        childTypeIndex: getChildTypeSize(),
                        getChildrenSize,
                        getChildTypeSize,
                        ...parentProps,
                    },
                });

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
    get = (child: string): JSX.Element[] => {
        return this.foundChildren[child] ? this.foundChildren[child] : [];
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
     * @param components children wanting to remove from formatted children
     * @return all instances of child
     */
    extract = (components: Array<string>): ElementDictionary => {
        // get set from component array
        const componentSet = new Set(components);

        // define an object to keep track of all extracted components
        const extracted: ElementDictionary = {};

        // removes all instances of the child
        this.allChildren = this.allChildren.filter((child: JSX.Element) => {
            const name: string =
                child && child.props && child.props['data-sparta']
                    ? child.props['data-sparta']
                    : 'not-found';

            // determine whether display name is present in both maps
            if (componentSet.has(name) && this.foundChildren[name]) {
                // if found get the extracted components and move them to the extracted dictionary
                const {
                    foundChildren: { [name]: extractedComponents },
                } = this;
                extracted[name] = extractedComponents;

                // delete the component from found children
                delete this.foundChildren[name];
            }

            // only add component to list if it not in the given component map
            return !componentSet.has(name);
        });

        return extracted;
    };
}

export default FormatChildren;
