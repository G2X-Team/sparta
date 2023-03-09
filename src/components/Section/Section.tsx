import type { HTMLAttributes, FC } from 'react';
import React, { CSSProperties } from 'react';

import type { Apollo } from '../../interfaces/Apollo';
import type { Interface } from '../../interfaces/Overload';
import type * as CSS from 'csstype';
import { gaurdApolloName } from '../../util/ErrorHandling';

export interface ISection extends Interface<HTMLAttributes<HTMLDivElement>>, Apollo<'Section'> {
    /** value that determines the flex style prop of section */
    flex?: CSS.Property.Flex;
    /** Makes flex direction equal to column */
    column?: boolean;
    /** value that determines the height of section */
    height?: CSS.Property.Height;
    /** value that determines the width of section */
    width?: CSS.Property.Width;
    /** value that determines the min width of the section */
    minWidth?: CSS.Property.MinWidth;
    /** value that determines the min height of the section */
    minHeight?: CSS.Property.MinHeight;
    /** Determines whether there is flex wrap */
    flexWrap?: boolean;
    /** justify content value */
    justifyContent?: CSS.Property.JustifyContent;
    /** align items value */
    alignItems?: CSS.Property.AlignItems;
    /** if section is inline, it will not take up the full width of its parent */
    inline?: boolean;
    /** gap value */
    gap?: CSS.Property.Gap;
    /**
     * if section is a navigation bar, it will compress to a hamburger given it shrinks past
     * its min-width
     */
    navigation?: boolean;
    /** Centers section content vertically */
    centerVertical?: boolean;
    /** Centers section content horizontally */
    centerHorizontal?: boolean;
    /** Centers section content both vertically and horizontally */
    center?: boolean;
}

/**
 * Interfacing component that implements flex to facilitate flexbox grids
 *
 * @return section component
 */
export const Section: FC<ISection> = ({
    parentProps,
    flex = 1,
    flexWrap = false,
    minWidth,
    minHeight,
    children,
    gap,
    className,
    height,
    width,
    style,
    justifyContent,
    alignItems,
    inline,
    column,
    center,
    centerVertical,
    centerHorizontal,
    ...props
}) => {
    gaurdApolloName(props, 'Section');

    return (
        <div
            {...props}
            className={className}
            style={getSectionStyle({
                gap,
                flex,
                height,
                inline,
                width,
                minWidth,
                minHeight,
                column,
                center,
                flexWrap,
                centerVertical,
                centerHorizontal,
                alignItems,
                justifyContent,
                style,
            })}
        >
            {parentProps?.renderAll ? parentProps?.renderAll(children) : children}
        </div>
    );
};

Section.defaultProps = { 'data-apollo': 'Section' };

/**
 * Gets section style objects from properties
 *
 * @return section style object
 */
const getSectionStyle = ({
    flex,
    height,
    width,
    minWidth,
    minHeight,
    alignItems,
    justifyContent,
    style,
    column,
    center,
    centerVertical,
    inline,
    centerHorizontal,
    flexWrap,
    gap,
}: ISection): CSSProperties => {
    // get flex direction
    const flexDirection = column ? 'column' : 'row';
    const wrap = flexWrap ? 'wrap' : 'nowrap';

    // get settings to center elements
    const centeredSettings: CSSProperties = {};
    if (center) {
        centeredSettings.alignItems = 'center';
        centeredSettings.justifyContent = 'center';
    } else {
        if (centerVertical) {
            if (!column) {
                if (flexWrap) centeredSettings.alignContent = 'center';
                else centeredSettings.alignItems = 'center';
            } else centeredSettings.justifyContent = 'center';
        }

        if (centerHorizontal) {
            if (!column) centeredSettings.justifyContent = 'center';
            else {
                if (flexWrap) centeredSettings.alignContent = 'center';
                else centeredSettings.alignItems = 'center';
            }
        }
    }

    return {
        display: inline ? 'inline-flex' : 'flex',
        flexWrap: wrap,
        flexDirection,
        flex,
        height,
        width,
        minWidth,
        minHeight,
        alignItems,
        gap,
        justifyContent,
        ...centeredSettings,
        ...style,
    };
};
