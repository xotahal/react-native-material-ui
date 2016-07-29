import { getColor } from './helpers';
import { Text, View, Animated } from 'react-native';
import React, { Component, PropTypes } from 'react';

const styles = {
    badgeContainer: {
        position: 'absolute',
        borderRadius: 7.5,
        width: 15,
        height: 15,
    },
    badgeText: {
        textAlign: 'center',
    },
};

export default class IconToggle extends Component {

    static propTypes = {
        color: PropTypes.string.isRequired,
        opacity: PropTypes.number,
        disabled: PropTypes.bool,
        onPress: PropTypes.func,
        percent: PropTypes.number,
        children: PropTypes.element.isRequired,
        badge: PropTypes.shape({
            value: PropTypes.number,
            animate: PropTypes.bool,
            backgroundColor: PropTypes.string,
            textColor: PropTypes.string,
        }),
    };

    static defaultProps = {
        opacity: .1,
        disabled: false,
        percent: 90,
    };

    constructor(props) {
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0.01),
            opacityValue: new Animated.Value(0.1),
            maxOpacity: props.opacity,
            size: null,
        };
        this.responder = {
            onStartShouldSetResponder: () => true,
            onResponderGrant: this.highlight,
            onResponderRelease: this.handleResponderEnd,
            onResponderTerminate: this.unHighlight,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props && this.props.badge) {
            if (this.props.badge.value !== prevProps.badge.value) {
                this.animateBadgeCounter();
            }
        }
    }

    setSize = (event) => {
        const { width, height } = event.nativeEvent.layout;

        this.setState({
            size: width > height ? width : height,
        });
    };


    /**
     *
     * @private
     */
    highlight = () => {
        if (!this.props.disabled) {
            Animated.timing(this.state.scaleValue, {
                toValue: 1,
                duration: 150,
            }).start();
            Animated.timing(this.state.opacityValue, {
                toValue: this.state.maxOpacity,
                duration: 100,
            }).start();
        }
    };


    /**
     *
     * @private
     */
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

    /**
     *
     * @private
     */
    animateBadgeCounter = () => {
        if (this.badgeAnim && this.props.badge && this.props.badge.animate !== false) {
            Animated.spring(this.badgeAnim, {
                toValue: 0,   // Returns to the start
                velocity: 8,  // Velocity makes it move
                tension: -5, // Slow
                friction: 1,  // Oscillate a lot
                duration: 300,
            }).start();
        }
    };

    /**
     *
     * @private
     */
    handleResponderEnd = () => {
        const { disabled, onPress } = this.props;

        if (!disabled) {
            this.unHighlight();

            if (onPress) {
                onPress();
            }
        }
    };

    render() {
        const { scaleValue, opacityValue, size } = this.state;
        const { color, children } = this.props;

        let { badge } = this.props;
        let { percent } = this.props;

        if (percent < 0) {
            percent = 0;
        }
        if (percent > 100) {
            percent = 100;
        }

        percent = percent / 100;


        if (badge && typeof badge.value === 'number') {
            const backgroundColor = badge.backgroundColor || 'paperRed';
            const textColor = badge.textColor || '#ffffff';

            badge = Object.assign({},
                { value: badge.value },
                { backgroundColor },
                { textColor }
            );
        }

        this.badgeAnim = this.badgeAnim || new Animated.Value(0);

        return (
            <View {...this.responder}>
                <View>
                    {size &&
                        <Animated.View
                            style={[{
                                position: 'absolute',
                                left: ((1 - percent) * size) / 2,
                                top: ((1 - percent) * size) / 2,
                                width: percent * size,
                                height: percent * size,
                                borderRadius: percent * size / 2,
                                transform: [{ scale: scaleValue }],
                                opacity: opacityValue,
                                backgroundColor: getColor(color),
                            }]}
                        />
                    }
                    <View style={{ backgroundColor: 'transparent' }} onLayout={this.setSize}>
                        {children}
                    </View>
                    {size && badge && typeof badge.value === 'number' &&
                        <Animated.View
                            style={[
                                styles.badgeContainer, {
                                    backgroundColor: getColor(badge.backgroundColor),
                                    top: size / 10,
                                    right: size / 10,
                                    transform: [   // Array order matters
                                        { scale: this.badgeAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 1.25],
                                        }) },
                                        { translateX: this.badgeAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, -6],
                                        }) },
                                        { translateY: this.badgeAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, 5],
                                        }) },
                                        { rotate: this.badgeAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [
                                                '0deg', '45deg', // 'deg' or 'rad'
                                            ],
                                        }) },
                                    ] },
                            ]}
                        >
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text
                                    style={[
                                        styles.badgeText,
                                      { color: getColor(badge.textColor) },
                                        badge.value > 99 ? { fontSize: 8 } : { fontSize: 10 },
                                    ]}
                                >
                                    {badge.value}
                                </Text>
                            </View>
                        </Animated.View>
                    }
                </View>
            </View>
        );
    }
}
