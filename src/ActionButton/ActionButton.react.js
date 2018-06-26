/* eslint-disable import/no-unresolved, import/extensions */
import Color from 'color';
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  LayoutAnimation,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { ViewPropTypes } from '../utils';
/* eslint-enable import/no-unresolved, import/extensions */
import Icon from '../Icon';
import IconToggle from '../IconToggle';
import RippleFeedback from '../RippleFeedback';
/* eslint-disable import/no-unresolved, import/extensions */
import getPlatformElevation from '../styles/getPlatformElevation';
/* eslint-enable import/no-unresolved, import/extensions */
import withTheme from '../styles/withTheme';

function darkenOrLighten(color, ratio = 0.5) {
  const c = Color(color);
  return c.luminosity() > 0.5 ? c.darken(ratio) : c.lighten(ratio);
}

const propTypes = {
  /**
   * Array of names of icons (or elements) that will be shown after the main button is pressed
   * Remember, you should specify key for each element, if you use array of elements
   */
  actions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        label: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
  ]),
  /**
   * Called when button is pressed. Text is passed as param
   */
  onPress: PropTypes.func,
  /**
   * Called when button is long pressed. Text is passed as param
   */
  onLongPress: PropTypes.func,
  /**
   * Set true if you want to hide action button
   */
  hidden: PropTypes.bool,
  /**
   * If specified it'll be shown before text
   */
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /**
   * Leave it empty if you don't want any transition after press. Otherwise, it will be trnasform
   * to another view - depends on transition value.
   */
  transition: PropTypes.oneOf(['toolbar', 'speedDial']),
  /**
   * Set ripple color
   */
  rippleColor: PropTypes.string,
  /**
   * You can overide any style for this button
   */
  style: PropTypes.shape({
    container: ViewPropTypes.style,
    icon: Text.propTypes.style, // eslint-disable-line
  }),
};
const defaultProps = {
  actions: null,
  onPress: null,
  onLongPress: null,
  transition: null,
  icon: 'add',
  style: {},
  hidden: false,
  rippleColor: null,
};

function getStyles(props, state) {
  const { size, theme } = props;
  const { actionButton } = theme;

  const local = {
    container: {},
  };

  if (size) {
    local.container = {
      height: size,
      width: size,
      borderRadius: size / 2,
    };
  }

  local.container = {
    ...local.container,
    ...getPlatformElevation(state.elevation),
  };

  return {
    positionContainer: [
      actionButton.positionContainer,
      local.positionContainer,
      props.style.positionContainer,
    ],
    toolbarPositionContainer: [
      actionButton.toolbarPositionContainer,
      local.toolbarPositionContainer,
      props.style.toolbarPositionContainer,
    ],
    container: [actionButton.container, local.container, props.style.container],
    overlayContainer: [
      actionButton.overlayContainer,
      local.overlayContainer,
      props.style.overlayContainer,
    ],
    toolbarContainer: [
      actionButton.toolbarContainer,
      local.toolbarContainer,
      props.style.toolbarContainer,
    ],
    toolbarActionContainer: [
      actionButton.toolbarActionContainer,
      local.toolbarActionContainer,
      props.style.toolbarActionContainer,
    ],
    speedDialContainer: [
      actionButton.speedDialContainer,
      local.speedDialContainer,
      props.style.speedDialContainer,
    ],
    speedDialActionContainer: [
      actionButton.speedDialActionContainer,
      local.speedDialActionContainer,
      props.style.speedDialActionContainer,
    ],
    speedDialActionLabel: [
      actionButton.speedDialActionLabel,
      local.speedDialActionLabel,
      props.style.speedDialActionLabel,
    ],
    speedDialActionLabelContainer: [
      actionButton.speedDialActionLabelContainer,
      local.speedDialActionLabelContainer,
      props.style.speedDialActionLabelContainer,
    ],
    speedDialActionIconContainer: [
      actionButton.speedDialActionIconContainer,
      local.speedDialActionIconContainer,
      props.style.speedDialActionIconContainer,
    ],
    speedDialActionIcon: [
      actionButton.speedDialActionIcon,
      local.speedDialActionIcon,
      props.style.speedDialActionIcon,
    ],
    icon: [actionButton.icon, local.icon, props.style.icon],
  };
}

const getRippleContainerStyle = containerStyle => {
  const flattenContainer = StyleSheet.flatten(containerStyle);
  const { height, width, borderRadius } = flattenContainer;

  return { container: { height, width, borderRadius } };
};

class ActionButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { render: 'button' };
  }

  componentWillReceiveProps(nextProps) {
    const { hidden } = this.props;

    if (nextProps.hidden !== hidden) {
      if (nextProps.hidden === true) {
        this.hide();
      } else {
        this.show();
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { render } = this.state;

    if (render !== nextState.render) {
      LayoutAnimation.easeInEaseOut();
    }
  }

  onPress = action => {
    const { onPress } = this.props;

    this.toggleState();

    if (onPress) {
      onPress(action);
    }
  };

  getActionItemKey = ({ icon, name }) => {
    let key = icon;
    if (name) {
      key = name;
    } else if (React.isValidElement(icon) && icon.key) {
      key = icon.key; // eslint-disable-line
    }
    return key;
  };

  getRippleColor() {
    const { rippleColor } = this.props;

    if (rippleColor) {
      return rippleColor;
    }

    const styles = getStyles(this.props, this.state);

    const { backgroundColor } = StyleSheet.flatten(styles.container);

    return darkenOrLighten(backgroundColor).toString();
  }

  toggleState = () => {
    const { transition } = this.props;
    const { render } = this.state;

    if (render === 'button') {
      if (transition) {
        this.setState({ render: transition });
      }
    } else {
      this.setState({ render: 'button' });
    }
  };

  show = () => {
    // Animated.timing(this.state.scaleValue, {
    //     toValue: 1,
    //     duration: 225,
    //     easing: Easing.bezier(0.0, 0.0, 0.2, 1),
    //     useNativeDriver: true,
    // }).start();
  };

  hide = () => {
    // Animated.timing(this.state.scaleValue, {
    //     // TODO: why is not 0 here?
    //     // see: https://github.com/facebook/react-native/issues/10510
    //     toValue: 0.01,
    //     duration: 195,
    //     easing: Easing.bezier(0.4, 0.0, 0.6, 1),
    //     useNativeDriver: true,
    // }).start();
  };

  renderToolbarTransition = styles => {
    const { actions } = this.props;

    return (
      <View style={styles.toolbarPositionContainer}>
        <View key="main-button" style={styles.toolbarContainer}>
          {actions.map(action => {
            if (typeof action === 'string') {
              return this.renderToolbarAction(styles, action);
            }
            if (React.isValidElement(action)) {
              return this.renderToolbarElementAction(styles, action);
            }

            const { icon, label, name } = action;
            // TODO: pass action
            return this.renderToolbarLabelAction(styles, icon, label, name);
          })}
        </View>
      </View>
    );
  };

  renderSpeedDialTransition = styles => {
    const { actions } = this.props;

    return (
      <View style={[StyleSheet.absoluteFillObject, { flex: 1 }]}>
        <TouchableWithoutFeedback onPress={this.toggleState}>
          <View style={styles.overlayContainer}>
            <View style={[styles.positionContainer, styles.speedDialContainer]}>
              <View
                style={{
                  alignItems: 'flex-end',
                  marginBottom: 16,
                }}
              >
                {actions.map(action => {
                  if (typeof action === 'string') {
                    return this.renderAction(styles, action);
                  }

                  if (React.isValidElement(action)) {
                    return this.renderElementAction(styles, action);
                  }

                  const { icon, label, name } = action;
                  // TODO: pass action
                  return this.renderLabelAction(styles, icon, label, name);
                })}
              </View>
              {this.renderMainButton(styles)}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  renderMainButton = styles => {
    const { onLongPress, icon } = this.props;
    const { render } = this.state;

    const mainIcon = render !== 'button' ? 'clear' : icon;

    return (
      <View key="main-button" style={styles.container}>
        <RippleFeedback
          style={getRippleContainerStyle(styles.container)}
          color={this.getRippleColor()}
          onPress={() => this.onPress('main-button')}
          onLongPress={onLongPress}
          delayPressIn={20}
        >
          {this.renderIconButton(styles, mainIcon)}
        </RippleFeedback>
      </View>
    );
  };

  renderToolbarAction = (styles, icon, name) => {
    let content;
    const key = this.getActionItemKey({ icon, name });

    if (React.isValidElement(icon)) {
      content = (
        <RippleFeedback
          color={this.getRippleColor()}
          onPress={() => this.onPress(key)}
          delayPressIn={20}
        >
          {this.renderIconButton(styles, icon)}
        </RippleFeedback>
      );
    } else {
      content = (
        <IconToggle
          key={key}
          name={key}
          onPress={() => this.onPress(key)}
          style={{ icon: styles.icon }}
        />
      );
    }
    return (
      <View key={key} style={styles.toolbarActionContainer}>
        {content}
      </View>
    );
  };

  renderToolbarElementAction = (styles, icon) => {
    const key = this.getActionItemKey({ icon });
    return (
      <View key={key} style={styles.toolbarActionContainer}>
        {this.renderToolbarAction(styles, icon)}
      </View>
    );
  };

  /**
   * TODO: implement labels for toolbar?
   */
  renderToolbarLabelAction = (styles, icon, label, name) => {
    const key = this.getActionItemKey({ icon, name });
    return (
      <View key={key} style={styles.toolbarActionContainer}>
        {this.renderToolbarAction(styles, icon, name)}
      </View>
    );
  };

  renderAction = (styles, icon, name) => {
    const key = this.getActionItemKey({ icon, name });
    return (
      <View key={key} style={styles.speedDialActionIconContainer}>
        <View style={styles.speedDialActionIcon}>
          <RippleFeedback
            style={getRippleContainerStyle(styles.speedDialActionIcon)}
            color={this.getRippleColor()}
            onPress={() => this.onPress(key)}
            delayPressIn={20}
          >
            {this.renderIconButton(styles, icon)}
          </RippleFeedback>
        </View>
      </View>
    );
  };

  renderElementAction = (styles, icon) => {
    const key = this.getActionItemKey({ icon });
    return (
      <View key={key} style={styles.speedDialActionContainer}>
        {this.renderAction(styles, icon)}
      </View>
    );
  };

  renderLabelAction = (styles, icon, label, name) => {
    const key = this.getActionItemKey({ icon, name });
    return (
      <View key={key} style={styles.speedDialActionContainer}>
        <View style={styles.speedDialActionLabelContainer}>
          <Text style={styles.speedDialActionLabel}>{label}</Text>
        </View>
        {this.renderAction(styles, icon, name)}
      </View>
    );
  };

  renderIconButton = (styles, icon) => {
    let result;
    if (React.isValidElement(icon)) {
      result = icon;
    } else {
      result = <Icon name={icon} style={styles.icon} />;
    }
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        pointerEvents="box-only"
      >
        {result}
      </View>
    );
  };

  renderButton = styles => (
    <Animated.View style={styles.positionContainer}>
      {this.renderMainButton(styles)}
    </Animated.View>
  );

  render() {
    const { render } = this.state;

    const styles = getStyles(this.props, this.state);

    if (render === 'toolbar') {
      return this.renderToolbarTransition(styles);
    }
    if (render === 'speedDial') {
      return this.renderSpeedDialTransition(styles);
    }

    return this.renderButton(styles);
  }
}

ActionButton.propTypes = propTypes;
ActionButton.defaultProps = defaultProps;

export default withTheme(ActionButton);
