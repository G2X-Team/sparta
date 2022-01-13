import React, {
    CSSProperties,
    HTMLAttributes,
    ReactNode,
    useState,
    useEffect,
    useRef,
} from 'react';
import {
    ComponentPosition,
    ComponentSize,
    ComponentVerticalOrientation,
} from '../../interfaces/Properties';
import * as CSS from 'csstype';

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
    /** Method that executes when the title is clicked */
    onTitleClick?: () => void;
    /** Title color, also determines the color of the hamburger menu if applicable */
    titleColor?: CSS.Property.Color;
}

/**
 * Component that serves as the top navigation for all components
 *
 * @return Navigation Bar component
 */
export const NavigationBar: React.FC<Props> = ({
    size = 'medium',
    position = 'static',
    orientation = 'top',
    children,
    titleElement,
    onTitleClick,
    style,
    ...props
}: Props) => {
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
    const renderAll = (): JSX.Element[] => {
        const parentProps = { children, mobile };
        const formatted = new FormatChildren(parentProps, { Section });

        return formatted.getAll();
    };

    return (
        <div
            {...props}
            className={`apollo-component-library-navigation-bar-component 
                ${position} ${orientation}
            `}
            style={getNavigationStyle(size, style)}
            ref={navigationBar}
        >
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
