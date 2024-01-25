/**
 * Will ensure that the component name is always correct, if it is not it will throw an error.
 *
 * @param props component properties
 * @param name expected name of component
 */
export const guardSpartaName = (props: any, name: string): void => {
    if (props['data-sparta'] !== name) {
        throw new Error(`Sparta component name must be ${name}`);
    }
};
