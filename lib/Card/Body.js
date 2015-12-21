import React, { Component, StyleSheet, PropTypes, View } from 'react-native';

import { COLOR } from '../config';


export default class Body extends Component {

    static propTypes = {
        theme: PropTypes.string,
        children: PropTypes.node.isRequired
    };

    render() {
        const { theme, children } = this.props;

        return (
            <View style={[styles.container, theme && { backgroundColor: COLOR[theme].color }]}>
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingBottom: 16
    }
});