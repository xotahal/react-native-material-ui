import { Dimensions, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import React, { Component, PropTypes } from 'react';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: window.height,
    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: window.width,
        height: window.height,
    },
});

export default class Overlay extends Component {

    static propTypes = {
        onPress: PropTypes.func,
    }

    render() {
        const { onPress } = this.props;

        return (
            <TouchableWithoutFeedback style={[styles.container]} onPress={onPress}>
                <View style={[styles.overlay, { top: 0, left: 0 }]} />
            </TouchableWithoutFeedback>
        );
    }
}
