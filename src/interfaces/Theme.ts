import type { CSSProperties } from 'react';
import type * as CSS from 'csstype';

interface TextStyle {
    color?: string;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
}

type TextTheme = TextStyle & {
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
