import React, { Component, StyleSheet, PropTypes, Image, View, Animated } from 'react-native';

import { COLOR } from '../config';


export default class Body extends Component {

    static propTypes = {
        theme: PropTypes.string,
        children: PropTypes.node.isRequired
    };

    render() {
        const { theme, children } = this.props;

        return (
            <View style={Object.assign(styles.body, theme && { backgroundColor: COLOR[theme].color })}>
                {children}
            </View>
        );
    }
}

const styles = {
    body: {
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 16,
        paddingRight: 16
    }
};