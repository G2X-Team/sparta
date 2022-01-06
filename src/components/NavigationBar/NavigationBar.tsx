import React, { HTMLAttributes } from 'react';
import { ComponentVerticalOrientation } from '../../interfaces/Properties';
import './NavigationBar.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    orientation?: ComponentVerticalOrientation;
}

/**
 * Component that serves as the top navigation for all components
 *
 * @return Navigation Bar component
 */
export const NavigationBar: React.FC<Props> = ({ orientation, children, ...props }: Props) => {
    return (
        <div className="apollo-component-library-navigation-bar-component" {...props}>
            {children}
        </div>
    );
};
