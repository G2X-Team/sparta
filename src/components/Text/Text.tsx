import type { HTMLAttributes, FC } from 'react';
import React, { ReactNode } from 'react';
import * as CSS from 'csstype';
import './Text.css';

export interface IText extends HTMLAttributes<HTMLParagraphElement> {
    /** Text needs to exist between tags */
    children: ReactNode;
    /**
     * Determines whether it is a header or not, number directly relates to the kind of header
     * tag i.e. header={1} => h1
     */
    header?: 0 | 1 | 2 | 3;
    /** Determines whether the element has margins or not */
    margins?: boolean;
    /** Determines whether the element is inline or not */
    inline?: boolean;
    /** Determines whether the text is bold or not */
    bold?: boolean;
    /** Determines whether the text is italic or not */
    italic?: boolean;
    /** Determines whether the text is underline */
    underline?: boolean;
    /** Determines whether the text is uppercase or not */
    upper?: boolean;
    /** Determines whether the text is lowercase or not */
    lower?: boolean;
    /** Determines whether the first letter of every word is capital or not */
    pascal?: boolean;
    /** Decide the color of the text without accessing the style iText */
    color?: CSS.Property.Color;
    /** Determines whether the text is disabled or not */
    disabled?: boolean;
}

/**
 * Typography component that allows for extensive customization via prop changes
 *
 * @return Text component
 */
export const Text: FC<IText> = ({
    children,
    className = '',
    header = 0,
    margins = false,
    inline = false,
    bold = false,
    italic = false,
    underline = false,
    upper = false,
    lower = false,
    pascal = false,
    disabled = false,
    color,
    style,
    ...iText
}) => {
    /**
     * Gets all the special conditions and translates it to a special className combination
     * granting all conditions
     *
     * @return the full variant title
     */
    const getVariant = (): string => {
        // determine custom variant
        let customVariant = 'apollo-component-library-typography-component ';

        // check if its a header or not
        if (header == 1) customVariant += 'first-header ';
        if (header == 2) customVariant += 'second-header ';
        if (header == 3) customVariant += 'third-header ';

        // check if any of the special cases are met
        if (!margins) customVariant += 'no-margins ';
        if (inline) customVariant += 'inline ';
        if (italic) customVariant += 'italic ';
        if (bold) customVariant += 'bold ';
        if (underline) customVariant += 'underline ';
        if (disabled) customVariant += 'disabled ';

        // add className
        customVariant += className;

        return customVariant;
    };

    /**
     * Given a valid string the method will convert the first word of each letter to uppercase and
     * the rest lowercase
     *
     * @param target string that needs to be converted
     * @return converted string
     */
    const convertPascal = (target: string): string => {
        const outputArr: string[] = target.split(' ').map((word: string) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });

        return outputArr.join(' ');
    };

    /**
     * If the children object is also a string, it will convert according to the provided
     * properties
     *
     * @return correctly cased string, or corresponding children
     */
    const getCorrectCasing = (): string | ReactNode => {
        if (typeof children === 'string') {
            switch (true) {
                case upper:
                    return children.toUpperCase();
                case lower:
                    return children.toLowerCase();
                case pascal:
                    return convertPascal(children);
            }
        }

        return children;
    };

    return (
        <span {...iText} style={getTextStyle(color, style)} className={getVariant()}>
            {getCorrectCasing()}
        </span>
    );
};

/**
 * Gets text style object
 *
 * @param color string determing alternative color
 * @param style text style property
 * @return text style object
 */
const getTextStyle = (
    color: string | undefined,
    style: React.CSSProperties | undefined
): React.CSSProperties => {
    return { color, ...style };
};
