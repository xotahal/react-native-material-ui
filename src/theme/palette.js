// @flow
import Color from 'color'
import { blue500, red500, white, black } from './colors'

const palette = {
  primary: blue500,
  accent: red500,

  primaryText: Color(black)
    .alpha(0.87)
    .toString(),
  secondaryText: Color(black)
    .alpha(0.54)
    .toString(),
  alternateText: white,

  canvas: white,

  border: Color(black)
    .alpha(0.12)
    .toString(),
  // https://material.google.com/style/color.html#color-text-background-colors
  disabled: Color(black)
    .alpha(0.12)
    .toString(),
  disabledText: Color(black)
    .alpha(0.38)
    .toString(),
  activeIcon: Color(black)
    .alpha(0.54)
    .toString(),
  inactiveIcon: Color(black)
    .alpha(0.38)
    .toString(),
}

export default palette
