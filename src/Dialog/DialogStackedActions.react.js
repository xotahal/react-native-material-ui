/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent, PropTypes } from 'react';
import { View } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
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
        stackedActionsContainer: [
            dialog.stackedActionsContainer,
            props.style.stackedActionsContainer,
        ],
    };
}

class DialogStackedActions extends PureComponent {
    render() {
        const { actions, onActionPress } = this.props;

        const styles = getStyles(this.props, this.context);

        return (
            <View style={styles.stackedActionsContainer}>
                {actions.map(action =>
                    <Button
                        key={action}
                        primary
                        text={action}
                        onPress={onActionPress}
                        style={{
                            container: {
                                justifyContent: 'flex-end',
                            },
                        }}
                    />
                )}
            </View>
        );
    }
}

DialogStackedActions.propTypes = propTypes;
DialogStackedActions.defaultProps = defaultProps;
DialogStackedActions.contextTypes = contextTypes;

export default DialogStackedActions;
