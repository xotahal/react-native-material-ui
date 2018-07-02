/* eslint-disable import/no-unresolved, import/extensions */
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import withTheme from '../styles/withTheme';

const propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  size: PropTypes.number,
  color: PropTypes.string,
  /**
   * Name of Icon set that should be use. From react-native-vector-icons
   */
  iconSet: PropTypes.string,
  /**
   * Theme
   */
  theme: PropTypes.any, // eslint-disable-line
};
const defaultProps = {
  size: null,
  color: null,
  style: null,
  iconSet: null,
};

const getIconComponent = iconSet => {
  switch (iconSet) {
    case 'Entypo':
      return Entypo;
    case 'EvilIcons':
      return EvilIcons;
    case 'Feather':
      return Feather;
    case 'FontAwesome':
      return FontAwesome;
    case 'Foundation':
      return Foundation;
    case 'Ionicons':
      return Ionicons;
    case 'MaterialIcons':
      return MaterialIcons;
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons;
    case 'Octicons':
      return Octicons;
    case 'Zocial':
      return Zocial;
    case 'SimpleLineIcons':
      return SimpleLineIcons;
    default:
      return MaterialIcons;
  }
};

class Icon extends PureComponent {
  render() {
    const { name, style, size, color, theme, iconSet } = this.props;
    const { palette, spacing } = theme;

    const iconColor = color || palette.secondaryTextColor;
    const iconSize = size || spacing.iconSize;
    const VectorIcon = getIconComponent(iconSet || theme.iconSet);

    return (
      <VectorIcon name={name} size={iconSize} color={iconColor} style={style} />
    );
  }
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default withTheme(Icon);
