import {
  cyan500,
  pinkA200,
  grey300,
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
        primaryColor: cyan500,
        accentColor: pinkA200,
        // text color palette
        primaryTextColor: Color(black).alpha(.87).rgbaString(),
        secondaryTextColor: Color(black).alpha(.54).rgbaString(),
        alternateTextColor: white,
        // backgournds and borders
        canvasColor: white,
        borderColor: grey300,
        // disabledColor: minBlack,
        // pickerHeaderColor: cyan500,
        // clockCircleColor: faintBlack,
        // shadowColor: fullBlack,
    },
};
