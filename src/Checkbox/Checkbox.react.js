/* eslint-disable import/no-unresolved, import/extensions */
import { StyleSheet, Text, View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import IconToggle from '../IconToggle';
import RippleFeedback from '../RippleFeedback';
import { ViewPropTypes } from '../utils';
import withTheme from '../styles/withTheme';

const propTypes = {
  /**
   * Text will be shown after Icon
   */
  label: PropTypes.string.isRequired,
  /**
   * Value will be returned when onCheck is fired
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /**
   * True if it's check
   */
  checked: PropTypes.bool,
  /**
   * Is checkbox active
   */
  disabled: PropTypes.bool,
  /**
   * Will be shown when checked is false
   */
  uncheckedIcon: PropTypes.string,
  /**
   * Will be shown when checked is true
   */
  checkedIcon: PropTypes.string,
  /**
   * Event that is called when state is changed
   */
  onCheck: PropTypes.func.isRequired,
  /**
   * Name of Icon set that should be use. From react-native-vector-icons
   */
  iconSet: PropTypes.string,
  style: PropTypes.shape({
    container: ViewPropTypes.style,
    // FIXME:
    icon: PropTypes.any, // eslint-disable-line
    label: Text.propTypes.style, // eslint-disable-line
  }),
  /**
   * Size of icon
   */
  size: PropTypes.number,
};
const defaultProps = {
  checked: false,
  checkedIcon: 'check-box',
  uncheckedIcon: 'check-box-outline-blank',
  disabled: false,
  style: {},
  size: 24,
  iconSet: null,
};

function getStyles(props) {
  const { disabled, theme } = props;
  const { checkbox, palette } = theme;

  const local = {};

  return {
    container: [checkbox.container, local.container, props.style.container],
    icon: [checkbox.icon, props.style.icon],
    label: [
      checkbox.label,
      local.label,
      props.style.label,
      // disabled has the highest priority
      disabled && { color: palette.disabledTextColor },
    ],
  };
}

class Checkbox extends PureComponent {
  onPress = () => {
    const { checked, disabled, onCheck, value } = this.props;

    if (!disabled && onCheck) {
      onCheck(!checked, value);
    }
  };

  render() {
    const {
      checked,
      checkedIcon,
      uncheckedIcon,
      disabled,
      value,
      size,
      label,
      iconSet,
    } = this.props;

    const styles = getStyles(this.props);

    const labelColor = StyleSheet.flatten(styles.label).color;
    const iconColor = StyleSheet.flatten(styles.icon).color;

    const content = (
      <View style={styles.container} pointerEvents="box-only">
        <IconToggle
          key={`${value}-${checked}`}
          name={checked ? checkedIcon : uncheckedIcon}
          disabled={disabled}
          color={checked ? iconColor : labelColor}
          onPress={this.onPress}
          iconSet={iconSet}
          size={size}
        />
        <Text style={styles.label}>{label}</Text>
      </View>
    );

    if (disabled) {
      return content;
    }

    return <RippleFeedback onPress={this.onPress}>{content}</RippleFeedback>;
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default withTheme(Checkbox);
