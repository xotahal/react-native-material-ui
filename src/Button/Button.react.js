/* eslint-disable import/no-unresolved, import/extensions */
import { View, Text, StyleSheet } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from '../utils';
/* eslint-enable import/no-unresolved, import/extensions */
import Icon from '../Icon';
import RippleFeedback from '../RippleFeedback';
/* eslint-disable import/no-unresolved, import/extensions */
import getPlatformElevation from '../styles/getPlatformElevation';
/* eslint-enable import/no-unresolved, import/extensions */
import withTheme from '../styles/withTheme';

const propTypes = {
  testID: PropTypes.string,
  /**
   * If true button will be disabled
   */
  disabled: PropTypes.bool,
  /**
   * If true button will be raised
   */
  raised: PropTypes.bool,
  /**
   * Called when button is pressed. Text is passed as param
   */
  onPress: PropTypes.func,
  /**
   * Called when button is long pressed. Text is passed as param
   */
  onLongPress: PropTypes.func,
  /**
   * Text will be shown on button
   */
  text: PropTypes.string.isRequired,
  /**
   * Button text will be in uppercase letters
   */
  upperCase: PropTypes.bool,
  /**
   * If specified it'll be shown before text
   */
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Name of Icon set that should be use. From react-native-vector-icons
   */
  iconSet: PropTypes.string,
  /**
   * You can override any style for this button
   */
  style: PropTypes.shape({
    container: ViewPropTypes.style,
    text: Text.propTypes.style, // eslint-disable-line
  }),
  primary: PropTypes.bool,
  accent: PropTypes.bool,
};
const defaultProps = {
  testID: null,
  icon: null,
  onPress: null,
  onLongPress: null,
  primary: false,
  accent: false,
  disabled: false,
  raised: false,
  upperCase: true,
  iconSet: null,
  style: {},
};

function getStyles(props, state) {
  const { primary, accent, disabled, raised, theme } = props;
  const {
    button,
    buttonFlat,
    buttonRaised,
    buttonDisabled,
    buttonRaisedDisabled,
    palette,
  } = theme;

  const local = {
    container: {},
  };

  if (!disabled) {
    if (primary && !raised) {
      local.text = { color: palette.primaryColor };
    } else if (accent && !raised) {
      local.text = { color: palette.accentColor };
    }

    if (primary && raised) {
      local.container.backgroundColor = palette.primaryColor;
      local.text = { color: palette.canvasColor };
    } else if (accent && raised) {
      local.container.backgroundColor = palette.accentColor;
      local.text = { color: palette.canvasColor };
    }
  }

  if (raised && !disabled) {
    local.container = {
      ...local.container,
      ...getPlatformElevation(state.elevation),
    };
  }

  return {
    container: [
      button.container,
      !raised && buttonFlat.container,
      raised && buttonRaised.container,
      !raised && disabled && buttonDisabled.container,
      raised && disabled && buttonRaisedDisabled.container,
      local.container,
      props.style.container,
    ],
    text: [
      button.text,
      !raised && buttonFlat.text,
      raised && buttonRaised.text,
      !raised && disabled && buttonDisabled.text,
      raised && disabled && buttonRaisedDisabled.text,
      local.text,
      props.style.text,
    ],
    icon: [
      button.icon,
      !raised && buttonFlat.icon,
      disabled && buttonDisabled.icon,
      raised && buttonRaised.icon,
      local.icon,
      props.style.icon,
    ],
  };
}

class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      elevation: 2, // eslint-disable-line
    };
  }

  onPress = () => {
    const { text, onPress } = this.props;

    if (onPress) {
      onPress(text);
    }
  };

  setElevation = () => {
    this.setState({
      elevation: 4, // eslint-disable-line
    });
  };

  removeElevation = () => {
    this.setState({
      elevation: 2, // eslint-disable-line
    });
  };

  renderIcon = styles => {
    const { icon, iconSet } = this.props;
    const textFlatten = StyleSheet.flatten(styles.text);

    if (!icon) {
      return null;
    }

    let result;

    if (React.isValidElement(icon)) {
      result = icon;
    } else if (typeof icon === 'string') {
      result = (
        <Icon
          iconSet={iconSet}
          name={icon}
          color={textFlatten.color}
          style={styles.icon}
          size={24}
        />
      );
    }

    return result;
  };

  render() {
    const {
      text,
      disabled,
      raised,
      upperCase,
      onLongPress,
      testID,
    } = this.props;

    const styles = getStyles(this.props, this.state);

    const content = (
      <View style={styles.container} pointerEvents="box-only">
        {this.renderIcon(styles)}
        <Text style={styles.text}>{upperCase ? text.toUpperCase() : text}</Text>
      </View>
    );

    if (disabled) {
      return content;
    }

    return (
      <RippleFeedback
        testID={testID}
        onPress={!disabled ? this.onPress : null}
        onLongPress={!disabled ? onLongPress : null}
        onPressIn={raised ? this.setElevation : null}
        onPressOut={raised ? this.removeElevation : null}
        delayPressIn={50}
      >
        {content}
      </RippleFeedback>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default withTheme(Button);
