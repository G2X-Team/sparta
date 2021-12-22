import React from 'react';
import { Props, Option as COption } from '../../Option/Option';
import Overload from '../../../interfaces/Overload';

/**
 * Component that formats options pertaining to the Drawer
 *
 * @return Overloaded option
 */
const Option: React.FC<Overload<Props>> = ({ style, children, ...props }: Overload<Props>) => {
    return (
        <COption {...props} style={{ ...style, ...optionStyle }}>
            {children}
        </COption>
    );
};

const optionStyle: { [value: string]: string | number } = {
    height: '2em',
    display: 'flex',
    alignItems: 'center',
};

export default Option;
