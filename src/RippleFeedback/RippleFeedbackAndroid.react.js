/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableNativeFeedback, Platform } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */

const propTypes = {
  /**
   * The color of the underlay that will show when the touch is active.
   */
  color: PropTypes.string,
  borderless: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
const defaultProps = {
  color: null,
  borderless: true,
};

const isRippleVisible = ({ onPress, onLongPress, onPressIn, onPressOut }) =>
  onPress || onLongPress || onPressIn || onPressOut;

class RippleFeedback extends PureComponent {
  render() {
    const { children, color, borderless, ...otherProps } = this.props;

    if (!isRippleVisible(this.props)) {
      return children;
    }
    // we need to get underlayColor as props to this RippleFeedback component, because we can't
    // TouchableNativeFeedback.Ripple function on iOS devices
    const mapProps = { ...otherProps };

    if (color && Platform.Version >= 21) {
      mapProps.background = TouchableNativeFeedback.Ripple(color, borderless);
    }

    return (
      <TouchableNativeFeedback {...mapProps}>
        {children}
      </TouchableNativeFeedback>
    );
  }
}

RippleFeedback.propTypes = propTypes;
RippleFeedback.defaultProps = defaultProps;

export default RippleFeedback;
