import merge from 'lodash/merge';
import lightTheme from './themes/light';

export default function getTheme(theme, ...more) {
    theme = merge(lightTheme, theme, ...more);

    const { palette } = theme;
    // const baseTheme = { spacing, fontFamily, palette };

    theme = merge({
        avatar: {
            color: palette.canvasColor,
            backgroundColor: palette.canvasColor,
            // https://material.google.com/layout/metrics-keylines.html#metrics-keylines-touch-target-size
            size: 40,
        },
    });

    // theme.prepareStyles = compose(...theme);

    return theme;
}
