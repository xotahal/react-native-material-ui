export const fontWeight = {
    light: '300',
    normal: '400',
    medium: '500',
};

// https://material.google.com/style/typography.html

// Line heights
// https://material.google.com/style/typography.html#typography-line-height

export default {
    fontWeight,
    appBar: {
        fontWeight: fontWeight.medium,
        fontSize: 20,
    },
    buttons: {
        fontWeight: fontWeight.medium,
        fontSize: 14,
    },
    subheading: {
        fontWeight: fontWeight.normal,
        fontSize: 16,
        lineHeight: 24,
    },
    body2: {
        fontWeight: fontWeight.medium,
        fontSize: 14,
        lineHeight: 24,
    },
    body1: {
        fontWeight: fontWeight.normal,
        fontSize: 14,
        lineHeight: 20,
    },
};
