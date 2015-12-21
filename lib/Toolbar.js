import React, { Component, PropTypes, View, Text } from 'react-native';
import { TYPO, PRIMARY, THEME_NAME, PRIMARY_COLORS } from './config';
import { getColor } from './helpers';
import Icon from './Icon';
import IconButton from './IconButton';

export default class Toolbar extends Component {

    static propTypes = {
        title: PropTypes.string,
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(PRIMARY_COLORS),
        style: PropTypes.object,
        overrides: PropTypes.shape({
            backgroundColor: PropTypes.string,
            titleColor: PropTypes.string,
            iconColor: PropTypes.string
        }),
        icon: PropTypes.string,
        onIconPress: PropTypes.func,
        actions: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string.isRequired,
            onPress: PropTypes.func,
            counter: PropTypes.number,
            counterBackgroundColor: PropTypes.string,
            counterTextColor: PropTypes.string
        }))
    };

    static defaultProps = {
        theme: 'dark',
        primary: PRIMARY
    };

    render() {
        const { title, theme, primary, style, overrides, icon, onIconPress, actions } = this.props;

        const themeMap = {
            light: {
                backgroundColor: '#ffffff',
                color: 'rgba(0,0,0,.87)',
                iconColor: 'rgba(0,0,0,.54)'
            },
            dark: {
                backgroundColor: getColor(primary),
                color: 'rgba(255,255,255,.87)',
                iconColor: 'rgba(255,255,255,.87)'
            }
        };

        const styleMap = {
            backgroundColor: overrides && overrides.backgroundColor ? getColor(overrides.backgroundColor) : themeMap[theme].backgroundColor,
            color: overrides && overrides.color ? getColor(overrides.color) : themeMap[theme].color,
            iconColor: overrides && overrides.iconColor ? getColor(overrides.iconColor) : themeMap[theme].iconColor,
        };

        return (
            <View style={[styles.toolbar, { backgroundColor :styleMap.backgroundColor }, style]}>
                {
                    icon && (
                        <IconButton onPress={onIconPress}>
                            <Icon name={icon || 'menu'}
                                  size={24}
                                  color={styleMap.iconColor}
                                  style={styles.icon}
                            />
                        </IconButton>
                    )
                }
                <Text
                    numberOfLines={1}
                    style={[styles.title, TYPO.paperFontTitle, {
                        color: styleMap.color,
                        marginLeft: icon ? styles.title.marginLeft : 16
                    }]}
                >
                    {title}
                </Text>
                {
                    actions &&
                    actions.map(function (action) {
                        return (
                            <IconButton
                                key={action.icon}
                                onPress={action.onPress}
                                counter={action.counter}
                                counterBackgroundColor={action.counterBackgroundColor}
                                counterTextColor={action.counterTextColor}
                            >
                                <Icon name={action.icon}
                                      size={24}
                                      color={styleMap.iconColor}
                                      style={styles.icon}
                                />
                            </IconButton>
                        );
                    })
                }
            </View>
        );
    }
}

const styles = {
    toolbar: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        flex: 1,
        marginLeft: 16
    },
    icon: {
        margin: 16,
        position: 'relative',
        top: -5
    }
};