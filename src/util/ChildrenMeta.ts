import { Children } from 'react';

export interface ComponentMap {
    /** All different sought out components */
    [displayName: string]: React.FC<any>;
}

interface ComponentMeta<T> {
    /** Index in DOM in relation to other children */
    index: number;
    /** Index in DOM in relation to other children of same type */
    instance: number;
    /** Props relative to component */
    props: T;
}

interface MetaData {
    /** Component available in  */
    [apolloName: string]: ComponentMeta<any>[];
}

export default class ChildrenMeta {
    private metaData: MetaData;
    private othersFound: boolean;

    constructor(children: any, componentMap: ComponentMap) {
        // define starter values
        this.metaData = {};
        this.othersFound = false;

        // start populating meta data
        Children.forEach(children, (child: JSX.Element, index: number) => {
            // get sparta name of child
            const childName =
                child && child.props && child?.props['data-sparta']
                    ? child.props['data-sparta']
                    : 'not-found';

            // check if we need to gather metadata;
            if (componentMap[childName]) {
                // check if there is already collected metadata
                if (!this.metaData?.[childName]) {
                    this.metaData[childName] = [];
                }

                // get props from child
                const { props: childProps } = child;

                // instantiate metadata
                const componentMeta: ComponentMeta<any> = {
                    index: index,
                    instance: this.metaData[childName]?.length ?? 0,
                    props: childProps,
                };

                // push metadata
                this.metaData[childName].push(componentMeta);
            } else {
                this.othersFound = true;
            }
        });
    }

    /**
     * Gets meta data of component
     *
     * @param apolloName gets the meta data of given sparta name
     * @return d
     */
    get = <T>(apolloName: keyof MetaData): ComponentMeta<T>[] | null => {
        if (!this.metaData[apolloName]) return null;
        return this.metaData[apolloName];
    };

    /**
     * Checks to see if meta data other than specified object map
     * has been found.
     *
     * > For performance reasons, we don't store other metadata.
     *
     * @return whether there are other components
     */
    hasOther = (): boolean => this.othersFound;
}
