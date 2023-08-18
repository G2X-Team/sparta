import type { ApolloTheme, ComponentCSS } from '../interfaces/Theme';
import type { CSSProperties } from 'react';
import type * as CSS from 'csstype';
import { colorNameToHex } from './colornameToHex';
import { changeOpacity } from './colorTheory';

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

/**
 * Converts js css properties to css string
 *
 * @param css javascript object of css properties
 * @return css properties as string
 */
const getCSSString = (css: CSSProperties): string => {
    const SPECIAL_PROPS = {
        hover: true,
        focus: true,
        active: true,
        disabled: true,
    };

    let cssString = '';
    Object.keys(css).forEach((key) => {
        if ((SPECIAL_PROPS as any)[key]) return;

        // convert camelCase to kebab-case
        const kebabKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
        cssString += `${kebabKey}: ${css[key as keyof CSSProperties]};`;
    });

    return cssString;
};

/**
 * Given valid Apollo CSS, the function will create a style tag with the CSS and append it to the
 * document's body
 *
 * @param document document to append to
 * @param theme theme to apply Apollo CSS to
 */
export const createApolloCSS = (document: Document, theme: ApolloTheme): void => {
    // check if css already exists
    if (document.getElementById('apollo-css')) return;

    // create style tag
    const styleTag = document.createElement('style');
    styleTag.id = 'apollo-css';

    // create css string
    let cssString = '';

    // loop through every theme
    Object.keys(theme).forEach((themeName) => {
        // loop through every apollo name
        Object.keys(theme[themeName]).forEach((apolloName) => {
            // define component
            const component = (theme[themeName] as any)[apolloName];

            // check if component has a variant
            const [componentName, variant] = apolloName.split('-');
            let classname = `.apollo[data-apollo="${componentName}"]`;
            if (variant) classname += `.${variant}`;

            // add css to string
            cssString += `${classname} {${getCSSString(component as CSSProperties)}}`;

            // check components special props
            if (component?.hover)
                cssString += `${classname}:hover {${getCSSString(component.hover)}}`;
            if (component?.focus)
                cssString += `${classname}:focus {${getCSSString(component.focus)}}`;
            if (component?.active)
                cssString += `${classname}:active {${getCSSString(component.active)}}`;
            if (component?.disabled)
                cssString += `${classname}:disabled {${getCSSString(component.disabled)}}`;
        });
    });

    // set style tag's inner text to css string
    styleTag.innerText = cssString;

    // append style tag to document
    document.body.appendChild(styleTag);
};

const DefaultTheme: ApolloTheme = {
    primary: { color: '#1B75BC' },
    secondary: { color: '#0E214B' },
    tertiary: {
        color: '#f0f0f0',
        Button: {
            outlineColor: changeOpacity('#d1d1d1', 0.5),
        },
        ButtonOutline: {
            outlineColor: changeOpacity('#d1d1d1', 0.5),
        },
    },
    neutral: { color: '#E7EBEC' },
    invalid: { color: '#FDA29B' },
    text: {
        fontFamily: "'Roboto', sans-serif",
        color: 'inherit',
    },
};

/**
 * Fills out an incomplete theme
 * @param theme theme to fill out
 * @return completed theme
 */
const createApolloTheme = (theme: ApolloTheme): ApolloTheme => {
    const newTheme: ApolloTheme = theme;

    // define default presets
    newTheme.text = { ...DefaultTheme.text, ...theme.text };
    newTheme.primary = { ...DefaultTheme.primary, ...theme.primary };
    newTheme.secondary = { ...DefaultTheme.secondary, ...theme.secondary };
    newTheme.tertiary = { ...DefaultTheme.tertiary, ...theme.tertiary };
    newTheme.neutral = { ...DefaultTheme.neutral, ...theme.neutral };
    newTheme.invalid = { ...DefaultTheme.invalid, ...theme.invalid };

    // loop through every theme
    Object.keys(newTheme).forEach((themeName) => {
        if (themeName === 'text') return;

        // loop through every apollo name
        newTheme[themeName] = {
            // make sure to retain existing theme
            ...(newTheme[themeName] ?? {}),

            // apply default styles per applicable component
            ...getButtonStyle(newTheme, themeName),
            ...getAvatarStyle(newTheme, themeName),
            ...getTextInputStyle(newTheme, themeName),
            ...getSelectStyle(newTheme, themeName),
            ...getTextStyle(newTheme, themeName),
            ...getIconStyle(newTheme, themeName),
            ...getCalenderStyle(newTheme, themeName),
            ...getDateSelectStyle(newTheme, themeName),
        };
    });

    return newTheme;
};

/**
 * Will assign values to theme object if they don't already exist
 *
 * @param themeObject theme object to assign to
 * @param values values wanting to assign
 * @return theme object with values assigned
 */
const assignCSS = (themeObject: any, values?: CSSProperties): any => {
    if (!values) return themeObject;

    Object.keys(values).forEach((key) => {
        if (themeObject?.[key]) return;
        themeObject[key] = values[key as keyof CSSProperties];
    });

    return themeObject;
};

/**
 * Calendar default theme
 *
 * @param theme theme that the Calendar is in;
 * @param themeName name of theme
 * @return Calendar theme
 */
const getCalenderStyle = (theme: ApolloTheme, themeName: string): ApolloTheme => {
    const currentTheme: any = theme[themeName];
    const themeColor = theme?.[themeName]?.color as CSS.Property.Color;

    const CalendarCell = currentTheme?.CalendarCell ?? {};
    const CalendarDate = currentTheme?.CalendarItem ?? {};
    const CalendarDay = currentTheme?.CalendarDay ?? {};
    const CalendarSelected = currentTheme?.CalendarSelected ?? {};
    const CalendarMark = currentTheme?.CalendarMark ?? {};
    const CalendarMarkSelected = currentTheme?.CalendarMarkSelected ?? {};
    const CalendarCover = currentTheme?.CalendarCover ?? {};

    // set default theme for cell
    assignCSS(CalendarCell, {
        width: '40px',
        height: '40px',
        borderRadius: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 200ms ease',
        position: 'relative',
    });

    // set default theme for date
    assignCSS(CalendarDate, {
        transition: 'color 200ms',
        position: 'relative',
    });

    // set default theme for day
    assignCSS(CalendarDay, {});

    // set default theme for selected
    assignCSS(CalendarSelected, {
        backgroundColor: themeColor,
        color: determineForeground(themeColor),
        borderRadius: '100%',
    });

    // set default theme for marks
    assignCSS(CalendarMark, {
        backgroundColor: themeColor,
        borderRadius: '100px',
        width: '5px',
        height: '5px',
        margin: '2px auto',
        position: 'absolute',
        bottom: '2px',
    });

    // set default theme for cover
    assignCSS(CalendarCover, {
        backgroundColor: '#EDEFF1',
    });

    // set default theme for selected marks
    assignCSS(CalendarMarkSelected, {
        backgroundColor: determineForeground(themeColor),
    });

    return {
        'CalendarDay-cell': CalendarCell,
        CalendarDay,
        'CalendarDate-selected': CalendarSelected,
        CalendarMark,
        'CalendarMark-selected': CalendarMarkSelected,
        'CalendarDate-covered': CalendarCover,
    };
};

/**
 * Button default theme
 *
 * @param theme theme that the button is in;
 * @param themeName name of theme;
 * @return Button theme
 */
const getButtonStyle = (theme: ApolloTheme, themeName: string): ApolloTheme => {
    const Button = (theme[themeName] as any)?.Button ?? {};
    const ButtonOutline = (theme[themeName] as any)?.ButtonOutline ?? {};
    const themeColor = theme?.[themeName]?.color as CSS.Property.Color;

    // get solid button style
    const solidButton: ComponentCSS = Button;
    if (!solidButton?.background && !solidButton?.backgroundColor) {
        solidButton.backgroundColor = themeColor;
    }

    if (!solidButton?.color) {
        solidButton.color = determineForeground(solidButton?.backgroundColor);
    }

    if (!solidButton?.outlineColor) {
        solidButton.outlineColor = changeOpacity(
            solidButton?.backgroundColor as CSS.Property.Color,
            0.3
        );
    }

    if (!solidButton?.hover) {
        solidButton.hover = {
            filter: 'brightness(90%)',
        };
    }

    if (!solidButton?.active) {
        solidButton.active = {
            filter: 'brightness(80%)',
        };
    }

    if (!solidButton?.disabled) {
        solidButton.disabled = {
            filter: 'brightness(100%)',
            background: '#edeff1',
            color: '#98a7ad',
            cursor: 'not-allowed',
        };
    }

    // outline button style
    const outlineButton: ComponentCSS = ButtonOutline;
    if (!outlineButton?.border) {
        outlineButton.border = `1.5px solid ${themeColor}`;
    }

    if (!outlineButton?.outlineColor) {
        outlineButton.outlineColor = changeOpacity(themeColor as CSS.Property.Color, 0.3);
    }

    if (!outlineButton?.background && !outlineButton?.backgroundColor) {
        outlineButton.backgroundColor = 'transparent';
    }

    if (!outlineButton?.color) {
        outlineButton.color = theme?.text?.color as CSS.Property.Color;
    }

    if (!outlineButton?.hover) {
        outlineButton.hover = {
            filter: 'brightness(100%)',
            backgroundColor: themeColor,
            color: determineForeground(themeColor),
        };
    }

    if (!outlineButton?.focus) {
        outlineButton.focus = outlineButton.hover;
    }

    if (!outlineButton?.active) {
        outlineButton.active = {
            filter: 'brightness(80%)',
        };
    }

    if (!outlineButton?.disabled) {
        outlineButton.disabled = {
            background: 'transparent',
            borderColor: '#edeff1',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            color: '#98a7ad',
            filter: 'brightness(100%)',
            cursor: 'not-allowed',
        };
    }

    const buttonStyle = {
        'Button-solid': solidButton,
        'Button-outline': outlineButton,
    };

    return buttonStyle;
};

/**
 * Avatar default theme
 *
 * @param theme theme that the button is in;
 * @param themeName name of theme;
 * @return Avatar theme
 */
const getAvatarStyle = (theme: ApolloTheme, themeName: string): ApolloTheme => {
    const Avatar = (theme[themeName] as any)?.Avatar ?? {};
    const themeColor = theme?.[themeName]?.color as CSS.Property.Color;

    if (!Avatar?.outlineColor) {
        Avatar.outlineColor = changeOpacity(themeColor as CSS.Property.Color, 0.3);
    }

    return {
        Avatar,
    };
};

/**
 * Text input default theme
 *
 * @param theme theme to use
 * @param themeName theme name
 * @return text input theme
 */
const getTextInputStyle = (theme: ApolloTheme, themeName: string): ApolloTheme => {
    const TextInput = (theme[themeName] as any)?.TextInput ?? {};
    const InputLabel = (theme[themeName] as any)?.TextInputLabel ?? {};
    const InputHint = (theme[themeName] as any)?.TextInputHint ?? {};
    const themeColor = theme?.[themeName]?.color as CSS.Property.Color;

    // valid input
    if (!TextInput?.outlineColor) {
        TextInput.outlineColor = changeOpacity(themeColor as CSS.Property.Color, 0.3);
    }
    if (!TextInput?.border) {
        TextInput.border = `1.5px solid ${themeName === 'invalid' ? themeColor : '#E7EBEC'}`;
    }
    if (!TextInput?.color) {
        TextInput.color = theme?.text?.color as CSS.Property.Color;
    }
    if (!TextInput?.fontSize) {
        TextInput.fontSize = '1rem';
    }

    // focused input
    if (!TextInput?.focus) {
        TextInput.focus = {
            outlineColor: changeOpacity(themeColor, 0.3),
            border: `1.5px solid ${themeColor}`,
        };
    }

    // disabled input
    if (!TextInput?.disabled) {
        TextInput.disabled = {
            background: '#E7EBEC',
            cursor: 'not-allowed',
        };
    }

    // text input label
    if (!InputLabel?.color) {
        InputLabel.color = theme?.text?.color;
    }
    if (!InputLabel?.fontSize) {
        InputLabel.fontSize = '0.9rem';
    }
    if (!InputLabel?.paddingBottom) {
        InputLabel.paddingBottom = '5px';
    }
    if (!InputLabel.fontFamily) {
        InputLabel.fontFamily = theme?.text?.fontFamily;
    }

    // hint
    if (!InputHint?.color) {
        InputHint.color = '#6C8189';
    }
    if (!InputHint?.fontSize) {
        InputHint.fontSize = '0.9rem';
    }
    if (!InputHint?.paddingBottom) {
        InputHint.paddingBottom = '5px';
    }
    if (!InputHint.fontFamily) {
        InputHint.fontFamily = theme?.text?.fontFamily;
    }
    if (!InputHint?.paddingTop) {
        InputHint.paddingTop = '6px';
    }

    return {
        TextInput,
        'TextInputLabel/.label': InputLabel,
        'TextInputLabel/.hint': InputHint,
    };
};

/**
 * Select default theme
 *
 * @param theme theme to use
 * @param themeName theme name
 * @return something
 */
const getSelectStyle = (theme: ApolloTheme, themeName: string): ApolloTheme => {
    const Select = (theme[themeName] as any)?.Select ?? {};
    const SelectLabel = (theme[themeName] as any)?.SelectLabel ?? {};
    const themeColor = theme?.[themeName]?.color as CSS.Property.Color;

    // select menu
    if (!Select?.outlineColor) {
        Select.outlineColor = changeOpacity(themeColor as CSS.Property.Color, 0.3);
    }
    if (!Select?.border) {
        Select.border = `1.5px solid ${themeName === 'invalid' ? themeColor : '#E7EBEC'}`;
    }
    if (!Select.fontFamily) {
        Select.fontFamily = theme?.text?.fontFamily;
    }
    if (!Select?.color) {
        Select.color = theme?.text?.color;
    }

    // focus
    if (!Select?.focusWithin) {
        Select.focusWithin = {
            border: `1.5px solid ${themeColor}`,
        };
    }

    // select label
    if (!SelectLabel?.color) {
        SelectLabel.color = theme?.text?.color;
    }
    if (!SelectLabel?.fontSize) {
        SelectLabel.fontSize = '0.9rem';
    }
    if (!SelectLabel?.paddingBottom) {
        SelectLabel.paddingBottom = '5px';
    }
    if (!SelectLabel.fontFamily) {
        SelectLabel.fontFamily = theme?.text?.fontFamily;
    }

    // disabled
    let DisabledInput: ComponentCSS = {};
    if (!Select?.disabled) {
        DisabledInput = {
            background: '#E7EBEC',
            cursor: 'not-allowed',
        };
    } else {
        DisabledInput.disabled = Select.disabled;
    }

    return {
        'Select/> span.input': Select,
        'Select/> span.input.disabledinput': DisabledInput,
        'Select/> div.label': SelectLabel,
    };
};

/**
 * Select default theme
 *
 * @param theme theme to use
 * @param themeName theme name
 * @return something
 */
const getDateSelectStyle = (theme: ApolloTheme, themeName: string): ApolloTheme => {
    const DateSelect = (theme[themeName] as any)?.DateSelect ?? {};
    const DateSelectLabel = (theme[themeName] as any)?.DateSelectLabel ?? {};
    const themeColor = theme?.[themeName]?.color as CSS.Property.Color;

    // DateSelect menu
    if (!DateSelect?.outlineColor) {
        DateSelect.outlineColor = changeOpacity(themeColor as CSS.Property.Color, 0.3);
    }
    if (!DateSelect?.border) {
        DateSelect.border = `1.5px solid ${themeName === 'invalid' ? themeColor : '#E7EBEC'}`;
    }
    if (!DateSelect.fontFamily) {
        DateSelect.fontFamily = theme?.text?.fontFamily;
    }
    if (!DateSelect?.color) {
        DateSelect.color = theme?.text?.color;
    }

    // focus
    if (!DateSelect?.focusWithin) {
        DateSelect.focusWithin = {
            border: `1.5px solid ${themeColor}`,
        };
    }

    // DateSelect label
    if (!DateSelectLabel?.color) {
        DateSelectLabel.color = theme?.text?.color;
    }
    if (!DateSelectLabel?.fontSize) {
        DateSelectLabel.fontSize = '0.9rem';
    }
    if (!DateSelectLabel?.paddingBottom) {
        DateSelectLabel.paddingBottom = '5px';
    }
    if (!DateSelectLabel.fontFamily) {
        DateSelectLabel.fontFamily = theme?.text?.fontFamily;
    }

    // disabled
    let DisabledInput: ComponentCSS = {};
    if (!DateSelect?.disabled) {
        DisabledInput = {
            background: '#E7EBEC',
            cursor: 'not-allowed',
        };
    } else {
        DisabledInput.disabled = DateSelect.disabled;
    }

    return {
        'DateSelect/> span.input': DateSelect,
        'DateSelect/> span.input.disabledinput': DisabledInput,
        'DateSelect/> div.label': DateSelectLabel,
    };
};

/**
 * Text default theme
 *
 * @param theme theme to use
 * @param themeName theme name
 * @return Text theme
 */
const getTextStyle = (theme: ApolloTheme, themeName: string): ApolloTheme => {
    const Text = (theme[themeName] as any)?.Text ?? {};
    const TextH1 = (theme[themeName] as any)?.TextH1 ?? {};
    const TextH2 = (theme[themeName] as any)?.TextH2 ?? {};
    const TextH3 = (theme[themeName] as any)?.TextH3 ?? {};
    const textTheme = theme?.text as CSS.Properties;

    // text
    if (!Text?.fontFamily) {
        Text.fontFamily = textTheme.fontFamily;
    }
    if (!TextH1?.fontFamily) {
        TextH1.fontFamily = textTheme.fontFamily;
    }
    if (!TextH2?.fontFamily) {
        TextH2.fontFamily = textTheme.fontFamily;
    }
    if (!TextH3?.fontFamily) {
        TextH3.fontFamily = textTheme.fontFamily;
    }

    return {
        Text,
        'Text-h1': TextH1,
        'Text-h2': TextH2,
        'Text-h3': TextH3,
    };
};

/**
 * Icon default theme
 *
 * @param theme theme to use
 * @param themeName theme name
 * @return Icon theme
 */
const getIconStyle = (theme: ApolloTheme, themeName: string): ApolloTheme => {
    const Icon = (theme[themeName] as any)?.Icon ?? {};
    const themeColor = theme?.[themeName]?.color as CSS.Property.Color;
    const textTheme = theme?.text as CSS.Properties;

    // icon
    if (!Icon?.color) {
        Icon.color = textTheme.color;
    }

    const IconClickable: ComponentCSS = {};
    if (!Icon?.hover) {
        IconClickable.hover = {
            backgroundColor: themeColor,
            color: determineForeground(themeColor),
        };
    } else {
        IconClickable.hover = Icon.hover;
    }

    return {
        'Icon-clickable': IconClickable,
        Icon,
    };
};

export class ApolloCSS {
    private css: string;

    constructor(t?: ApolloTheme, document?: Document, noOverride?: true) {
        if (noOverride) {
            if (document?.getElementById('apollo-css')) {
                this.css = '';
                return;
            }
        }

        // create theme
        const theme = createApolloTheme(t ?? {});

        // create css string
        let css = '';

        // loop through every theme
        Object.keys(theme).forEach((themeName) => {
            if (themeName === 'text') return;
            // loop through every apollo name
            Object.keys(theme[themeName]).forEach((apolloName) => {
                // define component
                const component = (theme[themeName] as any)[apolloName];

                // check if component has a variant or target
                const [cM, variant] = apolloName.split('-');
                const [componentName, target] = cM.split('/');
                let classname = `.apollo[data-apollo="${componentName}"].${themeName}${
                    target ? ' ' + target : ''
                }`;
                if (variant) classname += `.${variant}`;

                // add css to string
                css += `${classname} {${getCSSString(component)}}`;

                // check components special props
                if (component?.hover)
                    css += `${classname}:hover {${getCSSString(component.hover)}}`;
                if (component?.focus)
                    css += `${classname}:focus {${getCSSString(component.focus)}}`;
                if (component?.active)
                    css += `${classname}:active {${getCSSString(component.active)}}`;
                if (component?.disabled)
                    css += `${classname}:disabled {${getCSSString(component.disabled)}}`;
                if (component?.focusWithin)
                    css += `${classname}:focus-within {${getCSSString(component.focusWithin)}}`;
            });
        });

        this.css = css;
        this.addImports('https://fonts.googleapis.com/icon?family=Material+Icons');
    }

    /**
     * This method will add imports to the css body for given fonts
     * or other assets to be used in the Apollo CSS
     *
     * @param hrefs import links to load in css
     */
    addImports(...hrefs: string[]): void {
        hrefs.forEach((href) => {
            const importStr = `@import url('${href}');`;
            this.css = `${importStr} ${this.css}`;
        });
    }

    /**
     * This method will add a style block to the document body
     * with the given css. Recommended to do this inside of a
     * useEffect hook
     *
     * @param document document to add style block to
     * @param noOverride;
     */
    applyCSS(document: Document, noOverride?: boolean): void {
        if (noOverride) {
            if (document?.getElementById('apollo-css')) return;
        } else {
            if (document?.getElementById('apollo-css')) {
                document.getElementById('apollo-css')?.remove();
            }
        }

        // create tag
        const styleTag = document.createElement('style');
        styleTag.id = 'apollo-css';
        styleTag.innerText = this.css;

        // append tag to body
        document.head.appendChild(styleTag);
    }

    /**
     * For server side rendering, this method will return the css string to be
     * added to the head of the document. All you have to do is spread the return
     * value of this method into a new style tag
     *
     * @return style properties
     */
    getCSS(): { id: string; children: string } {
        return {
            id: 'apollo-css',
            children: this.css,
        };
    }
}
