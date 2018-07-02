/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { ViewPropTypes } from '../utils';
/* eslint-enable import/no-unresolved, import/extensions */
import withTheme from '../styles/withTheme';

import RippleFeedback from '../RippleFeedback';
import Icon from '../Icon';

const propTypes = {
  testID: PropTypes.string,
  /**
   * Will be rendered above the label as a content of the action.
   * If string, result will be <Icon name={icon} ...rest />
   * If ReactElement, will be used as is
   */
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  /**
   * Name of Icon set that should be use. From react-native-vector-icons
   */
  iconSet: PropTypes.string,
  /**
   * Will be rendered under the icon as a content of the action.
   */
  label: PropTypes.string,
  /**
   * True if the action is active (for now it'll be highlight by primary color)
   */
  active: PropTypes.bool,
  /**
   * Callback for on press event.
   */
  onPress: PropTypes.func,
  /**
   * Inline style of bottom navigation
   */
  style: PropTypes.shape({
    container: ViewPropTypes.style,
    active: Text.propTypes.style, // eslint-disable-line
    disabled: Text.propTypes.style, // eslint-disable-line
  }),
  disabled: PropTypes.bool,
};
const defaultProps = {
  testID: null,
  label: null,
  onPress: null,
  iconSet: null,
  active: false,
  disabled: false,
  style: {},
};

function getStyles(props) {
  const { bottomNavigationAction } = props.theme;

  const local = {};

  if (props.active) {
    local.container = bottomNavigationAction.containerActive;
    local.icon = bottomNavigationAction.iconActive;
    local.label = bottomNavigationAction.labelActive;
  }

  if (!props.label) {
    local.container = { paddingTop: 16, paddingBottom: 16 };
  }

  return {
    container: [
      bottomNavigationAction.container,
      local.container,
      props.style.container,
    ],
    icon: [bottomNavigationAction.icon, local.icon, props.style.icon],
    label: [bottomNavigationAction.label, local.label, props.style.label],
  };
}

class BottomNavigationAction extends PureComponent {
  renderIcon(styles) {
    const { icon } = this.props;
    const { color } = StyleSheet.flatten(styles.icon);

    let element;
    if (React.isValidElement(icon)) {
      // we need icon to change color after it's selected, so we send the color and style to
      // custom element
      element = React.cloneElement(icon, { style: styles.icon, color });
    } else {
      element = <Icon name={icon} style={styles.icon} color={color} />;
    }
    return element;
  }

  renderLabel(styles) {
    const { label } = this.props;

    if (!label) {
      return null;
    }

    return <Text style={styles.label}>{label}</Text>;
  }

  render() {
    const { onPress, testID, disabled } = this.props;

    const styles = getStyles(this.props, this.context);

    return (
      <RippleFeedback disabled={disabled} testID={testID} onPress={onPress}>
        <View style={styles.container} pointerEvents="box-only">
          {this.renderIcon(styles)}
          {this.renderLabel(styles)}
        </View>
      </RippleFeedback>
    );
  }
}

BottomNavigationAction.propTypes = propTypes;
BottomNavigationAction.defaultProps = defaultProps;

export default withTheme(BottomNavigationAction);
