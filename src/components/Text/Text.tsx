import { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';
import './Text.css';

import type { Apollo } from '../../interfaces/Apollo';
import type * as CSS from 'csstype';
import { gaurdApolloName } from '../../util/ErrorHandling';

export interface IText extends HTMLAttributes<HTMLParagraphElement>, Apollo<'Text'> {
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
    /** Decide the color of the text without accessing the style props */
    color?: CSS.Property.Color;
    /** Determines whether the text is disabled or not */
    disabled?: boolean;
    /** If you want text to be untouched by theming */
    ignoreTheme?: boolean;
}

/**
 * Typography component that allows for extensive customization via prop changes
 *
 * @return Text component
 */
export const Text: FC<IText> = ({
    children,
    className = '',
    header,
    margins = false,
    inline = false,
    bold = false,
    italic = false,
    underline = false,
    upper = false,
    lower = false,
    pascal = false,
    disabled = false,
    theme = 'primary',
    ignoreTheme = false,
    color,
    style,
    ...props
}) => {
    gaurdApolloName(props, 'Text');

    /**
     * Gets all the special conditions and translates it to a special className combination
     * granting all conditions
     *
     * @return the full variant title
     */
    const getVariant = (): string => {
        // determine custom variant
        let customVariant = 'apollo ' + theme + ' ';

        // check if its a header or not
        if (header) customVariant += `h${header} `;

        // check if any of the special cases are met
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
        <span
            {...props}
            style={{
                color,
                fontWeight: bold ? 'bold' : 'normal',
                fontStyle: italic ? 'italic' : 'normal',
                textDecoration: underline ? 'underline' : 'none',
                margin: margins ? undefined : 0,
                display: inline ? 'inline' : undefined,
                ...style,
            }}
            className={getVariant()}
            role={header ? 'heading' : undefined}
            aria-level={header === 0 || !header ? undefined : header}
        >
            {getCorrectCasing()}
        </span>
    );
};

Text.defaultProps = { 'data-apollo': 'Text' };
