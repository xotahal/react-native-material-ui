// @flow
import type { ViewStyleProp, TextStyleProp } from '../../types/rn-styles'

export type StyleProps = {|
  icon?: string,
  raised?: boolean,
  outlined?: boolean,
  disabled?: boolean,
  primary?: boolean,
  accent?: boolean,
  isPressed?: boolean,
  style?: ViewStyleProp,
  textStyle?: TextStyleProp,
|}

export type ButtonStyles = {
  container: ViewStyleProp,
  iconContainer: ViewStyleProp,
  text: TextStyleProp,
}

export type GetButtonStyles = StyleProps => ButtonStyles
