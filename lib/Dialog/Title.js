import { View, Text } from 'react-native';
import React, { Component, PropTypes } from 'react';

const propTypes = {
    children: PropTypes.node.isRequired,
};

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

class DialogHeader extends Component {
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

DialogHeader.propTypes = propTypes;

export default DialogHeader;
