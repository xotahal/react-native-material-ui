import { View } from 'react-native';
import React, { PureComponent, PropTypes } from 'react';

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
        actionsContainer: [
            dialog.actionsContainer,
            props.style.actionsContainer,
        ],
        actionsInnerContainer: [
            dialog.actionsInnerContainer,
            props.style.actionsInnerContainer,
        ],
    };
}

class DialogFooter extends PureComponent {
    render() {
        const { children } = this.props;

        const styles = getStyles(this.props, this.context);

        return (
            <View style={styles.actionsContainer}>
                <View style={styles.actionsInnerContainer}>
                    {children}
                </View>
            </View>
        );
    }

}

DialogFooter.propTypes = propTypes;
DialogFooter.defaultProps = defaultProps;
DialogFooter.contextTypes = contextTypes;

export default DialogFooter;
