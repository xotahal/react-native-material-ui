import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

// import styles from './styles';

export default class Line extends PureComponent {
  static propTypes = {
      type: PropTypes.oneOf(['solid', 'dotted', 'dashed', 'none']).isRequired,
      color: PropTypes.string.isRequired,
  };

  render() {
      const { color: borderColor, type: borderStyle } = this.props;

      if (borderStyle === 'none') {
          return null;
      }

      const lineStyle = {
          borderColor,
          borderStyle,
      };

      return (
          <View style={[styles.line, lineStyle]} pointerEvents="none" />
      );
  }
}
