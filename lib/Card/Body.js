import { StyleSheet, View } from 'react-native';
import React, { Component, PropTypes } from 'react';

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingBottom: 16,
    },
});

export default class Body extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        const { children } = this.props;

        return (
            <View style={styles.container}>
                {children}
            </View>
        );
    }
}
