import React, { Component, PropTypes, View, Animated } from 'react-native';

export default class Ripple extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0.001),
            pageX: null,
            pageY: null,
            rippling: false,
            size: null,
            location: null
        };
        this._responder = {
            onStartShouldSetResponder: (e) => true,
            onResponderGrant: this._highlight,
            onResponderRelease: this._handleResponderEnd,
            onResponderTerminate: this._unHighlight
        };
    }

    static propTypes = {
        color: PropTypes.string,
        background: PropTypes.string,
        rippleOpacity: PropTypes.number,
        backgroundOpacity: PropTypes.number,
        onPress: PropTypes.func,
        radius: PropTypes.number,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        color: '#999',
        background: '#999999',
        rippleOpacity: .2,
        backgroundOpacity: .2,
        disabled: false
    };

    render() {
        const { color, background, rippleOpacity, backgroundOpacity, children, style, ...other } = this.props;
        const { rippling, size, pageX, pageY, scaleValue, location } = this.state;

        return (
            <View ref="container" style={Object.assign(styles.container, style)}
                {...this._responder}
                {...other}
            >
                <View style={[
                    styles.background, {
                        backgroundColor: rippling ? background : 'transparent',
                        opacity: backgroundOpacity
                    }]}
                />
                <Animated.View style={[
                    styles.ripple,
                    location &&
                        {
                            backgroundColor:color,
                            width: size,
                            height: size,
                            top: pageY - location.pageY - size / 2,
                            left: pageX - location.pageX - size / 2,
                            borderRadius: size / 2,
                            opacity: rippleOpacity
                        },
                    {
                        transform: [{ scale: scaleValue }]
                    }]}
                />
                {children}
            </View>
        );
    };

    _highlight = (e) => {
        if (!this.props.disabled) {
            const { pageX, pageY } = e.nativeEvent;
            this.setState({
                rippling: true,
                pageX,
                pageY
            });

            this._getContainerDimensions(() => {
                const duration = (this.state.size / 100) * 110;

                Animated.timing(this.state.scaleValue, {
                    toValue: 1,
                    duration: duration < 500 || duration >= 1500 ? 500 : duration
                }).start();
            });
        }
    };

    _unHighlight = () => {
        if (!this.props.disabled) {
            this.setState({
                rippling: false
            });

            Animated.timing(this.state.scaleValue, {
                toValue: 0.001,
                duration: 0
            }).start();
        }
    };

    _handleResponderEnd = () => {
        const { onPress } = this.props;

        onPress && onPress();
        if (!this.props.disabled) {
            this._unHighlight();
        }
    };

    _getContainerDimensions = (next) => {
        this.refs.container.measure((x, y, width, height, pageX, pageY) => {
            this.setState({
                size: 3 * (width > height ? width : height),
                location: { pageX, pageY }
            }, next);
        })
    }

}

const styles = {
    container: {
        backgroundColor: 'rgba(0,0,0,0)',
        overflow: 'hidden'
    },
    background: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    ripple: {
        position: 'absolute'
    }
};