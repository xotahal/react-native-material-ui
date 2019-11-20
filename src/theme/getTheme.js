// @flow
import getButtonStyles from '../components/Button/styles'

import getPalette from './palette'
import getSpacing from './spacing'
import getTypography from './typography'

import type { Theme, StyleParams } from './types'

const getTheme = (theme?: Theme): Theme => {
  const palette = getPalette(theme && theme.palette)
  const spacing = getSpacing(theme && theme.spacing)
  const typography = getTypography(theme && theme.typography)

  const params: StyleParams = {
    palette,
    typography,
    spacing,
  }
  return {
    palette,
    typography,
    spacing,
    getButtonStyles: getButtonStyles(params),
  }
}

export default getTheme
