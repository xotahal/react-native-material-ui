/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import Button from '../Button';
import { ViewPropTypes } from '../utils';

const propTypes = {
    actions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onActionPress: PropTypes.func.isRequired,
    style: PropTypes.shape({
        defaultActionsContainer: ViewPropTypes.style,
    }),
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

class DialogDefaultActions extends PureComponent {
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
                {actions.map(action => (
                    <Button
                        key={action}
                        primary
                        text={action}
                        onPress={this.onActionPressed}
                        style={{
                            container: {
                                marginLeft: 8,
                                paddingHorizontal: 8,
                            },
                        }}
                    />
                ))}
            </View>
        );
    }
}

DialogDefaultActions.propTypes = propTypes;
DialogDefaultActions.defaultProps = defaultProps;
DialogDefaultActions.contextTypes = contextTypes;

export default DialogDefaultActions;
