/* eslint-disable import/no-unresolved, import/extensions */
import { StyleSheet } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */

import Color from 'color';
import merge from 'lodash.merge';

import { fontWeight } from './typography';
import {
    black, grey100, grey500, white, transparent, snackbarColor,
} from './colors';

import lightTheme from './themes/light';
/* eslint-disable import/no-unresolved, import/extensions */
import getPlatformElevation from './getPlatformElevation';
/* eslint-enable import/no-unresolved, import/extensions */

function darkenOrLighten(color, ratio = 0.15) {
    const c = Color(color);
    return c.luminosity() > 0.5 ? c.darken(ratio) : c.lighten(ratio);
}

export default function getTheme(theme, ...more) {
    theme = merge(lightTheme, theme, ...more);

    const {
        spacing, fontFamily, typography, palette,
    } = theme;
    const baseTheme = {
        spacing, fontFamily, typography, palette,
    };

    theme = merge({
        actionButton: StyleSheet.create(merge({
            positionContainer: {
                position: 'absolute',
                bottom: 20,
                right: 20,
            },
            container: {
                height: spacing.actionButtonSize,
                width: spacing.actionButtonSize,
                borderRadius: spacing.actionButtonSize / 2,
                backgroundColor: palette.accentColor,
            },
            overlayContainer: {
                ...StyleSheet.absoluteFillObject,
                backgroundColor: Color('#fff').alpha(0.8).toString(),
                // we need overlay to be above the toolbar - so maybe we could use some variable
                // to get elevation for toolbar and this overlay
                ...getPlatformElevation(4),
            },
            toolbarPositionContainer: {
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
            },
            toolbarContainer: {
                flex: 1,
                height: spacing.actionButtonSize,
                backgroundColor: palette.accentColor,
                flexDirection: 'row',
            },
            toolbarActionContainer: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            },
            speedDialContainer: {
                alignItems: 'flex-end',
            },
            speedDialActionContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 8,
            },
            speedDialActionIconContainer: {
                width: spacing.actionButtonSize,
                height: spacing.actionButtonSize,
                alignItems: 'center',
                justifyContent: 'center',
            },
            speedDialActionIcon: {
                ...getPlatformElevation(2),
                height: spacing.actionButtonSize - 16,
                width: spacing.actionButtonSize - 16,
                borderRadius: (spacing.actionButtonSize - 16) / 2,
                backgroundColor: grey500,
            },
            speedDialActionLabel: {
                color: palette.secondaryTextColor,
            },
            speedDialActionLabelContainer: {
                ...getPlatformElevation(2),
                borderRadius: 2,
                marginRight: 24,
                paddingVertical: 2,
                paddingHorizontal: 8,
                backgroundColor: grey100,
            },
            icon: {
                color: white,
            },
        }, theme.actionButton)),
        // https://material.google.com/layout/metrics-keylines.html#metrics-keylines-touch-target-size
        avatar: StyleSheet.create(merge({
            container: {
                width: spacing.avatarSize,
                height: spacing.avatarSize,
                borderRadius: spacing.avatarSize / 2,
                backgroundColor: darkenOrLighten(palette.canvasColor, 0.26).toString(),
                alignItems: 'center',
                justifyContent: 'center',
            },
            content: {
                color: palette.canvasColor,
            },
        }, theme.avatar)),
        badge: StyleSheet.create(merge({
            container: {
                position: 'absolute',
                width: 16,
                height: 16,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: palette.primaryColor,
            },
            strokeContainer: {
                position: 'absolute',
                width: 16,
                height: 16,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: palette.canvasColor,
            },
            content: {
                color: palette.canvasColor,
                fontWeight: fontWeight.medium,
                fontSize: 12,
            },
        }, theme.badge)),
        button: StyleSheet.create(merge({
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
            icon: {
                marginRight: 8,
            },
        }, theme.button)),
        buttonFlat: StyleSheet.create(merge({}, theme.buttonFlat)),
        buttonDisabled: StyleSheet.create(merge({
            text: {
                color: palette.disabledTextColor,
            },
        }, theme.buttonDisabled)),
        buttonRaised: StyleSheet.create(merge({
            container: {
                backgroundColor: '#fff',
                borderColor: 'rgba(0,0,0,.12)',
            },
        }, theme.buttonRaised)),
        buttonRaisedDisabled: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.borderColor,
            },
            text: {
                color: palette.disabledTextColor,
            },
        }, theme.buttonRaisedDisabled)),
        bottomNavigation: StyleSheet.create(merge({
            container: {
                flexDirection: 'row',
                height: 56,
                backgroundColor: palette.canvasColor,
                borderTopColor: palette.borderColor,
                borderTopWidth: StyleSheet.hairlineWidth,
                ...getPlatformElevation(8),
                zIndex: 8,
            },
        }, theme.bottomNavigation)),
        bottomNavigationAction: StyleSheet.create(merge({
            container: {
                flex: 1,
                alignItems: 'center',
                maxWidth: 168,
                minWidth: 80,
                paddingBottom: 12,
                paddingTop: 8,
                paddingLeft: 12,
                paddingRight: 12,
            },
            label: {
                fontSize: 12,
                textAlign: 'center',
                color: palette.secondaryTextColor,
            },
            containerActive: {
                paddingTop: 6,
            },
            iconActive: {
                color: palette.primaryColor,
            },
            labelActive: {
                color: palette.primaryColor,
                fontSize: 14,
            },
        }, theme.bottomNavigationAction)),
        card: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.canvasColor,
                borderRadius: 2,
                marginVertical: 4,
                marginHorizontal: 8,
                overflow: 'hidden',
                ...getPlatformElevation(2),
            },
        }, theme.card)),
        dialog: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.canvasColor,
                borderRadius: 2,
                ...getPlatformElevation(24),
                width: 280,
                paddingTop: 24,
            },
            titleContainer: {
                paddingBottom: 20,
                paddingHorizontal: 24,
            },
            titleText: {
                fontFamily,
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
            },
            contentContainer: {
                paddingBottom: 24,
                paddingHorizontal: 24,
            },
            actionsContainer: {
            },
            defaultActionsContainer: {
                marginHorizontal: 8,
                height: 52,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
            },
            stackedActionsContainer: {
                marginBottom: 8,
            },
        }, theme.dialog)),
        checkbox: StyleSheet.create(merge({
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
        }, theme.checkbox)),
        divider: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.borderColor,
                height: StyleSheet.hairlineWidth,
            },
        }, theme.divider)),
        drawer: StyleSheet.create(merge({
            container: {
                flex: 1,
                backgroundColor: white,
            },
        }, theme.drawer)),
        drawerHeader: StyleSheet.create(merge({
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
        }, theme.drawerHeader)),
        drawerHeaderAccount: StyleSheet.create(merge({
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
        }, theme.drawerHeaderAccount)),
        drawerHeaderListItem: StyleSheet.create(merge({
            container: {
                backgroundColor: transparent,
            },
        }, theme.drawerHeaderListItem)),
        drawerSection: StyleSheet.create(merge({
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
        }, theme.drawerSection)),
        drawerSectionActiveItem: StyleSheet.create(merge({
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
        }, theme.drawerSectionActiveItem)),
        iconToggle: StyleSheet.create(merge({
            container: {
                width: spacing.iconSize * 2,
                height: spacing.iconSize * 2,
                alignItems: 'center',
                justifyContent: 'center',
            },
            icon: {
                color: palette.secondaryTextColor,
            },
        }, theme.iconToggle)),
        listItem: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.canvasColor,
                height: 56,
            },
            contentViewContainer: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
            },
            leftElementContainer: {
                width: 56,
                marginLeft: 16,
            },
            centerElementContainer: {
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
                color: palette.secondaryTextColor,
                ...typography.body1,
            },
            tertiaryText: {
                lineHeight: 22,
                color: palette.secondaryTextColor,
                ...typography.body1,
            },
            rightElementContainer: {
                paddingRight: 4,
                flexDirection: 'row',
                backgroundColor: 'transparent',
            },
            leftElement: {
                margin: 16,
                color: palette.secondaryTextColor,
            },
            rightElement: {
                color: palette.secondaryTextColor,
            },
        }, theme.listItem)),
        // https://material.io/guidelines/components/snackbars-toasts.html
        snackbar: StyleSheet.create(merge({
            container: {
                flexDirection: 'row',
                height: spacing.snackbarHeight,
                alignItems: 'center',
                backgroundColor: snackbarColor,
                paddingHorizontal: 24,
                ...getPlatformElevation(4),
                zIndex: 4,
            },
            message: {
                flex: 1,
                marginVertical: 14,
                color: white,
                ...typography.body2,
                lineHeight: 14,
            },
            actionContainer: {
                height: 14,
                paddingHorizontal: 0,
            },
            actionText: {
                color: palette.primaryColor,
            },
        }, theme.snackbar)),
        // https://material.google.com/components/subheaders.html#
        subheader: StyleSheet.create(merge({
            container: {
                height: 48,
                justifyContent: 'center',
            },
            text: {
                color: palette.secondaryTextColor,
                // https://material.google.com/components/subheaders.html#subheaders-grid-subheaders
                ...typography.body2,
            },
        }, theme.subheader)),
        toolbar: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.primaryColor,
                height: 56,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 4,
                overflow: 'hidden',
                ...getPlatformElevation(4),
            },
            leftElementContainer: {
                backgroundColor: 'transparent',
            },
            leftElement: {
                color: palette.alternateTextColor,
            },
            centerElementContainer: {
                flex: 1,
                marginLeft: 20,
            },
            titleText: {
                fontFamily,
                color: palette.alternateTextColor,
                ...typography.appBar,
            },
            rightElementContainer: {
                flexDirection: 'row',
                backgroundColor: 'transparent',
            },
            rightElement: {
                color: palette.alternateTextColor,
            },
        }, theme.toolbar)),
        toolbarSearchActive: StyleSheet.create(merge({
            container: {
                backgroundColor: palette.canvasColor,
            },
            leftElement: {
                color: palette.secondaryTextColor,
            },
            centerElementContainer: { },
            titleText: {
                fontFamily,
                flex: 1,
                marginLeft: 16,
                color: palette.primaryTextColor,
                fontWeight: fontWeight.normal,
            },
            rightElement: {
                color: palette.secondaryTextColor,
            },
        }, theme.toolbarSearchActive)),
    }, baseTheme);

    return theme;
}
