import { Text, TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import React, { Component, PropTypes } from 'react';

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        height: 48,
        paddingLeft: 16,
        paddingRight: 16
    },
    itemText: {
        fontSize: 16
    }
});

export default class MenuItem extends Component {

    static propTypes = {
        closeMenu: PropTypes.func,
        label: PropTypes.string,
        onPress: PropTypes.func,
        value: PropTypes.object
    };


    _onPressed = () => {
        const { closeMenu, onPress, value } = this.props;
        closeMenu();

        if (onPress) {
            onPress(value);
        }
    };

    render() {
        const { label } = this.props;

        return (
            <TouchableNativeFeedback onPress={this._onPressed}>
                <View style={styles.itemContainer} >
                    <Text style={styles.itemText}>{label}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
