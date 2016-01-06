import React, { Component, PropTypes, Text, View, Animated } from 'react-native';
import { getColor } from './helpers';

export default class IconToggle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0.001),
            opacityValue: new Animated.Value(0.1),
            maxOpacity: props.opacity,
            size: null
        };
        this._responder = {
            onStartShouldSetResponder: (e) => true,
            onResponderGrant: this._highlight,
            onResponderRelease: this._handleResponderEnd,
            onResponderTerminate: this._unHighlight
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props && this.props.badge) {
            if (this.props.badge.value !== prevProps.badge.value) {
                this._animateBadgeCounter();
            }
        }
    };

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
            textColor: PropTypes.string
        })
    };

    static defaultProps = {
        opacity: .1,
        disabled: false,
        percent: 90
    };

    setSize = (event) => {
        const { width, height } = event.nativeEvent.layout;

        this.setState({
            size: width > height ? width : height
        });
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
            badge = Object.assign({},
                {value: badge.value},
                badge.backgroundColor ? {backgroundColor: badge.backgroundColor} : {backgroundColor: 'paperRed'},
                badge.textColor ? {textColor: badge.textColor} : {textColor: '#ffffff'}
            );
        }

        this.badgeAnim = this.badgeAnim || new Animated.Value(0);

        return (
            <View {...this._responder}>
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
                                backgroundColor: getColor(color)
                            }]}
                    />
                    }
                    <View onLayout={(event) => { this.setSize(event) }}>
                        {children}
                    </View>
                    {size && badge && typeof badge.value === 'number' &&
                    <Animated.View style={[
                            styles.badgeContainer, {
                                backgroundColor: getColor(badge.backgroundColor),
                                top: size / 10,
                                right: size / 10,
                                transform: [   // Array order matters
								{scale: this.badgeAnim.interpolate({
								  inputRange: [0, 1],
								  outputRange: [1, 1.25]
								})},
								{translateX: this.badgeAnim.interpolate({
								  inputRange: [0, 1],
								  outputRange: [0, -6]
								})},
								{translateY: this.badgeAnim.interpolate({
								  inputRange: [0, 1],
								  outputRange: [0, 5]
								})},
								{rotate: this.badgeAnim.interpolate({
								  inputRange: [0, 1],
								  outputRange: [
									'0deg', '45deg' // 'deg' or 'rad'
								  ]
								})}
							  ]
                            }]}
                    >
                        <Text style={[styles.badgeText, { color: getColor(badge.textColor) }]}>
                            {badge.value}
                        </Text>
                    </Animated.View>
                    }
                </View>
            </View>
        );
    };

    /**
     *
     * @private
     */
    _highlight = () => {
        if (!this.props.disabled) {
            Animated.timing(this.state.scaleValue, {
                toValue: 1,
                duration: 150
            }).start();
            Animated.timing(this.state.opacityValue, {
                toValue: this.state.maxOpacity,
                duration: 100
            }).start();
        }
    };


    /**
     *
     * @private
     */
    _unHighlight = () => {
        if (!this.props.disabled) {
            Animated.timing(this.state.scaleValue, {
                toValue: 0.001,
                duration: 1500
            }).start();
            Animated.timing(this.state.opacityValue, {
                toValue: 0
            }).start();
        }
    };

    /**
     *
     * @private
     */
    _animateBadgeCounter = () => {
        if (this.badgeAnim && this.props.badge && this.props.badge.animate !== false) {
            Animated.spring(this.badgeAnim, {
                toValue: 0,   // Returns to the start
                velocity: 8,  // Velocity makes it move
                tension: -5, // Slow
                friction: 1,  // Oscillate a lot
                duration: 300
            }).start();
        }
    };

    /**
     *
     * @private
     */
    _handleResponderEnd = () => {
        const { disabled, onPress } = this.props;

        if (!disabled) {
            this._unHighlight();
            onPress && onPress();
        }
    };
}

const styles = {
    badgeContainer: {
        position: 'absolute',
        borderRadius: 7,
        width: 15,
        height: 15
    },
    badgeText: {
        lineHeight: 10,
        textAlign: 'center',
        fontSize: 10,
        paddingTop: 8
    }
};