/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { ViewPropTypes } from '../utils';
/* eslint-enable import/no-unresolved, import/extensions */
import Icon from '../Icon';
import withTheme from '../styles/withTheme';

const propTypes = {
  /**
   * If passed in, this component will render image.
   */
  image: PropTypes.element,
  /**
   * If passed in, this component will render icon element inside avatar.
   */
  icon: PropTypes.string,
  /**
   * If passed in, this component will render an icon with this color.
   */
  iconColor: PropTypes.string,
  /**
   * If passed in, this component will render an icon with this size.
   */
  iconSize: PropTypes.number,
  /**
   * If passed in, this component will render text element inside avatar.
   */
  text: PropTypes.string,
  /**
   * It's just sugar for: style: { width: size, height: size, borderRadius: size / 2 }
   */
  size: PropTypes.number,
  /**
   * Inline style of avatar
   */
  style: PropTypes.shape({
    container: ViewPropTypes.style,
    content: Text.propTypes.style, // eslint-disable-line
  }),
  iconSet: PropTypes.string,
  /**
   * Theme
   */
  theme: PropTypes.any, // eslint-disable-line
};
const defaultProps = {
  image: null,
  icon: null,
  iconColor: null,
  iconSize: null,
  text: null,
  size: 48,
  style: {},
  iconSet: null,
};

function getStyles(props) {
  const { size, theme } = props;
  const { avatar } = theme;

  const local = {};

  if (size) {
    local.container = {
      height: size,
      width: size,
      borderRadius: size / 2,
    };
  }

  return {
    container: [avatar.container, local.container, props.style.container],
    content: [avatar.content, local.content, props.style.content],
  };
}

class Avatar extends PureComponent {
  render() {
    const {
      image,
      icon,
      iconSet,
      iconSize,
      iconColor,
      text,
      theme,
    } = this.props;
    const { avatar, spacing } = theme;

    let content = null;

    const styles = getStyles(this.props);

    if (icon) {
      const color = iconColor || StyleSheet.flatten(avatar.content).color;
      const size = iconSize || spacing.iconSize;
      content = (
        <Icon iconSet={iconSet} name={icon} color={color} size={size} />
      );
    } else if (text) {
      content = <Text style={styles.content}>{text}</Text>;
    } else if (image) {
      content = image;
    }

    return (
      <View style={{ flexGrow: 1 }}>
        <View style={styles.container}>{content}</View>
      </View>
    );
  }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default withTheme(Avatar);
