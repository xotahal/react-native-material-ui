import React, { Component, PropTypes, Text } from 'react-native';
import { TYPO, PRIMARY, COLOR, THEME_NAME, COLOR_NAME } from './config';
import Ripple from './Ripple';

export default class Button extends Component {

    static propTypes = {
        value: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(COLOR_NAME),
        raised: PropTypes.bool,
        onPress: PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        theme: 'light',
        primary: PRIMARY,
        raised: false
    };

    render() {
        const { value, disabled, theme, primary, raised, onPress } = this.props;

        this.textStyleMap = {
            flat: {
                light: {
                    normal: {
                        color: COLOR[`${primary}500`].color
                    },
                    disabled: {
                        color: 'rgba(0,0,0,.26)'
                    }
                },
                dark: {
                    normal: {
                        color: COLOR[`${primary}500`].color
                    },
                    disabled: {
                        color: 'rgba(255,255,255,.3)'
                    }
                }
            },
            raised: {
                light: {
                    normal: {
                        color: COLOR[`${primary}500`].color
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

        this.buttonStyleMap = {
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
                        backgroundColor: COLOR[`${primary}500`].color,
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

        this.rippleColorMap = {
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
                    normal: COLOR[`${primary}700`].color,
                    disabled: 'rgba(255,255,255,.06)'
                }
            }
        };

        const type = disabled ? 'disabled' : 'normal';
        const shape = raised ? 'raised' : 'flat';

        const textStyle = this.textStyleMap[shape][theme][type];
        const buttonStyle = raised ? this.buttonStyleMap[shape][theme][type] : null;

        const rippleColor = this.rippleColorMap[shape][theme][type];

        return (
            <Ripple
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
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
        margin: 4,
        borderRadius: 2
    }
};