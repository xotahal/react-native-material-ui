import React, { Animated, PropTypes, Text, TouchableNativeFeedback, View, StyleSheet } from 'react-native';

export default class MenuItem extends React.Component {

    static propTypes = {
    };


    _onPressed = () => {
        const { closeMenu, onPress, value } = this.props;
        closeMenu();

        if(onPress){
            onPress(value);
        }
    };

    render() {
        const { label } = this.props;

        return (
            <TouchableNativeFeedback onPress={() => this._onPressed()}>
                <View style={styles.itemContainer} >
                    <Text style={styles.itemText}>{label}</Text>
                </View>
            </TouchableNativeFeedback>
        );

    }
}

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
