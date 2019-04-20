// @flow
import getButtonStyles from '../components/Button/styles'

import palette from './palette'
import spacing from './spacing'
import typography from './typography'

import type { Theme, StyleParams } from './types'

const params: StyleParams = {
  palette,
  typography,
  spacing
}

const getTheme = (): Theme => {
  return {
    palette,
    typography,
    spacing,
    getButtonStyles: getButtonStyles(params),
  }
}

export default getTheme
