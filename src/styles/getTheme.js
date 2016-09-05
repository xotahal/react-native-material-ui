import { StyleSheet } from 'react-native';

import {
  black,
} from './colors';

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
        button: StyleSheet.create({
            container: {
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 16,
                borderRadius: 2,
                flexDirection: 'row',
            },
            text: {
                color: black,
                ...typography.buttons,
            },
        }),
        buttonFlat: StyleSheet.create({}),
        buttonRaised: StyleSheet.create({
            container: {
                backgroundColor: '#fff',
                borderColor: 'rgba(0,0,0,.12)',
            },
        }),
        buttonDisabled: StyleSheet.create({
            text: {
                color: palette.disabledTextColor,
            },
        }),
        divider: {
            backgroundColor: palette.borderColor,
            height: StyleSheet.hairlineWidth,
        },
        listItem: {
            container: {
                backgroundColor: '#ffffff',
                height: 56,
            },
            contentViewContainer: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
            },
            leftElementContainer: {
                width: 40,
                marginLeft: 16,
            },
            centerElementContainer: {
                paddingLeft: 16,
                flex: 1,
            },
            textViewContainer: { },
            primaryText: {
                lineHeight: 24,
                color: palette.primaryTextColor,
                ...typography.subheading,
            },
            firstLine: {
                flexDirection: 'row',
            },
            primaryTextContainer: {
                flex: 1,
            },
            secondaryText: {
                lineHeight: 22,
                color: palette.secondaryText,
                ...typography.body1,
            },
            rightElementContainer: {
            },
            leftElement: {
                margin: 16,
                color: palette.secondaryTextColor,
            },
            rightElement: {
                margin: 16,
                color: palette.secondaryTextColor,
            },
        },
        // https://material.google.com/components/subheaders.html#
        subheader: StyleSheet.create({
            container: {
                height: 48,
                justifyContent: 'center',
            },
            text: {
                color: palette.secondaryTextColor,
                // https://material.google.com/components/subheaders.html#subheaders-grid-subheaders
                ...typography.body2,
            },
        }),
        toolbar: StyleSheet.create({
            container: {
                backgroundColor: palette.primaryColor,
                height: 56,
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 4,
            },
            leftElementContainer: { },
            leftElement: {
                margin: 16,
                color: palette.alternateTextColor,
            },
            centerElementContainer: {
                flex: 1,
                marginLeft: 16,
            },
            titleText: {
                color: palette.alternateTextColor,
                ...typography.appBar,
            },
            rightElementContainer: {
                flexDirection: 'row',
            },
            rightElement: {
                margin: 16,
                color: palette.alternateTextColor,
            },
        }),
        toolbarSearchActive: StyleSheet.create({
            container: {
                backgroundColor: palette.canvasColor,
            },
            leftElement: {
                color: palette.secondaryTextColor,
            },
            centerElementContainer: { },
            titleText: {
                flex: 1,
                marginLeft: 16,
                color: palette.primaryTextColor,
            },
            rightElement: {
                color: palette.secondaryTextColor,
            },
        }),
    }, theme);

    // theme.prepareStyles = compose(...theme);

    return theme;
}
