import type { Theme } from '../interfaces/Theme';
import { defaultTheme } from '../components/ThemeProvider/ThemeProvider';
import { CSSProperties } from 'react';
import type * as CSS from 'csstype';
import { colorNameToHex } from './colornameToHex';

/**
 * This function will fill out a theme object with default values if
 * they are not specified
 *
 * @param theme incomplete theme object
 * @return complete theme object with default values if applicable
 */
export const createTheme = (theme: Theme): Theme => {
    const newTheme = defaultTheme;

    Object.keys(theme).forEach((key) => {
        newTheme[key] = theme[key];
    });

    return newTheme;
};

/**
 * Theme stuff
 * @param theme s
 * @param themeName s
 * @param apolloName d
 * @param fallback d
 * @return CSSProperties dsaf
 */
export const applyTheme = (
    theme: Theme,
    themeName: string,
    apolloName: string,
    fallback: CSSProperties
): CSSProperties => {
    // check if the theme is a preset
    let newTheme: CSSProperties = {};
    if (
        themeName === 'primary' ||
        themeName === 'secondary' ||
        themeName === 'tertiary' ||
        themeName === 'neutral'
    ) {
        // if it is a preset, and there is a designated apollo name, return preset specific
        if (theme[themeName + apolloName]) {
            newTheme = theme[themeName + apolloName];
        }

        // if it is a preset, and there is no designated apollo name, return preset
        Object.keys(fallback).forEach((key) => {
            if (!(newTheme as any)[key]) {
                (newTheme as any)[key] = theme[themeName];
            }
        });

        return newTheme;
    }

    Object.keys(fallback).forEach((key) => {
        if (theme[themeName][key]) {
            (newTheme as any)[key] = theme[themeName][key];
        }
    });

    return newTheme;
};

/**
 * Will return a suggested foreground color based on the background color
 *
 * @param color color of bakcground
 * @return suggested foreground color
 */
export const determineForeground = (color: CSS.Property.Color | undefined): string | undefined => {
    if (!color) return undefined;
    if (typeof color !== 'string') return;

    // gets rgb values
    let r: number;
    let g: number;
    let b: number;

    // handles hex colors
    if (color[0] === '#' || colorNameToHex[color]) {
        // stores the hex color;
        let hex: string;

        // mutates hex color accordingly
        if (colorNameToHex[color]) hex = colorNameToHex[color];
        else if (color.length == 4) hex = color + color.substring(1, 4);
        else hex = color;

        // get color components
        [r, g, b] = [1, 3, 5].map((p) => parseInt(hex.substring(p, p + 2), 16));
    } else if (color.includes('hsl')) {
        /* The following code is provided by: 
           https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex */

        // get number params from color function
        const params: Array<string> = color
            .substring(color.indexOf('(') + 1, color.indexOf(')'))
            .split(',');

        // get hue degree
        let h = parseInt(params[0]) / 360;
        while (h > 1) h -= 1; // always gets ratio under 100%

        // get saturation percentage
        let s = parseInt(params[1]) / 100;
        while (s > 1) s -= 1; // always gets ratio under 100%

        // get lightness percentage
        let l = parseInt(params[2]) / 100;
        while (l > 1) l -= 1;

        /**
         * Gets rgb color component given different hue values
         *
         * @param p color component
         * @param q color component
         * @param t color component
         * @return color component
         */
        const hue2rgb = (p: number, q: number, t: number): number => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        // component processing
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        // gets color components with processed components
        r = hue2rgb(p, q, h + 1 / 3) * 255;
        g = hue2rgb(p, q, h) * 255;
        b = hue2rgb(p, q, h - 1 / 3) * 255;
    } else {
        // get number params from color function
        const params: Array<string> = color
            .substring(color.indexOf('(') + 1, color.indexOf(')'))
            .split(',');

        // get color components
        [r, g, b] = params.map((colorVal: string) => parseInt(colorVal));
    }

    // quick maths to get foreground color
    const maths = (r * 299 + g * 587 + b * 114) / 1000 >= 128;
    return maths ? 'black' : 'white';
};
