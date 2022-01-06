import React, { CSSProperties, HTMLAttributes } from 'react';
import Overload from '../../interfaces/Overload';
import * as CSS from 'csstype';

export interface Props extends Overload<HTMLAttributes<HTMLDivElement>> {
    /** value that determines the flex style prop of section */
    flex?: number;
    /** value that determines the height of section */
    height?: number | string;
    /** value that determines the width of section */
    width?: number | string;
    /** justify content value */
    justifyContent?: CSS.Property.JustifyContent;
    /** align items value */
    alignItems?: CSS.Property.AlignItems;
}

/**
 * Interfacing component that implements flex to facilitate flexbox grids
 *
 * @return section component
 */
export const Section: React.FC<Props> = ({
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
}: Props): JSX.Element => {
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
    flex: number,
    height: number | string | undefined,
    width: number | string | undefined,
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
