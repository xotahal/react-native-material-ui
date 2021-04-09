import {
  View,
  BackHandler,
  BackAndroid as DeprecatedBackAndroid,
} from 'react-native';
import PropTypes from 'prop-types';

const ViewPropTypes = { style: PropTypes.any };
const BackAndroid = BackHandler || DeprecatedBackAndroid;

export { ViewPropTypes, BackAndroid };
