import {
  blue500,
  red500,
  white,
  black,
} from '../colors';

import Color from 'color';
import spacing from '../spacing';

export default {
    spacing,
    fontFamily: 'Roboto',
    palette: {
        // main theme colors
        primaryColor: blue500,
        accentColor: red500,
        // text color palette
        primaryTextColor: Color(black).alpha(.87).rgbaString(),
        secondaryTextColor: Color(black).alpha(.54).rgbaString(),
        alternateTextColor: white,
        // backgournds and borders
        canvasColor: white,
        borderColor: Color(black).alpha(.12).rgbaString(),
        // https://material.google.com/style/color.html#color-text-background-colors
        disabledColor: Color(black).alpha(.38).rgbaString(),
        disabledTextColor: Color(black).alpha(.26).rgbaString(),
        activeIcon: Color(black).alpha(.54).rgbaString(),
        inactiveIcon: Color(black).alpha(.38).rgbaString(),
        // pickerHeaderColor: cyan500,
        // clockCircleColor: faintBlack,
        // shadowColor: fullBlack,

    },
};
