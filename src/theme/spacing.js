// @flow
import { StyleSheet } from 'react-native'

const base = 8

const defaultSpacing = {
  base,
  // The extra large height - List Items with two line text
  sizeXLarge: base * 8,
  // The large height - Toolbars, bottom bars, etc
  sizeLarge: base * 7,
  // The medium height - buttons
  sizeRegular: base * 5,
  // The icons
  sizeSmall: base * 3,
  // paddings
  spaceLarge: base * 4,
  spaceRegular: base * 2,
  spaceSmall: base,
  spaceXSmall: base / 2,

  buttonRadius: base / 4,

  radiusSmall: base / 4,
  radiusRegular: base / 2,
  border: StyleSheet.hairlineWidth,
}

export type Spacing = typeof defaultSpacing

export default (spacing?: Spacing): Spacing => {
  return {
    ...defaultSpacing,
    ...spacing,
  }
}
