/* eslint-disable import/no-unresolved, import/extensions */
import VectorIcon from 'react-native-vector-icons/MaterialIcons';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */

const propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  size: PropTypes.number,
  color: PropTypes.string,
};
const defaultProps = {
  size: null,
  color: null,
  style: null,
};
const contextTypes = {
  uiTheme: PropTypes.object.isRequired, // eslint-disable-line
};

class Icon extends PureComponent {
  render() {
    const { name, style, size, color } = this.props;
    const { uiTheme } = this.context;
    const { palette, spacing } = uiTheme;

    const iconColor = color || palette.secondaryTextColor;
    const iconSize = size || spacing.iconSize;

    return (
      <VectorIcon name={name} size={iconSize} color={iconColor} style={style} />
    );
  }
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
Icon.contextTypes = contextTypes;

export default Icon;
