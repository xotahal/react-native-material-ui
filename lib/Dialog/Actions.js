import React, { Component, View, Text } from 'react-native';

const defaultStyles = {
    dialogContainer: {
        height: 56,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    innerContainer: {
        margin: 8,
    }
};

export default class DialogFooter extends Component {
    render() {
        const { children } = this.props;

        return (
            <View style={defaultStyles.dialogContainer}>
                <View style={defaultStyles.innerContainer}>
                    {children}
                </View>
            </View>
        );
    }

}
