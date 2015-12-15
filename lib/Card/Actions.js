import React, { Component, StyleSheet, PropTypes, Image, View, Animated } from 'react-native';

export default class Actions extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired
    };

    render() {
        const { theme, children } = this.props;

        return (
            <View style={ styles.actions }>
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        position: 'relative',
        left: -16,
        right: -16,
    }
});