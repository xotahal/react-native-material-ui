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
            location: null,
            longPress: false,
            elevation: props.elevation ? props.elevation[0] : null
        };
        this._responder = {
            onStartShouldSetResponder: (e) => true,
            onResponderGrant: this._highlight,
            onResponderRelease: this._handleResponderEnd,
            onResponderTerminate: this._unHighlight
        };
        this.timeout = null;
    }

    static propTypes = {
        rippleColor: PropTypes.string,
        elevation: PropTypes.array,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        children: PropTypes.element.isRequired
    };

    static defaultProps = {
        rippleColor: 'rgba(0,0,0,.2)',
        elevation: null
    };

    componentWillUnmount = () => {
        clearTimeout(this.timeout);
    }

    render() {
        const { rippleColor, children, style } = this.props;
        const { size, pageX, pageY, scaleValue, location, elevation } = this.state;

        return (
            <View
                elevation={elevation ? elevation : 0}
                ref='container'
                style={style || {}}
                {...this._responder}
            >
                <Animated.View style={[
                    styles.ripple,
                    location &&
                        {
                            backgroundColor: rippleColor,
                            width: size,
                            height: size,
                            top: pageY - location.pageY - size / 2,
                            left: pageX - location.pageX - size / 2,
                            borderRadius: size / 2
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
        const { onLongPress, elevation } = this.props;

        if (elevation) {
            this.setState({
                elevation: elevation[1]
            });
        }

        this.timeout = setTimeout(() => {
            onLongPress && onLongPress();
            this.setState({
                longPress: true
            });
        }, 500);

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
    };

    _unHighlight = () => {
        const { elevation } = this.props;

        if (elevation) {
            this.setState({
                elevation: elevation[0]
            });
        }

        clearTimeout(this.timeout);

        this.setState({
            rippling: false,
            longPress: false
        });

        Animated.timing(this.state.scaleValue, {
            toValue: 0.001,
            duration: 0
        }).start();
    };

    _handleResponderEnd = () => {
        const { onPress } = this.props;
        const { longPress } = this.state;

        if (!longPress) {
            onPress && onPress();
        }
        this._unHighlight();
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