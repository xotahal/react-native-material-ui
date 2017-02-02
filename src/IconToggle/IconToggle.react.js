/* eslint-disable import/no-unresolved, import/extensions */
import { View, Animated, StyleSheet, Platform } from 'react-native';
import React, { PureComponent, PropTypes } from 'react';
/* eslint-enable import/no-unresolved, import/extensions */

import Color from 'color';
import { ELEVATION_ZINDEX } from '../styles/getPlatformElevation';
import Icon from '../Icon';

const propTypes = {
    color: PropTypes.string,
    /**
    * The color of the underlay that will show when the touch is active.
    */
    underlayColor: PropTypes.string,
    /**
    * Size of underlayColor
    */
    percent: PropTypes.number,
    /**
    * If true, the interaction will be forbidden
    */
    disabled: PropTypes.bool,
    /**
    * Size of icon (default is 24 - see spacing in palette)
    */
    size: PropTypes.number,
    /**
    * Name of icon to show
    */
    name: PropTypes.string,

    /**
    * It'll be used instead of icon (see props name) if exists
    */
    children: PropTypes.element,
    /**
    * Call when icon was pressed
    */
    onPress: PropTypes.func,
};
const defaultProps = {
    disabled: false,
    percent: 90,
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { iconToggle, palette } = context.uiTheme;

    const local = {};

    if (props.color) {
        local.icon = {
            color: props.color,
        };
    }

    return {
        container: [
            iconToggle.container,
            local.container,
            props.style.container,
        ],
        icon: [
            iconToggle.icon,
            local.icon,
            props.style.icon,
            // diabled has the highest priority - because user can use color props and disabled
            // together
            props.disabled && { color: palette.disabledColor },
        ],
    };
}
/**
* Returns size of icon. Priority order: style prop, size prop, spacing.iconSize.
*/
function getIconSize(props, spacing) {
    const { icon } = props.style;

    if (icon && icon.width) {
        return icon.width;
    }
    if (props.size) {
        return props.size;
    }

    return spacing.iconSize;
}

class IconToggle extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.maxOpacity = 0.26;

        const { spacing } = context.uiTheme;
        const iconSize = getIconSize(props, spacing);

        this.state = {
            scaleValue: new Animated.Value(0.01),
            opacityValue: new Animated.Value(0.26),
            rippleSize: iconSize * 2,
            iconSize,
        };
        this.responder = {
            onStartShouldSetResponder: () => true,
            onResponderGrant: this.highlight,
            onResponderRelease: this.handleResponderEnd,
            onResponderTerminate: this.unHighlight,
        };
    }
    onLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;

        this.setState({
            size: width > height ? width : height,
        });
    };
    highlight = () => {
        if (!this.props.disabled) {
            Animated.timing(this.state.scaleValue, {
                toValue: 1,
                duration: 150,
            }).start();
            Animated.timing(this.state.opacityValue, {
                toValue: this.maxOpacity,
                duration: 100,
            }).start();
        }
    };
    unHighlight = () => {
        if (!this.props.disabled) {
            Animated.timing(this.state.scaleValue, {
                toValue: 0.01,
                duration: 1500,
            }).start();
            Animated.timing(this.state.opacityValue, {
                toValue: 0,
            }).start();
        }
    };
    handleResponderEnd = () => {
        const { disabled, onPress } = this.props;

        if (!disabled) {
            this.unHighlight();

            if (onPress) {
                onPress();
            }
        }
    };
    renderRippleView = (styles) => {
        const { scaleValue, opacityValue } = this.state;
        const { size } = this.state;
        let { percent } = this.props;

        // normalize
        percent = Math.max(percent, 0);
        percent = Math.min(percent, 100);
        percent /= 100;

        if (!size) {
            return null;
        }

        const color = Color(StyleSheet.flatten(styles.icon).color);
        // https://material.google.com/components/buttons.html#buttons-toggle-buttons
        this.maxOpacity = color.dark() ? 0.12 : 0.30;

        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    left: ((1 - percent) * size) / 2,
                    top: ((1 - percent) * size) / 2,
                    width: percent * size,
                    height: percent * size,
                    borderRadius: (percent * size) / 2,
                    transform: [{ scale: scaleValue }],
                    opacity: opacityValue,
                    backgroundColor: color.hexString(),
                    // we need set zindex for iOS, because the components with elevation have the
                    // zindex set as well, thus, there could be displayed backgroundColor of
                    // component with bigger zindex - and that's not good
                    zIndex: Platform.OS === 'ios' ? ELEVATION_ZINDEX : null,
                }]}
            />
        );
    }
    renderIcon = (styles) => {
        const { name, children } = this.props;
        const { iconSize } = this.state;

        if (children) {
            return children;
        }

        const color = StyleSheet.flatten(styles.icon).color;

        return <Icon name={name} color={color} size={iconSize} />;
    }
    render() {
        const styles = getStyles(this.props, this.context, this.state);

        return (
            <View {...this.responder}>
                <View>
                    {this.renderRippleView(styles)}
                    <View style={styles.container} onLayout={this.onLayout}>
                        {this.renderIcon(styles)}
                    </View>
                </View>
            </View>
        );
    }
}

IconToggle.propTypes = propTypes;
IconToggle.defaultProps = defaultProps;
IconToggle.contextTypes = contextTypes;


export default IconToggle;
