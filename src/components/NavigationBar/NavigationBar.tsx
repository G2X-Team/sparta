import React, { CSSProperties, HTMLAttributes, ReactNode, useState, useEffect } from 'react';
import {
    ComponentPosition,
    ComponentSize,
    ComponentVerticalOrientation,
} from '../../interfaces/Properties';
import FormatChildren from '../../util/FormatChildren';
import './NavigationBar.css';

import { Text } from '../Text/Text';
import Section from './overload/Section';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** If the component is not static, it will determine the orientation of the component */
    orientation?: ComponentVerticalOrientation;
    /** Determines the position of the component */
    position?: ComponentPosition;
    /** Size of the navigation bar */
    size?: ComponentSize;
    /** Title of the navigation bar can be any kind of element, string, or number */
    titleElement?: ReactNode;
}

/**
 * Component that serves as the top navigation for all components
 *
 * @return Navigation Bar component
 */
export const NavigationBar: React.FC<Props> = ({
    size = 'medium',
    position = 'static',
    orientation,
    children,
    titleElement,
    style,
    ...props
}: Props) => {
    // state
    const [mobile, setMobile] = useState(false);

    /**
     * Render all navigation bar children components
     *
     * @return formatted components
     */
    const renderAll = (): JSX.Element[] => {
        const parentProps = { children };
        const formatted = new FormatChildren(parentProps, { Section });

        return formatted.getAll();
    };

    return (
        <div
            {...props}
            className="apollo-component-library-navigation-bar-component"
            style={getNavigationStyle(size, style)}
        >
            <Text
                header={3}
                bold
                className="apollo-component-library-navigation-bar-component-title"
            >
                {titleElement}
            </Text>
            {renderAll()}
        </div>
    );
};

/**
 * Gets the navigation style object
 *
 * @param size size of the component
 * @param style original style object
 * @return navigation style object
 */
const getNavigationStyle = (
    size: ComponentSize | undefined,
    style: CSSProperties | undefined
): CSSProperties => {
    let height: string;
    let padding: string;

    switch (size) {
        case 'small':
            height = '40px';
            padding = '0 10px';
            break;
        case 'large':
            height = '80px';
            padding = '0 30px';
            break;
        default:
            height = '60px';
            padding = '0 20px';
    }

    return {
        height,
        padding,
        ...style,
    };
};
