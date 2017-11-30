import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

export default class Label extends PureComponent {
  static defaultProps = {
      numberOfLines: 1,

      active: false,
      focused: false,
      errored: false,
      restricted: false,
      style: null,
  };

  static propTypes = {
      numberOfLines: PropTypes.number,

      active: PropTypes.bool,
      focused: PropTypes.bool,
      errored: PropTypes.bool,
      restricted: PropTypes.bool,

      baseSize: PropTypes.number.isRequired,
      fontSize: PropTypes.number.isRequired,
      activeFontSize: PropTypes.number.isRequired,
      basePadding: PropTypes.number.isRequired,

      tintColor: PropTypes.string.isRequired,
      baseColor: PropTypes.string.isRequired,
      errorColor: PropTypes.string.isRequired,

      animationDuration: PropTypes.number.isRequired,

      style: Animated.Text.propTypes.style,

      children: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.node),
          PropTypes.node,
      ]).isRequired,
  };

  constructor(props) {
      super(props);

      const { active, focused, errored } = this.props;

      this.state = {
          input: new Animated.Value((active || focused) ? 1 : 0),
          focus: new Animated.Value(errored ? -1 : (focused ? 1 : 0)),
      };
  }

  componentWillReceiveProps(props) {
      const { focus, input } = this.state;
      const {
          active,
          focused,
          errored,
          animationDuration,
      } = this.props;

      if ((focused !== props.focused) || (active !== props.active)) {
          Animated
              .timing(input, {
                  toValue: (props.active || props.focused) ? 1 : 0,
                  duration: animationDuration,
              })
              .start();
      }

      if ((focused !== props.focused) || (errored !== props.errored)) {
          Animated
              .timing(focus, {
                  toValue: props.errored ? -1 : (props.focused ? 1 : 0),
                  duration: animationDuration,
              })
              .start();
      }
  }

  render() {
      const { focus, input } = this.state;
      const {
          children,
          restricted,
          fontSize,
          activeFontSize,
          errorColor,
          baseColor,
          tintColor,
          baseSize,
          basePadding,
          style,
          errored,
          active,
          focused,
          animationDuration,
          ...props
      } = this.props;

      const color = restricted ?
          errorColor :
          focus.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [errorColor, baseColor, tintColor],
          });

      const top = input.interpolate({
          inputRange: [0, 1],
          outputRange: [
              baseSize + (fontSize * 0.25),
              baseSize - basePadding - activeFontSize,
          ],
      });

      const textStyle = {
          fontSize: input.interpolate({
              inputRange: [0, 1],
              outputRange: [fontSize, activeFontSize],
          }),

          color,
      };

      const containerStyle = {
          position: 'absolute',
          top,
      };

      return (
          <Animated.View style={containerStyle}>
              <Animated.Text style={[style, textStyle]} {...props}>
                  {children}
              </Animated.Text>
          </Animated.View>
      );
  }
}
