import React from 'react';
import { IOption, Option as COption } from '../../Option/Option';
import type { Overload } from '../../../interfaces/Overload';

/**
 * Component that formats options pertaining to the Drawer
 *
 * @return Overloaded option
 */
const Option: React.FC<Overload<IOption>> = ({ style, children, ...props }: Overload<IOption>) => {
    return (
        <COption {...props} style={getOptionStyle(style)}>
            {children}
        </COption>
    );
};

/**
 * Gets option style object
 *
 * @param style component style property
 * @return option style object
 */
const getOptionStyle = (style: React.CSSProperties | undefined): React.CSSProperties => {
    return {
        height: '2em',
        display: 'flex',
        alignItems: 'center',
        ...style,
    };
};

export default Option;
