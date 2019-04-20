// @flow
import palette from './palette'
import spacing from './spacing'
import typography from './typography'

import type { GetButtonStyles } from '../components/Button/types'

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
  getButtonStyles: GetButtonStyles,
|}
