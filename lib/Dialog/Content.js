import { View } from 'react-native';
import React, { Component, PropTypes } from 'react';

const propTypes = {
    children: PropTypes.node.isRequired,
};

const defaultStyles = {
    dialogContainer: {
        backgroundColor: '#ffffff',
        paddingBottom: 24,
    }
};

class DialogContent extends Component {
    render() {
        const { children } = this.props;

        return (
            <View style={defaultStyles.dialogContainer}>
                {children}
            </View>
        );
    }

}

DialogContent.propTypes = propTypes;

export default DialogContent;
