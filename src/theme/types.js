// @flow
import type { Palette } from './palette'
import type { Spacing } from './spacing'
import type { Typography } from './typography'

import type { GetButtonStyles } from '../components/Button/types'

export type StyleParams = {
  palette: Palette,
  spacing: Spacing,
  typography: Typography,
}

export type Theme = {|
  palette: Palette,
  spacing: Spacing,
  typography: Typography,
  getButtonStyles: GetButtonStyles,
|}
