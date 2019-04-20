// @flow
import { StyleSheet } from 'react-native'

import { getPlatformElevation } from '../../utils'
import type { StyleParams } from '../../theme/types'
import type { StyleProps, ButtonStyles } from './types'

const getStyles = ({ palette, spacing, typography }: StyleParams) => {
  const styles = {
    shared: StyleSheet.create({
      container: {
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.spaceRegular,
        borderRadius: spacing.buttonRadius,
        flexDirection: 'row',
      },
      iconLeft: {
        marginRight: spacing.base,
      },
      iconRight: {
        marginLeft: spacing.base,
      },
      text: {
        ...typography.button,
        color: palette.primaryText,
      },
    }),
    pressedIn: StyleSheet.create({
      container: {
        ...getPlatformElevation(4),
      },
    }),
    raised: StyleSheet.create({
      container: {
        backgroundColor: '#FFFFFF',
        ...getPlatformElevation(2),
      },
      text: {
        color: palette.primaryText,
      },
    }),
    outlined: StyleSheet.create({
      container: {
        borderWidth: spacing.border,
        borderColor: palette.primaryText,
      },
    }),
    disabled: StyleSheet.create({
      container: {
        ...getPlatformElevation(0),
      },
    }),
  }

  return (props: StyleProps): ButtonStyles => {
    const {
      raised,
      primary,
      accent,
      outlined,
      disabled,
      style,
      textStyle,
      isPressed,
    } = props

    const { shared } = styles

    return {
      container: [
        shared.container,
        raised && styles.raised.container,
        outlined && styles.outlined.container,
        primary && raised && { backgroundColor: palette.primary },
        primary && outlined && { borderColor: palette.primary },
        accent && raised && { backgroundColor: palette.accent },
        accent && outlined && { borderColor: palette.accent },
        disabled && styles.disabled.container,
        disabled && raised ? { backgroundColor: palette.disabled } : null,
        disabled && outlined ? { borderColor: palette.disabledText } : null,
        isPressed && styles.pressedIn.container,
        style,
      ],
      iconContainer: shared.iconLeft,
      text: [
        shared.text,
        raised && styles.raised.text,
        raised && (primary || accent) && { color: '#FFFFFF' },
        primary && !raised && { color: palette.primary },
        accent && outlined && { color: palette.accent },
        accent && !raised && { color: palette.accent },
        disabled ? { color: palette.disabledText } : null,
        disabled && raised ? { color: palette.disabledText } : null,
        textStyle,
      ],
    }
  }
}

export default getStyles
