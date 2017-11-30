import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

// import styles from './styles';

export default class Counter extends PureComponent {
  static propTypes = {
      count: PropTypes.number.isRequired,
      limit: PropTypes.number,

      fontSize: PropTypes.number.isRequired,

      baseColor: PropTypes.string.isRequired,
      errorColor: PropTypes.string.isRequired,

      style: Text.propTypes.style,
  };

  static defaultProps = {
      limit: null,
      style: null,
  };

  render() {
      const {
          count,
          limit,
          baseColor,
          errorColor,
          fontSize,
          style,
      } = this.props;

      const textStyle = {
          color: count > limit ? errorColor : baseColor,
          fontSize,
      };

      if (!limit) {
          return null;
      }

      return (
          <View style={styles.container}>
              <Text style={[styles.text, style, textStyle]}>
                  {count} / {limit}
              </Text>
          </View>
      );
  }
}
