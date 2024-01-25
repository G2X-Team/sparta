import type { CSSProperties } from 'react';
import type * as CSS from 'csstype';

interface TextStyle {
    color?: string;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
}

export type TextTheme = TextStyle & {
    h1?: TextStyle;
    h2?: TextStyle;
    h3?: TextStyle;
};

export type Theme = {
    /** User specified theme */
    [specificTheme: string]: CSSProperties | any;
    /** Default theme */
    primary?: CSS.Property.Color;
    /** Preset theme 1 */
    secondary?: CSS.Property.Color;
    /** Preset theme 2 */
    tertiary?: CSS.Property.Color;
    /** Preset theme 3 */
    neutral?: CSS.Property.Color;
    /** Theme to apply to all text */
    text?: TextTheme;
};

/** Styling of an individual component */
export type ComponentCSS = CSSProperties & {
    hover?: CSSProperties;
    active?: CSSProperties;
    focus?: CSSProperties;
    disabled?: CSSProperties;
    focusWithin?: CSSProperties;
    disabledWithin?: CSSProperties;
};

export type ApolloTheme = {
    /**
     * CSS Theme Pattern to apply to components
     */
    [specificTheme: string]:
        | CSSProperties
        | {
              /** Sparta component to which the theme pattern applies to */
              [apolloName: string]: ComponentCSS;
          };
};
