import {
  View,
  BackHandler,
  ViewPropTypes as RNViewPropTypes,
} from 'react-native';

const ViewPropTypes = RNViewPropTypes || View.propTypes; // eslint-disable-line
const BackAndroid = BackHandler; // BackAndroid is not supported anymore in react-native.

export { ViewPropTypes, BackAndroid };
