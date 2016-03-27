import React, { Component, PropTypes, View, TouchableNativeFeedback } from 'react-native';
import { default as PolyfillRipple } from './polyfill/Ripple';
import { isCompatible } from './helpers';

export default class Ripple extends Component {

    static propTypes = {
        color: PropTypes.string,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        children: PropTypes.node.isRequired
    };

    static defaultProps = {
        color: 'rgba(0,0,0,.2)'
    };

    render() {
        // eslint workaround due to - https://github.com/babel/babel-eslint/issues/249
        /* eslint-disable no-use-before-define */
        const { color, onPress, onLongPress, children, ...other } = this.props;
        /* eslint-enable no-use-before-define */

        if (!isCompatible('TouchableNativeFeedback')) {
            return (
                <PolyfillRipple
                  rippleColor={color}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  {...other}
                >
                    {/* Stops fatal crash with out of bounds animation */}
                    <View style={{ marginHorizontal: .2 }}>
                        {children}
                    </View>
                </PolyfillRipple>
            );
        }

        return (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(color)}
              onPress={onPress}
              onLongPress={onLongPress}
            >
                <View {...other}>
                    {children}
                </View>
            </TouchableNativeFeedback>
        );
    }

}
