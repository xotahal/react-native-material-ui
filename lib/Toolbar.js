import React, { Component, StyleSheet, PropTypes, View, Text } from 'react-native';
import { TYPO, PRIMARY, COLOR } from './config';
import Icon from './Icon';
import IconButton from './IconButton';

const typos = StyleSheet.create(TYPO);

export default class Toolbar extends Component {

    static propTypes = {
        title: PropTypes.string,
        titleColor: PropTypes.string,
        icon: PropTypes.string,
        iconColor: PropTypes.string,
        onIconClicked: PropTypes.func,
        theme: PropTypes.string,
        primary: PropTypes.string,
        actions: PropTypes.array,
        search: PropTypes.bool,
        searchIcon: PropTypes.string,
        history: PropTypes.array
    };

    static defaultProps = {
        theme: 'dark',
        primary: PRIMARY,
        search: false
    };

    render() {
        const { title, titleColor, icon, iconColor, onIconClicked, theme, primary, actions } = this.props;

        const themeMap = {
            light: {
                backgroundColor: '#ffffff',
                color: titleColor ? titleColor : 'rgba(0,0,0,.87)',
                iconColor: iconColor ? iconColor : 'rgba(0,0,0,.54)'
            },
            dark: {
                backgroundColor: COLOR[`${primary}500`].color,
                color: titleColor ? titleColor : 'rgba(255,255,255,.87)',
                iconColor: iconColor ? iconColor : 'rgba(255,255,255,.87)'
            }
        };

        const themeStyle = themeMap[theme];

        return (
            <View style={[styles.toolbar, { backgroundColor :themeStyle.backgroundColor }]}>
                {
                    icon && (
                        <IconButton onPress={onIconClicked}>
                            <Icon name={icon || 'menu'}
                                  size={24}
                                  color={themeStyle.iconColor}
                                  style={styles.icon}
                            />
                        </IconButton>
                    )
                }
                <Text
                    numberOfLines={1}
                    style={[styles.title, typos.paperFontTitle, {
                        color: themeStyle.color,
                        marginLeft: icon ? styles.title.marginLeft : 16
                    }]}
                >
                    {title}
                </Text>
                {
                    actions &&
                    actions.map(function(action) {
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
                                      color={themeStyle.iconColor}
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