import React, { Component, View, Text } from 'react-native';

const defaultStyles = {
    dialogContainer: {
        backgroundColor: '#ffffff',
        paddingBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    }
};

export default class DialogHeader extends Component {
    render() {
        const { children } = this.props;
        return (
            <View style={defaultStyles.dialogContainer}>
                <Text style={defaultStyles.title}>
                    {children}
                </Text>
            </View>
        );
    }

}
