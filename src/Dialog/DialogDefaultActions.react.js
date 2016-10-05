import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import Button from '../Button';

const propTypes = {
    actions: PropTypes.array.isRequired,
    onActionPress: PropTypes.func.isRequired,
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
        defaultActionsContainer: [
            dialog.defaultActionsContainer,
            props.style.defaultActionsContainer,
        ],
    };
}

class DialogDefaultActions extends Component {
    constructor(props) {
        super(props);

        this.onActionPressed = this.onActionPressed.bind(this);
    }
    onActionPressed(action) {
        const { onActionPress } = this.props;

        if (onActionPress) {
            onActionPress(action);
        }
    }
    render() {
        const { actions } = this.props;

        const styles = getStyles(this.props, this.context);

        return (
            <View style={styles.defaultActionsContainer}>
                {actions.map(action =>
                    <View key={action} style={{ marginLeft: 8 }}>
                        <Button
                            primary
                            text={action}
                            onPress={this.onActionPressed}
                        />
                    </View>
                )}
            </View>
        );
    }
}

DialogDefaultActions.propTypes = propTypes;
DialogDefaultActions.defaultProps = defaultProps;
DialogDefaultActions.contextTypes = contextTypes;

export default DialogDefaultActions;
