import React from 'react';
export declare type ThemeName = 'light' | 'dark';
export declare const ThemeContext: React.Context<ThemeName>;
export declare type Theme = {
    colors: {
        background: string;
        link: string;
        card: string;
        text: string;
        statusGood: string;
        statusWarning: string;
        statusBad: string;
        muted: string;
    };
};
export declare const useTheme: () => Theme;
export declare const useThemedStyles: <T>(styles: (theme: Theme) => T) => T;
