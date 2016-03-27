import React, { Animated, Dimensions, PropTypes, Text, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';

export default class Overlay extends React.Component {

    render() {
        const { onPress } = this.props;

        return (
            <TouchableWithoutFeedback style={[styles.container]} onPress={onPress}>
                <View style={[styles.overlay, { top: 0, left: 0 }]} />
            </TouchableWithoutFeedback>
        );

    }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: window.height
    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: window.width,
        height: window.height
    }
});
