// @flow
import type { ViewStyleProp, TextStyleProp } from '../../types/rn-styles'

type StyleProps = {
  icon?: string,
  neutral?: boolean,
  raised?: boolean,
  outlined?: boolean,
  dense?: boolean,
  trimmed?: boolean,
  disabled?: boolean,
  textColor?: string,
  text?: ?string,
  iconPosition: 'left' | 'right',
  style: ViewStyleProp,
}

export type ButtonStyles = {
  container: ViewStyleProp,
  iconContainer: ViewStyleProp,
  text: TextStyleProp,
}

export type GetButtonStyles = StyleProps => ButtonStyles
