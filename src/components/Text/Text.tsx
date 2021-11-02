import React, { HTMLAttributes, ReactNode } from 'react';
import './Text.css';

export interface Props extends HTMLAttributes<HTMLParagraphElement> {
    /** Text needs to exist between tags */
    children: ReactNode;
    /** Determines whether it is a header or not, number directly relates to the kind of header tag i.e. header={1} => h1 */
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
}

/**
 * Typography component for the Apollo Component Library
 */
export const Text = ({
    children, 
    header = 0, 
    margins = true,
    inline = false,
    bold = false,
    italic = false,
    underline = false,
    upper = false,
    lower = false,
    pascal = false,
    ...props
}: Props) => {
    /**
     * Gets all the special conditions and translates it to a special className combination granting all conditions
     * 
     * @returns the full variant title
     */
    const getVariant = (): string => {
        // determine custom variant
        let customVariant: string = 'apollo-component-library-typography-component ';

        // check if its a header or not
        if (header == 1) customVariant += 'first-header ';
        if (header == 2) customVariant += 'second-header ';
        if (header == 3) customVariant += 'third-header ';

        // check if any of the special cases are met
        if (!margins) customVariant += 'no-margins ';
        if (inline) customVariant += 'inline ';
        if (italic) customVariant += 'italic ';
        if (bold) customVariant += 'bold '
        if (underline) customVariant += 'underline ';

        return customVariant;
    }

    /**
     * Given a valid string the method will convert the first word of each letter to uppercase and the rest lowercase
     * 
     * @param target string that needs to be converted
     * @returns converted string
     */
    const convertPascal = (target: string): string => {
        let outputArr: string[] = target.split(' ').map((word: string) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });

        return outputArr.join(' ');
    }

    /**
     * If the children object is also a string, it will convert according to the provided properties
     * 
     * @returns correctly cased string, or corresponding children
     */
    const getCorrectCasing = (): string | ReactNode => {
        if (typeof children === 'string') {
            switch (true) {
                case upper: return children.toUpperCase();
                case lower: return children.toLowerCase();
                case pascal: return convertPascal(children);
            }
        }

        return children;
    }

    return (
        <p {...props} className={getVariant()}>{getCorrectCasing()}</p>
    )
}