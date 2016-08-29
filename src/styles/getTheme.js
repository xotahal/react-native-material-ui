import { StyleSheet } from 'react-native';

import Color from 'color';
import lightTheme from './themes/light';
import merge from 'lodash/merge';
import typography from './typography';

function darkenOrLighten(color, ratio = 0.15) {
    const c = Color(color);
    return c.luminosity() > 0.5 ? c.darken(ratio) : c.lighten(ratio);
}

export default function getTheme(theme, ...more) {
    theme = merge(lightTheme, theme, ...more);

    const { palette, spacing } = theme;
    // const baseTheme = { spacing, fontFamily, palette };

    theme = merge({
        // https://material.google.com/layout/metrics-keylines.html#metrics-keylines-touch-target-size
        avatar: StyleSheet.create({
            container: {
                width: spacing.avatarSize,
                height: spacing.avatarSize,
                borderRadius: spacing.avatarSize / 2,
                backgroundColor: darkenOrLighten(palette.canvasColor, 0.26).hexString(),
                alignItems: 'center',
                justifyContent: 'center',
            },
            content: {
                color: palette.canvasColor,
            },
        }),
        // https://material.google.com/components/subheaders.html#
        subheader: StyleSheet.create({
            container: {
                height: 48,
                justifyContent: 'center',
            },
            text: {
                color: palette.secondaryTextColor,
                // https://material.google.com/components/subheaders.html#subheaders-grid-subheaders
                fontWeight: typography.fontWeightMedium,
            },
        }),
    }, theme);

    // theme.prepareStyles = compose(...theme);

    return theme;
}
