/* eslint-disable import/no-unresolved, import/extensions */
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Platform,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import Color from 'color';

import withTheme from '../styles/withTheme';
import { ViewPropTypes } from '../utils';
import { ELEVATION_ZINDEX } from '../styles/constants';
import Icon from '../Icon';

const propTypes = {
  testID: PropTypes.string,
  color: PropTypes.string,
  /**
   * The color of the underlay that will show when the touch is active.
   */
  underlayColor: PropTypes.string,
  /**
   * Max opacity of ripple effect
   */
  maxOpacity: PropTypes.number,
  /**
   * Size of underlayColor
   */
  percent: PropTypes.number,
  /**
   * If true, the interaction will be forbidden
   */
  disabled: PropTypes.bool,
  /**
   * Size of icon (default is 24 - see spacing in palette)
   */
  size: PropTypes.number,
  /**
   * Name of icon to show
   */
  name: PropTypes.string,
  /**
   * Name of Icon set that should be use. From react-native-vector-icons
   */
  iconSet: PropTypes.string,
  /**
   * It'll be used instead of icon (see props name) if exists
   */
  children: PropTypes.element,
  /**
   * Call when icon was pressed
   */
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.shape({
      container: ViewPropTypes.style,
      icon: Text.propTypes.style, // eslint-disable-line
    }),
    PropTypes.array,
  ]),
};
const defaultProps = {
  testID: null,
  children: null,
  onPress: null,
  color: null,
  underlayColor: null,
  size: 24,
  name: null,
  disabled: false,
  percent: 90,
  maxOpacity: 0.16,
  style: {},
  iconSet: null,
};

function getStyles(props, state) {
  const { iconToggle, palette } = props.theme;

  const local = {};

  if (props.color) {
    local.icon = {
      color: props.color,
    };
  }

  if (state.containerSize) {
    local.container = {
      width: state.containerSize,
      height: state.containerSize,
    };
  }

  return {
    container: [iconToggle.container, local.container, props.style.container],
    icon: [
      iconToggle.icon,
      local.icon,
      props.style.icon,
      // diabled has the highest priority - because user can use color props and disabled
      // together
      props.disabled && { color: palette.disabledColor },
    ],
  };
}
/**
 * Returns size of icon. Priority order: style prop, size prop, spacing.iconSize.
 */
function getIconSize(props) {
  const { spacing } = props.theme;
  const { icon } = props.style;

  if (icon && icon.width) {
    return icon.width;
  }
  if (props.size) {
    return props.size;
  }

  return spacing.iconSize;
}
function getContainerSize(iconSize) {
  return iconSize * 2;
}
function getRippleSize(containerSize, percent) {
  return (percent / 100) * containerSize;
}

class IconToggle extends PureComponent {
  constructor(props, context) {
    super(props, context);

    const iconSize = getIconSize(props);
    const containerSize = getContainerSize(iconSize);

    this.state = {
      scaleValue: new Animated.Value(0.01),
      opacityValue: new Animated.Value(props.maxOpacity),
      containerSize,
      iconSize,
      rippleSize: getRippleSize(containerSize, props.percent),
    };

    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { iconSize } = this.state;
    const { percent } = this.props;

    const nextIconSize = getIconSize(nextProps);

    if (iconSize !== nextIconSize || nextProps.percent !== percent) {
      const containerSize = getContainerSize(iconSize);

      this.setState({
        containerSize,
        iconSize,
        rippleSize: getRippleSize(containerSize, nextProps.percent),
      });
    }
  }

  onPressIn() {
    const { disabled } = this.props;
    const { scaleValue } = this.state;

    if (!disabled) {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 225,
        easing: Easing.bezier(0.0, 0.0, 0.2, 1),
        useNativeDriver: true,
      }).start();
    }
  }

  onPressOut() {
    const { disabled, onPress, maxOpacity } = this.props;
    const { scaleValue, opacityValue } = this.state;

    if (!disabled) {
      Animated.timing(opacityValue, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        scaleValue.setValue(0.01);
        opacityValue.setValue(maxOpacity);
      });

      if (onPress) {
        onPress();
      }
    }
  }

  renderRippleView = styles => {
    const { scaleValue, opacityValue, containerSize, rippleSize } = this.state;

    const color = Color(StyleSheet.flatten(styles.icon).color);
    // https://material.google.com/components/buttons.html#buttons-toggle-buttons
    this.maxOpacity = color.isDark() ? 0.12 : 0.3;

    const top = (containerSize - rippleSize) / 2;

    return (
      // we need set zindex for iOS, because the components with elevation have the
      // zindex set as well, thus, there could be displayed backgroundColor of
      // component with bigger zindex - and that's not good
      <Animated.View
        style={[
          {
            position: 'absolute',
            top,
            left: top,
            width: rippleSize,
            height: rippleSize,
            borderRadius: rippleSize / 2,
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
            backgroundColor: color.toString(),
            zIndex: Platform.OS === 'ios' ? ELEVATION_ZINDEX : null,
          },
        ]}
      />
    );
  };

  renderIcon = styles => {
    const { name, children, iconSet } = this.props;
    const { iconSize } = this.state;

    if (children) {
      return children;
    }

    const { color } = StyleSheet.flatten(styles.icon);

    return <Icon iconSet={iconSet} name={name} color={color} size={iconSize} />;
  };

  render() {
    const { testID } = this.props;

    const styles = getStyles(this.props, this.state);

    return (
      <TouchableWithoutFeedback
        testID={testID}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        <View>
          {this.renderRippleView(styles)}
          <View style={styles.container}>{this.renderIcon(styles)}</View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

IconToggle.propTypes = propTypes;
IconToggle.defaultProps = defaultProps;

export default withTheme(IconToggle);
