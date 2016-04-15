import React, { Component, View, PropTypes } from 'react-native';

const propTypes = {
    children: PropTypes.node.isRequired,
};

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

class DialogFooter extends Component {
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

DialogFooter.propTypes = propTypes;

export default DialogFooter;
