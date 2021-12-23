/**
 * Overloads parent components for use in overload components
 */
type Overload<Props extends { [value: string]: any }> = Props & {
    /** Props inherited by parents */
    parentProps?: any;
};

export default Overload;
