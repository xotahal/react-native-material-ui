import React, { Component, StyleSheet, PropTypes, Text, View, Animated } from 'react-native';
import { TYPO, PRIMARY, COLOR, COLOR_NAME, THEME_NAME} from './config';
import Icon from './Icon';

const typos = StyleSheet.create(TYPO);

export default class Checkbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0.001),
            opacityValue: new Animated.Value(0.1)
        };
        this._responder = {
            onStartShouldSetResponder: (e) => true,
            onResponderGrant: this._highlight,
            onResponderRelease: this._handleResponderEnd,
            onResponderTerminate: this._unHighlight
        };
    }

    static defaultProps = {
        theme: 'light',
        primary: PRIMARY
    };

    static propTypes = {
        label: PropTypes.string,
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(COLOR_NAME),
        value: PropTypes.string.isRequired,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        onCheck: PropTypes.func
    };

    render() {
        const { scaleValue, opacityValue } = this.state;
        const { theme, primary, checked, disabled, value } = this.props;

        let status = (()=> {
            if (disabled) {
                return 'disabled'
            } else if (checked) {
                return 'checked'
            } else {
                return 'default'
            }
        })();

        let colorMap = {
            light: {
                disabled: '#000',
                checked: COLOR[`${primary}500`].color,
                default: '#000'
            },
            dark: {
                disabled: '#fff',
                checked: COLOR[`${primary}500`].color,
                default: '#fff'
            }
        };

        let opacityMap = {
            light: {
                checked: 1,
                default: 0.54,
                disabled: 0.26
            },
            dark: {
                checked: 1,
                default: 0.7,
                disabled: 0.3
            }
        };

        let labelColorMap = {
            light: '#000000',
            dark: '#ffffff'
        };

        const CURR_COLOR = colorMap[theme][status];
        const OPACITY = opacityMap[theme][status];
        const LABEL_COLOR = labelColorMap[theme];

        return (
            <View
                style={[
                    styles.container
                ]}
                {...this._responder}
            >
                <Animated.View
                    style={[styles.ripple, {
                        transform: [{ scale: scaleValue }],
                        opacity: opacityValue,
                        backgroundColor: CURR_COLOR
                    }]}
                />
                <Animated.View>
                    <Icon name={checked ? 'check-box' : 'check-box-outline-blank'}
                          size={24}
                          color={CURR_COLOR}
                          key={value}
                          style={{
                              opacity: OPACITY,
                              margin: 16,
                              position: 'relative',
                              top: -10
                          }}
                    />
                </Animated.View>
                <View style={styles.labelContainer}>
                    <Text
                        style={[
                            typos.paperFontBody1,
                            styles.label,
                            COLOR[`${theme}PrimaryOpacity`],
                            disabled && COLOR[`${theme}DisabledOpacity`], {
                                color: LABEL_COLOR
                            }
                        ]}
                    >
                        {this.props.label}
                    </Text>
                </View>
            </View>
        );
    };

    /**
     *
     * @private
     */
    _highlight = () => {
        Animated.timing(this.state.scaleValue, {
            toValue: 1,
            duration: 150
        }).start();
        Animated.timing(this.state.opacityValue, {
            toValue: .1,
            duration: 100
        }).start()
    };

    /**
     *
     * @private
     */
    _unHighlight = () => {
        Animated.timing(this.state.scaleValue, {
            toValue: 0.001,
            duration: 1500
        }).start();
        Animated.timing(this.state.opacityValue, {
            toValue: 0
        }).start();
    };

    /**
     *
     * @private
     */
    _handleResponderEnd = () => {
        this._unHighlight();
        let { checked, disabled } = this.props;

        if (!disabled) {
            this.props.onCheck && this.props.onCheck(!checked, this.props.value);
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    ripple: {
        position: 'absolute',
        width: 48,
        height: 48,
        backgroundColor: '#000',
        borderRadius: 56,
        top: 4,
        left: 4
    },
    label: {
        marginLeft: 16,
        opacity: COLOR.darkPrimaryOpacity.opacity,
        flex: 1,
        top: -5
    }
});