/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, StyleSheet, Text } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import { ViewPropTypes } from '../utils';

import IconToggle from '../IconToggle';

const propTypes = {
  leftElementTestID: PropTypes.string,
  isSearchActive: PropTypes.bool.isRequired,
  style: PropTypes.shape({
    leftElementContainer: ViewPropTypes.style,
    leftElement: Text.propTypes.style, // eslint-disable-line
  }),
  size: PropTypes.number,
  leftElement: PropTypes.node,
  onLeftElementPress: PropTypes.func,
  onSearchClose: PropTypes.func,
};
const defaultProps = {
  leftElementTestID: null,
  leftElement: null,
  onLeftElementPress: null,
  onSearchClose: null,
  style: {},
  size: 24,
};
const contextTypes = {
  uiTheme: PropTypes.object.isRequired, // eslint-disable-line
};

const SEARCH_FORWARD_ICON = 'arrow-forward';

function shouldUpdateStyles(props, nextProps) {
  if (props.style !== nextProps.styles) {
    return true;
  }
  if (props.isSearchActive !== nextProps.isSearchActive) {
    return true;
  }

  return false;
}
function getStyles(props, context) {
  const { isSearchActive } = props;
  const { toolbar, toolbarSearchActive } = context.uiTheme;

  return {
    leftElementContainer: [
      toolbar.leftElementContainer,
      isSearchActive && toolbarSearchActive.leftElementContainer,
      props.style.leftElementContainer,
    ],
    leftElement: [
      toolbar.leftElement,
      isSearchActive && toolbarSearchActive.leftElement,
      props.style.leftElement,
    ],
  };
}

class LeftElement extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      styles: getStyles(this.props, this.context),
      leftElement: props.isSearchActive
        ? SEARCH_FORWARD_ICON
        : props.leftElement,
      spinValue: new Animated.Value(props.isSearchActive ? 1 : 0),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isSearchActive, leftElement } = this.props;

    if (nextProps.isSearchActive !== isSearchActive) {
      this.animateIcon(nextProps.isSearchActive);
    }

    if (leftElement !== nextProps.leftElement) {
      this.setState({ leftElement: nextProps.leftElement });
    }

    if (shouldUpdateStyles(this.props, nextProps)) {
      this.setState({ styles: getStyles(nextProps, this.context) });
    }
  }

  animateIcon = activate => {
    const { spinValue } = this.state;
    const { leftElement } = this.props;

    const toValue = activate ? 1 : 0;

    Animated.timing(spinValue, {
      toValue: 0.5,
      duration: 112,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        leftElement: activate ? SEARCH_FORWARD_ICON : leftElement,
      });

      Animated.timing(spinValue, {
        toValue,
        duration: 112,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });
  };

  render() {
    const { styles, leftElement, spinValue } = this.state;
    const {
      leftElementTestID,
      isSearchActive,
      onLeftElementPress,
      onSearchClose,
      size,
    } = this.props;

    if (!leftElement) {
      return null;
    }

    if (!isSearchActive && React.isValidElement(leftElement)) {
      return (
        <Animated.View style={styles.leftElementContainer}>
          {React.cloneElement(leftElement, {
            key: 'customLeftElement',
          })}
        </Animated.View>
      );
    }

    let onPress = onLeftElementPress;

    if (isSearchActive) {
      onPress = onSearchClose;
    }

    const flattenLeftElement = StyleSheet.flatten(styles.leftElement);
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return (
      <Animated.View
        testID={leftElementTestID}
        style={[styles.leftElementContainer, { transform: [{ rotate: spin }] }]}
      >
        <IconToggle
          key={leftElement}
          name={leftElement}
          color={flattenLeftElement.color}
          onPress={onPress}
          size={size}
          style={flattenLeftElement}
        />
      </Animated.View>
    );
  }
}

LeftElement.propTypes = propTypes;
LeftElement.defaultProps = defaultProps;
LeftElement.contextTypes = contextTypes;

export default LeftElement;
