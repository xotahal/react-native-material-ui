// @flow
const defaultFontFamily = null

const defaultTypography = {
  fontFamily: defaultFontFamily,
  body: {
    fontSize: 18,
  },
  button: {
    fontWeight: '500',
    fontSize: 14,
  },
}

export type Typography = typeof defaultTypography

export default (typography?: Typography = {}): Typography => {
  const fontFamily = (typography && typography.fontFamily) || defaultFontFamily

  return {
    fontFamily,
    body: {
      fontFamily,
      ...defaultTypography.button,
      ...typography.button,
    },
    button: {
      fontFamily,
      ...defaultTypography.button,
      ...typography.button,
    },
  }
}
