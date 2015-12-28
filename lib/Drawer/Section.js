import React, { Component, PropTypes, View, Text, TouchableNativeFeedback } from 'react-native';
import Icon from '../Icon';
import { TYPO, THEME_NAME } from '../config';

export default class Section extends Component {

    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string,
            value: PropTypes.string.isRequired,
            label: PropTypes.string,
            onPress: PropTypes.func,
            onLongPress: PropTypes.func,
            active: PropTypes.bool,
            disabled: PropTypes.bool
        }))
    };

    render() {
        const { theme, title, items } = this.props;

        const textStyleMap = {
            light: 'rgba(0,0,0,.87)',
            dark: '#ffffff'
        };

        const subheaderStyleMap = {
            light: 'rgba(0,0,0,.54)',
            dark: 'rgba(255,255,255,.70)',
        };

        const TEXT_COLOR = textStyleMap[theme];
        const SUB_TEXT_COLOR = subheaderStyleMap[theme];

        return (
            <View style={styles.section}>
                {title &&
                    <View style={[styles.subheader, styles.item]}>
                        <Text style={[TYPO.paperFontBody2, { color: SUB_TEXT_COLOR }]}>
                            {title}
                        </Text>
                    </View>
                }
                {items && items.map((item, i) => {
                    return (
                        <TouchableNativeFeedback
                            key={i}
                            background={TouchableNativeFeedback.Ripple('rgba(153,153,153,.4)')}
                            onPress={item.onPress}
                            onLongPress={item.onLongPress}
                        >
                            <View style={styles.item}>
                                {item.icon &&
                                    <Icon
                                        name={item.icon}
                                        color={TEXT_COLOR}
                                        size={22}
                                        style={styles.icon}
                                    />
                                }
                                <View style={styles.value}>
                                    <Text style={[TYPO.paperFontBody2, { color: TEXT_COLOR }]}>
                                        {item.value}
                                    </Text>
                                </View>
                                {item.label &&
                                    <View style={styles.label}>
                                        <Text style={[TYPO.paperFontBody2, { color: TEXT_COLOR }]}>
                                            {item.label}
                                        </Text>
                                    </View>
                                }
                            </View>
                        </TouchableNativeFeedback>
                    );
                })}
            </View>
        );
    }
}

const styles = {
    section: {
        marginTop: 8
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        paddingLeft: 16
    },
    subheader: {
        flex: 1,
    },
    icon: {
        position: 'absolute',
        top: 13
    },
    value: {
        flex: 1,
        paddingLeft: 56,
        top: 2
    },
    label: {
        paddingRight: 16,
        top: 2
    }
};