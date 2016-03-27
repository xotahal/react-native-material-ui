import React, { Component, StyleSheet, PropTypes, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingBottom: 16
    }
});

export default class Body extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired
    };

    render() {
        const { children } = this.props;

        return (
            <View style={ styles.container }>
                {children}
            </View>
        );
    }
}
