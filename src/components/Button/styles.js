// @flow
import { StyleSheet } from 'react-native'

import { getPlatformElevation } from '../../utils'
import type { StyleParams } from '../../theme/types'
import type { StyleProps, ButtonStyles } from './types'

const getStyles = ({ palette, spacing, typography }: StyleParams) => {
  const styles = {
    shared: StyleSheet.create({
      container: {
        height: spacing.sizeRegular,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: spacing.radiusSmall,
        paddingHorizontal: spacing.spaceLarge,
      },
      iconLeft: {
        marginRight: spacing.base,
      },
      iconRight: {
        marginLeft: spacing.base,
      },
      text: {
        ...typography.button,
        color: palette.primary,
      },
    }),
    raised: StyleSheet.create({
      container: {
        backgroundColor: palette.primary,
      },
      text: {
        ...typography.buttonUpperCase,
        color: 'white',
      },
    }),
    outlined: StyleSheet.create({
      container: {
        borderWidth: spacing.border,
        borderColor: palette.primary,
      },
      text: typography.buttonUpperCase,
    }),
    dense: StyleSheet.create({
      container: {
        height: spacing.sizeSmall,
        paddingHorizontal: spacing.spaceRegular,
      },
    }),
    trimmed: StyleSheet.create({
      container: {
        height: spacing.sizeSmall,
        paddingHorizontal: 0,
      },
    }),
    disabled: StyleSheet.create({
      container: {
        backgroundColor: palette.disabled,
        borderColor: palette.disabled,
        ...getPlatformElevation(0),
      },
      text: {
        color: palette.disabledText,
      },
    }),
  }

  return (props: StyleProps): ButtonStyles => {
    const {
      raised,
      outlined,
      dense,
      trimmed,
      disabled,
      style,
      iconPosition,
      text,
      neutral,
    } = props
    const { shared } = styles

    return {
      container: [
        shared.container,
        raised && styles.raised.container,
        outlined && styles.outlined.container,
        dense && styles.dense.container,
        trimmed && styles.trimmed.container,
        neutral && outlined ? { borderColor: palette.primaryText } : null,
        disabled && raised ? { backgroundColor: palette.disabled } : null,
        disabled && outlined ? { borderColor: palette.disabled } : null,
        style,
      ],
      iconContainer:
        text && (iconPosition === 'left' ? shared.iconLeft : shared.iconRight),
      text: [
        shared.text,
        raised && styles.raised.text,
        outlined && styles.outlined.text,
        neutral && outlined ? { color: palette.primaryText } : null,
        disabled ? { color: palette.disabled } : null,
        disabled && raised ? { color: palette.disabledText } : null,
      ],
    }
  }
}

export default getStyles
