import type { HTMLAttributes, ReactNode, FC } from 'react';
import React, { CSSProperties, useState, useEffect, useRef } from 'react';
import './NavigationBar.css';

import type { Apollo } from '../../interfaces/Apollo';
import type {
    ComponentPosition,
    ComponentVerticalOrientation,
    ComponentSize,
} from '../../interfaces/Properties';
import type * as CSS from 'csstype';
import FormatChildren from '../../util/formatting/FormatChildren';
import { gaurdApolloName } from '../../util/ErrorHandling';

import { Text } from '../Text/Text';
import Section from './overload/Section';
import { RenderAll } from '../../interfaces/Overload';

export interface INavigationBar extends HTMLAttributes<HTMLDivElement>, Apollo<'NavigationBar'> {
    /** If the component is not static, it will determine the orientation of the component */
    orientation?: ComponentVerticalOrientation;
    /** Determines the position of the component */
    position?: ComponentPosition;
    /** Size of the navigation bar */
    size?: ComponentSize;
    /** Title of the navigation bar can be any kind of element, string, or number */
    titleElement?: ReactNode;
    /** Method that executes when the title is clicked */
    onTitleClick?: () => void;
    /** Title color, also determines the color of the hamburger menu if applicable */
    titleColor?: CSS.Property.Color;
    /** inner div styling */
    innerStyle?: CSSProperties;
}

/**
 * Component that serves as the top navigation for all components
 *
 * @return Navigation Bar component
 */
export const NavigationBar: FC<INavigationBar> = ({
    size = 'medium',
    position = 'static',
    orientation = 'top',
    className = '',
    children,
    titleElement,
    onTitleClick,
    innerStyle,
    style,
    ...props
}: INavigationBar) => {
    gaurdApolloName(props, 'NavigationBar');

    // refs
    const navigationBar = useRef<HTMLDivElement>(null);
    // state
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        if (navigationBar?.current?.offsetWidth && navigationBar?.current?.offsetWidth < 700) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    }, [navigationBar.current?.offsetWidth]);

    /**
     * Render all navigation bar children components
     *
     * @return formatted components
     */
    const renderAll: RenderAll = () => {
        const parentProps = { children, mobile };
        const formatted = new FormatChildren(children, { Section }, parentProps);

        return formatted.getAll();
    };

    return (
        <nav
            {...props}
            className={`apollo
                ${position} ${orientation} ${className}
            `}
            style={getNavigationStyle(size, style)}
            ref={navigationBar}
        >
            <div style={innerStyle}>
                <Text
                    header={3}
                    bold
                    onClick={onTitleClick}
                    className={`apollo-component-library-navigation-bar-component-title 
                        ${mobile && 'mobile'} ${onTitleClick && 'clickable'}
                    `}
                >
                    {titleElement}
                </Text>
                <ul>{renderAll()}</ul>
            </div>
        </nav>
    );
};

NavigationBar.defaultProps = { 'data-apollo': 'NavigationBar' };

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
