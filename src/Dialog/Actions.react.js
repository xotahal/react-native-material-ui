/* eslint-disable import/no-unresolved, import/extensions */
import { View } from 'react-native';
import React, { PureComponent, PropTypes } from 'react';
/* eslint-enable import/no-unresolved, import/extensions */

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
    };
}

class DialogFooter extends PureComponent {
    render() {
        const { children } = this.props;

        const styles = getStyles(this.props, this.context);

        return (
            <View style={styles.actionsContainer}>
                {children}
            </View>
        );
    }

}

DialogFooter.propTypes = propTypes;
DialogFooter.defaultProps = defaultProps;
DialogFooter.contextTypes = contextTypes;

export default DialogFooter;
