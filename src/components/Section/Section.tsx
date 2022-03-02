import type { HTMLAttributes, FC } from 'react';
import React, { CSSProperties } from 'react';
import Overload from '../../interfaces/Overload';
import * as CSS from 'csstype';

export interface ISection extends Overload<HTMLAttributes<HTMLDivElement>> {
    /** value that determines the flex style prop of section */
    flex?: CSS.Property.Flex;
    /** value that determines the height of section */
    height?: CSS.Property.Height;
    /** value that determines the width of section */
    width?: CSS.Property.Width;
    /** value that determines the min width of the section */
    minWidth?: CSS.Property.MinWidth;
    /** justify content value */
    justifyContent?: CSS.Property.JustifyContent;
    /** align items value */
    alignItems?: CSS.Property.AlignItems;
    /**
     * if section is a navigation bar, it will compress to a hamburger given it shrinks past
     * its min-width
     */
    navigation?: boolean;
}

/**
 * Interfacing component that implements flex to facilitate flexbox grids
 *
 * @return section component
 */
export const Section: FC<ISection> = ({
    parentProps,
    flex = 1,
    children,
    className,
    height,
    width,
    style,
    justifyContent,
    alignItems,
    ...props
}) => {
    return (
        <div
            {...props}
            className={className}
            style={getSectionStyle(flex, height, width, alignItems, justifyContent, style)}
        >
            {children}
        </div>
    );
};

/**
 * Gets section style objects from properties
 *
 * @param flex value that determines the flex style prop
 * @param height value that determines height
 * @param width value that determines width
 * @param alignItems value that determines alignItems style prop
 * @param justifyContent value that determines justifyContent style prop
 * @param style object containing style attributes from original prop
 * @return section style object
 */
const getSectionStyle = (
    flex: CSS.Property.Flex | undefined,
    height: CSS.Property.Height | undefined,
    width: CSS.Property.Width | undefined,
    alignItems: CSS.Property.AlignItems | undefined,
    justifyContent: CSS.Property.JustifyContent | undefined,
    style: CSSProperties | undefined
): CSSProperties => {
    return {
        display: 'flex',
        flex,
        height,
        width,
        alignItems,
        justifyContent,
        ...style,
    };
};
