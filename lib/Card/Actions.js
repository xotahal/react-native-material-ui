import React, { Component, StyleSheet, PropTypes, View } from 'react-native';

export default class Actions extends Component {

    static propTypes = {
        position: PropTypes.oneOf(['left', 'right']),
        children: PropTypes.node.isRequired
    };

    static defaultProps = {
        position: 'left'
    };

    render() {
        const { position, children } = this.props;

        return (
            <View style={styles.container}>
                <View style={[styles.actions, { alignSelf: position === 'left' ? 'flex-start' : 'flex-end' }]}>
                {children}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: -16,
        paddingLeft: -16
    },
    actions: {
        flexDirection: 'row'
    }
});
