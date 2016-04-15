import React, { Component, View, Text } from 'react-native';

const defaultStyles = {
    dialogContainer: {
        backgroundColor: '#ffffff',
        paddingBottom: 24,
    }
};

export default class DialogContent extends Component {
    render() {
        const { children } = this.props;

        return (
            <View style={defaultStyles.dialogContainer}>
                {children}
            </View>
        );
    }

}
