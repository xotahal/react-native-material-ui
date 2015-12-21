import React, { Component, PropTypes, Text } from 'react-native';
import { TYPO, PRIMARY, THEME_NAME, PRIMARY_COLORS } from './config';
import { getColor } from './helpers';
import Ripple from './Ripple';

export default class Button extends Component {

    static propTypes = {
        value: PropTypes.string.isRequired,
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(PRIMARY_COLORS),
        overrides: PropTypes.shape({
            textColor: PropTypes.string,
            backgroundColor: PropTypes.string,
            rippleColor: PropTypes.string
        }),
        disabled: PropTypes.bool,
        raised: PropTypes.bool,
        onPress: PropTypes.func
    };

    static defaultProps = {
        theme: 'light',
        primary: PRIMARY,
        disabled: false,
        raised: false
    };

    render() {
        const { value, theme, primary, overrides, disabled, raised, onPress } = this.props;

        const textStyleMap = {
            flat: {
                light: {
                    normal: {
                        color: getColor(primary)
                    },
                    disabled: {
                        color: 'rgba(0,0,0,.26)'
                    }
                },
                dark: {
                    normal: {
                        color: getColor(primary)
                    },
                    disabled: {
                        color: 'rgba(255,255,255,.3)'
                    }
                }
            },
            raised: {
                light: {
                    normal: {
                        color: getColor(primary)
                    },
                    disabled: {
                        color: 'rgba(0,0,0,.26)'
                    }
                },
                dark: {
                    normal: {
                        color: '#fff'
                    },
                    disabled: {
                        color: 'rgba(255,255,255,.3)'
                    }
                }
            }
        };

         const buttonStyleMap = {
            raised: {
                light: {
                    normal: {
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        borderColor: 'rgba(0,0,0,.12)',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(0,0,0,.12)'
                    },
                    disabled: {
                        backgroundColor: 'rgba(0,0,0,.12)',
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,.12)'
                    }
                },
                dark: {
                    normal: {
                        backgroundColor: getColor(primary),
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,.12)'
                    },
                    disabled: {
                        backgroundColor: 'rgba(255,255,255,.12)',
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,.12)'
                    }
                }
            }
        };

        const rippleColorMap = {
            flat: {
                light: {
                    normal: 'rgba(153,153,153,.4)',
                    disabled: 'rgba(0,0,0,0.06)'
                },
                dark: {
                    normal: 'rgba(204,204,204,.25)',
                    disabled: 'rgba(255,255,255,0.06)'
                }
            },
            raised: {
                light: {
                    normal: 'rgba(153,153,153,.4)',
                    disabled: 'rgba(0,0,0,.06)'
                },
                dark: {
                    normal: getColor(`${primary}700`),
                    disabled: 'rgba(255,255,255,.06)'
                }
            }
        };

        const type = disabled ? 'disabled' : 'normal';
        const shape = raised ? 'raised' : 'flat';

        const textStyle = (() => {
            if (disabled || !(overrides && overrides.textColor)) {
                return textStyleMap[shape][theme][type];
            }

            return { color: getColor(overrides.textColor) };
        })();

        const buttonStyle = (() => {
            if (raised) {
                if (disabled || !(overrides && overrides.backgroundColor)) {
                    return buttonStyleMap[shape][theme][type];
                }

                return Object.assign(buttonStyleMap[shape][theme][type], { backgroundColor: getColor(overrides.backgroundColor) });
            }

            return null;
        })();

        const rippleColor = (() => {
            if (disabled || !(overrides && overrides.rippleColor)) {
                return rippleColorMap[shape][theme][type];
            }

            return getColor(overrides.rippleColor)
        })();

        return (
            <Ripple
                disabled={disabled}
                color={rippleColor}
                rippleOpacity={1}
                onPress={!disabled ? onPress : null}
                style={Object.assign({}, styles.button, buttonStyle, { backgroundColor: buttonStyle && buttonStyle.backgroundColor })}
            >
                <Text style={[TYPO.paperFontButton, textStyle]}>
                    {value}
                </Text>
            </Ripple>
        );
    };
}

const styles = {
    button: {
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 16,
        margin: 6,
        borderRadius: 2
    }
};