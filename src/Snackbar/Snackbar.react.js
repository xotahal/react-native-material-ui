/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ViewPropTypes } from '../utils';
import withTheme from '../styles/withTheme';

import Button from '../Button';

const propTypes = {
  /**
   * The text message to display.
   */
  message: PropTypes.string.isRequired,
  /**
   * Whether or not the snackbar is visible.
   */
  visible: PropTypes.bool,
  /**
   * The amount of time in milliseconds to show the snackbar.
   */
  timeout: PropTypes.number,
  /**
   * Callback for when the timeout finishes.
   */
  onRequestClose: PropTypes.func.isRequired,
  /**
   * Whether or not there is a bottom navigation on the screen.
   */
  bottomNavigation: PropTypes.bool,
  /**
   * The function to execute when the action is clicked.
   */
  onActionPress: PropTypes.func,
  /**
   * The function to execute when the action is clicked.
   */
  actionText: PropTypes.string,
  /**
   * Take a look at the Button component for more details.
   */
  button: PropTypes.shape({
    ...Button.propTypes, // eslint-disable-line
    text: PropTypes.string,
  }),
  /**
   * Inline style of snackbar
   */
  style: PropTypes.shape({
    container: ViewPropTypes.style,
    message: ViewPropTypes.style,
  }),
  /**
   * The function to execute when the snackbar's height changes.
   */
  onHeightChange: PropTypes.func,
  /**
   * Callback for when the snackbar is pressed.
   */
  onPress: PropTypes.func,
  /**
   * Theme
   */
  theme: PropTypes.any, // eslint-disable-line
};
const defaultProps = {
  onActionPress: null,
  actionText: null,
  visible: false,
  timeout: 2750,
  bottomNavigation: false,
  style: {},
  button: {},
  onHeightChange: null,
  onPress: null,
};

function getStyles(props) {
  const { snackbar } = props.theme;
  const local = {};

  return {
    container: [snackbar.container, local.container, props.style.container],
    content: [snackbar.content, local.content, props.style.content],
    message: [snackbar.message, local.message, props.style.message],
  };
}

/**
 * Component for snackbars
 * https://material.io/guidelines/components/snackbars-toasts.html
 */
class Snackbar extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.onTextLayout = this.onTextLayout.bind(this);

    const styles = getStyles(props, context);

    this.state = {
      bottomPosition: 0,
      styles,
      visible: props.visible,
    };
  }

  componentWillMount() {
    const { visible } = this.props;

    this.visibility = new Animated.Value(visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    const { style, visible, bottomNavigation } = this.props;

    if (nextProps.style !== style) {
      this.setState({ styles: getStyles(this.props, this.context) });
    }

    if (nextProps.visible !== visible) {
      if (nextProps.visible) {
        this.setState({ visible: true });
        this.setHideTimer(nextProps);
      }

      Animated.timing(this.visibility, {
        toValue: nextProps.visible ? 1 : 0,
        duration: 300,
      }).start(() => {
        this.setState({ visible: nextProps.visible });
      });
    }

    if (nextProps.bottomNavigation !== bottomNavigation) {
      this.move(nextProps.bottomNavigation);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.hideTimer);
  }

  onTextLayout({
    nativeEvent: {
      layout: { height },
    },
  }) {
    const { message, onHeightChange } = this.props;
    const { styles } = this.state;

    if (message && onHeightChange) {
      onHeightChange(
        height + StyleSheet.flatten(styles.message).marginVertical * 2,
      );
    }
  }

  setHideTimer(props) {
    const { timeout, onRequestClose } = props;

    if (timeout > 0) {
      clearTimeout(this.hideTimer);
      this.hideTimer = setTimeout(() => {
        onRequestClose();
      }, timeout);
    }
  }

  move = bottomNavigation => {
    const { theme } = this.props;
    const { container } = theme.bottomNavigation;

    const toValue = bottomNavigation ? StyleSheet.flatten(container).height : 0;

    this.setState({ bottomPosition: toValue });
  };

  renderAction = () => {
    const { button, actionText, onActionPress, theme } = this.props;
    const { snackbar } = theme;
    const styles = {};

    if (actionText && typeof onActionPress === 'function') {
      styles.container = snackbar.actionContainer;
      styles.text = snackbar.actionText;

      if (button !== 'undefined' && 'style' in button) {
        if ('container' in button.style) {
          styles.container = {
            ...StyleSheet.flatten(snackbar.actionContainer),
            ...button.style.container,
          };
        }
        if ('text' in button.style) {
          styles.text = {
            ...StyleSheet.flatten(snackbar.actionText),
            ...button.style.text,
          };
        }
      }

      return (
        <Button
          {...button}
          style={styles}
          text={actionText}
          onPress={onActionPress}
        />
      );
    }
    return null;
  };

  render() {
    const { message, onPress } = this.props;
    const { styles, bottomPosition, visible } = this.state;

    const containerStyle = {
      opacity: this.visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };

    const combinedStyle = [
      containerStyle,
      styles.container,
      { bottom: bottomPosition },
    ];

    return (
      <Animated.View style={visible ? combinedStyle : containerStyle}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.content}>
            <Text style={styles.message} onLayout={this.onTextLayout}>
              {message}
            </Text>
            {this.renderAction()}
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

Snackbar.propTypes = propTypes;
Snackbar.defaultProps = defaultProps;

export default withTheme(Snackbar);
