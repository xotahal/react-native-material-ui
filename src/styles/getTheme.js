import { StyleSheet } from 'react-native';

import {
  black, grey100, grey500, white,
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
        card: StyleSheet.create({
            container: {
                backgroundColor: palette.canvasColor,
                borderRadius: 2,
                marginVertical: 4,
                marginHorizontal: 8,
                elevation: 2,
            },
        }),
        dialog: StyleSheet.create({
            container: {
                backgroundColor: palette.canvasColor,
                borderRadius: 2,
                elevation: 24,
                width: 280,
                paddingTop: 24,
                paddingHorizontal: 24,
            },
            titleContainer: {
                paddingBottom: 20,
            },
            titleText: {
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
            },
            contentContainer: {
                paddingBottom: 24,
            },
            // TODO: merge actionsContainer with actionsInnerContainer
            actionsContainer: {
                height: 56,
                alignItems: 'flex-end',
                justifyContent: 'center',
            },
            actionsInnerContainer: {
                margin: 8,
            },
            defaultActionsContainer: {
                flexDirection: 'row',
            },
        }),
        checkbox: StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
            },
            icon: {
                color: palette.primaryColor,
            },
            label: {
                color: black,
                marginLeft: 20,
                flex: 1,
            },
        }),
        // TODO: add StyleSheet
        divider: {
            backgroundColor: palette.borderColor,
            height: StyleSheet.hairlineWidth,
        },
        drawer: StyleSheet.create({
            container: {
                flex: 1,
            },
        }),
        drawerHeader: StyleSheet.create({
            container: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
            },
            contentContainer: {
                backgroundColor: grey500,
                height: 150,
            },
        }),
        drawerHeaderAccount: StyleSheet.create({
            container: {
                flex: 1,
                paddingBottom: 8,
            },
            accountContainer: {
                flex: 1,
                paddingHorizontal: 16,
                marginBottom: 8,
            },
            topContainer: {
                flex: 1,
                justifyContent: 'center',
            },
            avatarsContainer: {
                flexDirection: 'row',
            },
            activeAvatarContainer: {
                flex: 1,
            },
            inactiveAvatarContainer: {
                paddingLeft: 8,
            },
        }),
        drawerHeaderListItem: StyleSheet.create({
            container: {
                backgroundColor: grey500,
            },
            primaryText: {
                color: white,
            },
            secondaryText: {
                color: white,
            },
            rightElement: {
                color: white,
            },
        }),
        drawerSection: StyleSheet.create({
            container: {
                paddingVertical: 8,
            },
            item: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                height: 48,
                paddingLeft: 16,
            },
            subheader: {
                flex: 1,
            },
            icon: {
                position: 'absolute',
                top: 13,
            },
            value: {
                flex: 1,
                paddingLeft: 56,
                top: 2,
            },
            label: {
                paddingRight: 16,
                top: 2,
            },
        }),
        drawerSectionActiveItem: StyleSheet.create({
            container: {
                backgroundColor: grey100,
            },
            leftElement: {
                color: palette.primaryColor,
            },
            primaryText: {
                ...typography.buttons,
                color: palette.primaryColor,
            },
        }),
        iconToggle: StyleSheet.create({
            container: {
                width: spacing.iconSize * 2,
                height: spacing.iconSize * 2,
                alignItems: 'center',
                justifyContent: 'center',
            },
            icon: {
                color: palette.secondaryTextColor,
            },
        }),
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
                paddingRight: 4,
            },
            leftElement: {
                margin: 16,
                color: palette.secondaryTextColor,
            },
            rightElement: {
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
                paddingHorizontal: 4,
            },
            leftElementContainer: { },
            leftElement: {
                color: palette.alternateTextColor,
            },
            centerElementContainer: {
                flex: 1,
                marginLeft: 20,
            },
            titleText: {
                color: palette.alternateTextColor,
                ...typography.appBar,
            },
            rightElementContainer: {
                flexDirection: 'row',
            },
            rightElement: {
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
