import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated } from 'react-native';

// import styles from './styles';

export default class Helper extends PureComponent {
  static defaultProps = {
      numberOfLines: 1,
      style: null,
  };

  static propTypes = {
      style: Animated.Text.propTypes.style,
      children: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.node),
          PropTypes.node,
      ]).isRequired,
      numberOfLines: PropTypes.number,
  };

  render() {
      const { children, style, ...props } = this.props;

      return (
          <View style={styles.container}>
              <Animated.Text style={[styles.text, style]} {...props}>
                  {children}
              </Animated.Text>
          </View>
      );
  }
}
