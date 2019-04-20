// @flow
import palette from './palette'
import spacing from './spacing'
import typography from './typography'

import type { ButtonStyles } from '../components/Button/styles'

export type Palette = typeof palette
export type Spacing = typeof spacing
export type Typography = typeof typography

export type StyleParams = {
  palette: Palette,
  spacing: Spacing,
  typography: Typography,
}

export type Theme = {|
  palette: typeof palette,
  spacing: typeof spacing,
  typography: typeof typography,
  getButtonStyles: ButtonStyles,
|}
