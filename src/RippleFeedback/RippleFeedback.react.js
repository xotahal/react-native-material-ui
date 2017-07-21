/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
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
    borderless: true,
};

function isCompatible() {
    if (Platform.OS === 'ios') {
        return false;
    }

    return Platform.Version >= 21;
}

class RippleFeedback extends PureComponent {
    render() {
        const { children, color, borderless, ...otherProps } = this.props;

        if (Platform.OS === 'web') {
            return (
                <TouchableOpacity {...otherProps}>
                  {children}
                </TouchableOpacity>
            );
        }
        
        if (!isCompatible()) {
            return (
                <TouchableWithoutFeedback {...otherProps}>
                    {children}
                </TouchableWithoutFeedback>
            );
        }

        // we need to get underlayColor as props to this RippleFeedback component, because we can't
        // TouchableNativeFeedback.Ripple function on iOS devices
        const mapProps = { ...otherProps };

        if (color) {
            mapProps.background = TouchableNativeFeedback.Ripple(color, borderless);
        }

        return (
            <TouchableNativeFeedback {...mapProps} >
                {children}
            </TouchableNativeFeedback>
        );
    }

}

RippleFeedback.propTypes = propTypes;
RippleFeedback.defaultProps = defaultProps;

export default RippleFeedback;
