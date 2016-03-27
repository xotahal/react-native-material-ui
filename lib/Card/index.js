import React, { Component, PropTypes, View, TouchableNativeFeedback } from 'react-native';
import Ripple from '../polyfill/Ripple';
import { getColor, isCompatible } from '../helpers';

import Media from './Media';
import Body from './Body';
import Actions from './Actions';

import { COLOR } from '../config';

const styles = {
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 2,
        margin: 8,
        paddingLeft: 16,
        paddingRight: 16
    }
};

export default class Card extends Component {

    static propTypes = {
        theme: PropTypes.string,
        overrides: PropTypes.shape({
            backgroundColor: PropTypes.string,
            rippleColor: PropTypes.string
        }),
        elevation: PropTypes.number,
        disabled: PropTypes.bool,
        onPress: PropTypes.func,
        children: PropTypes.node.isRequired,
        style: PropTypes.object
    };

    static defaultProps = {
        elevation: 2,
        disabled: false
    };

    static Media = Media;

    static Body = Body;

    static Actions = Actions;

    render() {
        const { theme, overrides, elevation, disabled, onPress, children, style } = this.props;

        const cardStyle = (() => ([
            styles.container, {
                elevation
            }, !isCompatible('elevation') && {
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,.12)'
            }, theme && {
                backgroundColor: COLOR[theme].color
            }, overrides && overrides.backgroundColor && {
                backgroundColor: overrides.backgroundColor
            }, style
        ]))();


        if (onPress === null || disabled) {
            return (
                <View style={cardStyle}>
                    {children}
                </View>
            );
        }

        const defaultRippleColor = 'rgba(153,153,153,.4)';
        const rippleColor = (() => {
            if (disabled || !(overrides && overrides.rippleColor)) {
                return defaultRippleColor;
            }

            return getColor(overrides.rippleColor);
        })();

        if (!isCompatible('TouchableNativeFeedback')) {
            return (
                <Ripple
                  rippleColor={rippleColor}
                  onPress={onPress}
                >
                    <View style={cardStyle}>
                        {children}
                    </View>
                </Ripple>
            );
        }

        return (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(rippleColor)}
              onPress={onPress}
            >
                <View style={cardStyle}>
                    {children}
                </View>
            </TouchableNativeFeedback>
        );
    }

}
