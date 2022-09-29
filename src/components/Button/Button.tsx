/* eslint-disable react/prop-types */
import { HTMLAttributes, ReactNode, FC, ForwardedRef, useContext, CSSProperties } from 'react';
import React, { forwardRef } from 'react';
import './Button.css';

import type { Apollo } from '../../interfaces/Apollo';
import { gaurdApolloName } from '../../util/ErrorHandling';

import { Text } from '../Text/Text';
import { Spinner } from '../Spinner/Spinner';
import { Section } from '../Section/Section';
import { DefaultTheme } from '../ThemeProvider/ThemeProvider';
import { Theme } from '../../interfaces/Theme';
import { applyTheme } from '../../util/Theming';
import { changeOpacity, determineForeground } from '../../util/colorTheory';

export interface IButton extends HTMLAttributes<HTMLButtonElement>, Apollo<'Button'> {
    /** Required ReactNode that needs to exist between component tags */
    children: ReactNode;
    /** defines the type of button to be rendered */
    variant?: 'solid' | 'outline' | 'none';
    /** the value it reads from to apply it's theme */
    theme?: string;
    /** callback function to be called when there is a method click */
    onClick?: () => void;
    /** disables button */
    disabled?: boolean;
    /** Allows use of references */
    ref?: ForwardedRef<HTMLButtonElement>;
    /** Determines the type of button */
    type?: 'button' | 'submit' | 'reset';
    /** Determines whether the button is loading or not */
    loading?: boolean;
}

/**
 * Button component for the Apollo Component Library
 *
 * @return Button component
 */
export const Button: FC<IButton> = forwardRef(function Button(
    {
        children,
        className = '',
        theme = 'primary',
        loading,
        disabled,
        variant = 'solid',
        onMouseEnter,
        onMouseLeave,
        style,
        ...props
    }: IButton,
    ref: ForwardedRef<HTMLButtonElement>
) {
    gaurdApolloName(props, 'Button');
    const t = useContext(DefaultTheme);
    const buttonDisabled = disabled || loading;
    const variantStyle = !buttonDisabled ? getVariantStyle(variant, theme, t) : undefined;

    /**
     * Determines the style of the button based on the variant
     * @param event mouse event
     * @param hover boolean to determine if the mouse is hovering or not
     */
    const determineOutlineBackground = (event: any, hover: boolean): void => {
        if (!buttonDisabled && variant === 'outline') {
            event.target.style.background = hover ? variantStyle?.borderColor : 'transparent';
            event.target.style.color = hover
                ? determineForeground(variantStyle?.borderColor ?? 'white')
                : variantStyle?.color || t?.text?.color;
        }
        if (hover && onMouseEnter) onMouseEnter(event);
        if (!hover && onMouseLeave) onMouseLeave(event);
    };

    return (
        <button
            {...props}
            onMouseEnter={(e) => determineOutlineBackground(e, true)}
            onMouseLeave={(e) => determineOutlineBackground(e, false)}
            aria-busy={loading}
            style={{ ...variantStyle, ...style }}
            disabled={disabled || loading}
            className={`apollo ${variant} ${className}`}
            ref={ref}
        >
            {!loading ? (
                <Text>{children}</Text>
            ) : (
                <Section center>
                    <Spinner size="1rem" loading innerColor="#edeff1" />
                </Section>
            )}
        </button>
    );
});

Button.defaultProps = { 'data-apollo': 'Button' };

/**
 * This will be used to create a theme for the button
 *
 * @param variant variant name
 * @param themeValue theme key
 * @param theme theme property
 * @return the theme for the button
 */
const getVariantStyle = (
    variant: string,
    themeValue: string,
    theme: Theme
): CSSProperties | undefined => {
    let newTheme: CSSProperties = {};
    let fallBack: CSSProperties = {};
    switch (variant) {
        case 'solid':
            fallBack = {
                background: 'default',
            };

            newTheme = applyTheme(theme, themeValue, 'Button', fallBack);
            if (!newTheme.color) {
                newTheme.color = determineForeground(newTheme.background as string);
            }

            if (!newTheme.outlineColor) {
                newTheme.outlineColor = changeOpacity(newTheme.background as string, 0.3);
            }

            return newTheme;
        case 'outline':
            fallBack = {
                borderColor: 'default',
            };

            newTheme = applyTheme(theme, themeValue, 'Button', fallBack);
            if (!newTheme.borderWidth) {
                newTheme.borderWidth = '2px';
            }
            if (!newTheme.borderStyle) {
                newTheme.borderStyle = 'solid';
            }
            if (!newTheme.color) {
                newTheme.color = theme?.text?.color;
            }
            if (!newTheme.outlineColor) {
                newTheme.outlineColor = changeOpacity(newTheme.borderColor as string, 0.3);
            }

            return newTheme;
        default:
            return;
    }
};
