import React, { Component, PropTypes, View, Text, TouchableHighlight } from 'react-native';
import Icon from '../Icon';
import { TYPO } from '../config';

export default class Item extends Component {

    static propTypes = {
        icon: PropTypes.string,
        value: PropTypes.string.isRequired,
        onPress: PropTypes.func,
        active: PropTypes.bool,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        active: false,
        disabled: false
    };

    render() {
        const { icon, value, onPress } = this.props;

        return (
            <TouchableHighlight
                onPress={onPress}
                underlayColor={'#e8e8e8'}
                style={styles.touchable}
            >
                <View style={styles.item}>
                    <Icon
                        name={icon}
                        color={'rgba(0,0,0,.54)'}
                        size={22}
                        style={styles.icon}
                    />
                    <View style={styles.value}>
                        <Text style={[TYPO.paperFontBody2, { color: 'rgba(0,0,0,.87)' }]}>
                            {value}
                        </Text>

                    </View>
                </View>
            </TouchableHighlight>

        );
    }
}

const styles = {
    touchable: {
        paddingHorizontal: 16,
        marginVertical: 8,
        height: 48
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        position: 'relative',
        top: -7
    },
    value: {
        flex: 1,
        paddingLeft: 34
    }
};