import type { FC } from 'react';
import type { Theme } from '../../interfaces/Theme';

import React, { createContext } from 'react';
import { createTheme } from '../../util/Theming';

interface IThemeProvider {
    children: React.ReactNode;
    theme: Theme;
}

export const defaultTheme: Theme = {
    primary: '#1B75BC',
    secondary: '#0E214B',
    tertiary: '#F5F5F5',
    nuetral: '#EDEFF1',
    text: {
        fontFamily: "'Roboto', sans-serif",
        color: 'black',
    },
};

export const DefaultTheme = createContext(defaultTheme);

/**
 * This component is used to provide a theme to all components in the tree.
 *
 * @return the theme provider
 */
export const ThemeProvider: FC<IThemeProvider> = ({ children, theme }) => {
    return <DefaultTheme.Provider value={createTheme(theme)}>{children}</DefaultTheme.Provider>;
};
