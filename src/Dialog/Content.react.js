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
        contentContainer: [
            dialog.contentContainer,
            props.style.contentContainer,
        ],
    };
}

class DialogContent extends PureComponent {
    render() {
        const { children } = this.props;

        const styles = getStyles(this.props, this.context);

        return (
            <View style={styles.contentContainer}>
                {children}
            </View>
        );
    }

}

DialogContent.propTypes = propTypes;
DialogContent.defaultProps = defaultProps;
DialogContent.contextTypes = contextTypes;

export default DialogContent;
