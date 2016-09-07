import { View, Text } from 'react-native';
import React, { Component, PropTypes } from 'react';


const propTypes = {
    children: PropTypes.node.isRequired,
};
const defaultProps = {
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { dialog } = context.uiTheme;

    return {
        titleContainer: [
            dialog.titleContainer,
            props.style.titleContainer,
        ],
        titleText: [
            dialog.titleText,
            props.style.titleText,
        ],
    };
}

class DialogHeader extends Component {
    render() {
        const { children } = this.props;

        const styles = getStyles(this.props, this.context);

        return (
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    {children}
                </Text>
            </View>
        );
    }

}

DialogHeader.propTypes = propTypes;
DialogHeader.defaultProps = defaultProps;
DialogHeader.contextTypes = contextTypes;

export default DialogHeader;
