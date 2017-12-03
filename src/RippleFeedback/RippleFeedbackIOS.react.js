/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import Color from 'color';
import { black } from '../styles/colors';
import { ELEVATION_ZINDEX } from '../styles/constants';

const propTypes = {
    color: PropTypes.string,
    /**
    * Max opacity of ripple effect
    */
    maxOpacity: PropTypes.number,
    /**
    * If true, the interaction will be forbidden
    */
    disabled: PropTypes.bool,
    /**
    * It'll be used instead of icon (see props name) if exists
    */
    children: PropTypes.element,
    /**
    * Call when icon was pressed
    */
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
};
const defaultProps = {
    children: null,
    onPress: null,
    onLongPress: null,
    onPressIn: null,
    onPressOut: null,
    color: Color(black).alpha(.87).toString(),
    disabled: false,
    maxOpacity: 0.16,
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
});

/**
* Usualy we use width and height to compute this. In case, the width of container is too big
* we use this constant as a width of ripple effect.
*/
const MAX_DIAMETER = 200;

class RippleFeedbackIOS extends PureComponent {
    constructor(props, context) {
        super(props, context);

        // https://material.google.com/components/buttons.html#buttons-toggle-buttons
        const maxOpacity = Color(props.color).dark() ? 0.12 : 0.30;

        this.state = {
            scaleValue: new Animated.Value(0),
            opacityRippleValue: new Animated.Value(maxOpacity),
            opacityBackgroundValue: new Animated.Value(0),
            diameter: MAX_DIAMETER,
            maxOpacity,
            rippleColor: Color(props.color),
        };
    }
    onLayoutChanged = (event) => {
        try {
            // get width and height of wrapper
            const { nativeEvent: { layout: { width, height } } } = event;
            const diameter = Math.ceil(Math.sqrt((width * width) + (height * height)));

            this.setState({
                diameter: Math.min(diameter, MAX_DIAMETER),
            });
        } catch (e) {
            this.setState({
                diameter: MAX_DIAMETER,
            });
        }
    }
    onLongPress = () => {
        const { onLongPress } = this.props;

        const { maxOpacity } = this.state;
        // Long press has to be indicated like this because we need to animate containers back to
        // default values in onPressOut function
        this.longPress = true;

        // Animation of long press is slightly different than onPress animation
        Animated.timing(this.state.opacityBackgroundValue, {
            toValue: maxOpacity / 2,
            duration: 700,
            useNativeDriver: true,
        }).start();

        if (onLongPress) {
            onLongPress();
        }
    }
    onPress = () => {
        const { onPress } = this.props;
        const { maxOpacity, diameter } = this.state;

        Animated.parallel([
            // Display background layer thru whole over the view
            Animated.timing(this.state.opacityBackgroundValue, {
                toValue: maxOpacity / 2,
                duration: 125 + diameter,
                easing: Easing.in(Easing.quad),
                useNativeDriver: true,
            }),
            // Opacity of ripple effect starts on maxOpacity and goes to 0
            Animated.timing(this.state.opacityRippleValue, {
                toValue: 0,
                duration: 125 + diameter,
                useNativeDriver: true,
            }),
            // Scale of ripple effect starts at 0 and goes to 1
            Animated.timing(this.state.scaleValue, {
                toValue: 1,
                duration: 125 + diameter,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
        ]).start(() => {
            // After the effect is fully displayed we need background to be animated back to default
            Animated.timing(this.state.opacityBackgroundValue, {
                toValue: 0,
                duration: 225,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }).start();

            this.setDefaultAnimatedValues();
        });

        if (onPress) {
            onPress();
        }
    }
    onPressIn = (event) => {
        const { onPressIn } = this.props;

        // because we need ripple effect to be displayed exactly from press point
        this.setState({
            pressX: event.nativeEvent.locationX,
            pressY: event.nativeEvent.locationY,
        });

        if (onPressIn) {
            onPressIn();
        }
    }
    onPressOut = () => {
        const { diameter } = this.state;
        const { onPressOut } = this.props;

        // When user use onPress all animation happens in onPress method. But when user use long
        // press. We displaye background layer in onLongPress and then we need to animate ripple
        // effect that is done here.
        if (this.longPress) {
            this.longPress = false;
            Animated.parallel([
                // Hide opacity background layer, slowly. It has to be done later than ripple
                // effect
                Animated.timing(this.state.opacityBackgroundValue, {
                    toValue: 0,
                    duration: 500 + diameter,
                    useNativeDriver: true,
                }),
                // Opacity of ripple effect starts on maxOpacity and goes to 0
                Animated.timing(this.state.opacityRippleValue, {
                    toValue: 0,
                    duration: 125 + diameter,
                    useNativeDriver: true,
                }),
                // Scale of ripple effect starts at 0 and goes to 1
                Animated.timing(this.state.scaleValue, {
                    toValue: 1,
                    duration: 125 + diameter,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                }),
            ]).start(this.setDefaultAnimatedValues);
        }

        if (onPressOut) {
            onPressOut();
        }
    }
    setDefaultAnimatedValues = () => {
        const { maxOpacity } = this.state;
        // We can set up scale to 0 and opacity back to maxOpacity
        this.state.scaleValue.setValue(0);
        this.state.opacityRippleValue.setValue(maxOpacity);
    }
    renderRippleView = () => {
        const {
            scaleValue,
            opacityRippleValue,
            diameter,
            pressX,
            pressY,
            rippleColor,
        } = this.state;

        return (
            // we need set zindex for iOS, because the components with elevation have the
            // zindex set as well, thus, there could be displayed backgroundColor of
            // component with bigger zindex - and that's not good
            <Animated.View
                pointerEvents="none"
                style={[{
                    position: 'absolute',
                    top: (pressY || 0) - (diameter / 2),
                    left: (pressX || 0) - (diameter / 2),
                    width: diameter,
                    height: diameter,
                    borderRadius: (diameter) / 2,
                    transform: [{ scale: scaleValue }],
                    opacity: opacityRippleValue,
                    backgroundColor: rippleColor.toString(),
                    zIndex: ELEVATION_ZINDEX,
                }]}
            />
        );
    }
    renderOpacityBackground = () => {
        const { opacityBackgroundValue, rippleColor } = this.state;

        return (
            // we need set zindex for iOS, because the components with elevation have the
            // zindex set as well, thus, there could be displayed backgroundColor of
            // component with bigger zindex - and that's not good
            <Animated.View
                pointerEvents="none"
                style={[{
                    ...StyleSheet.absoluteFillObject,
                    opacity: opacityBackgroundValue,
                    backgroundColor: rippleColor.toString(),
                    zIndex: ELEVATION_ZINDEX,
                }]}
            />
        );
    }
    render() {
        const { children, disabled } = this.props;

        return (
            <TouchableWithoutFeedback
                disabled={disabled}
                onLayout={this.onLayoutChanged}
                onPressIn={this.onPressIn}
                onLongPress={this.onLongPress}
                onPressOut={this.onPressOut}
                onPress={this.onPress}
            >
                <View style={styles.container} pointerEvents="box-none">
                    {children}
                    {this.renderOpacityBackground()}
                    {this.renderRippleView()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

RippleFeedbackIOS.propTypes = propTypes;
RippleFeedbackIOS.defaultProps = defaultProps;

export default RippleFeedbackIOS;
