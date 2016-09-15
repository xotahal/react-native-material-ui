import { View, Text, TouchableNativeFeedback } from 'react-native';
import React, { Component, PropTypes } from 'react';
import Icon from '../Icon';

const propTypes = {
    /**
    * Called when button is pressed. Text is passed as param
    */
    onPress: PropTypes.func,
    /**
    * Called when button is long pressed. Text is passed as param
    */
    onLongPress: PropTypes.func,
    /**
    * If specified it'll be shown before text
    */
    icon: PropTypes.string,
    /**
    * You can overide any style for this button
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
        icon: Text.propTypes.style,
    }),
};
const defaultProps = {
    icon: 'add',
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context, state) {
    const { actionButton } = context.uiTheme;
    const { size } = props;

    const local = {
        container: {},
    };

    if (size) {
        local.container = {
            height: size,
            width: size,
            borderRadius: size / 2,
        };
    }

    local.container.elevation = state.elevation;

    return {
        container: [
            actionButton.container,
            local.container,
            props.style.container,
        ],
        icon: [
            actionButton.icon,
            local.icon,
            props.style.icon,
        ],
    };
}

class ActionButton extends Component {
    constructor(props) {
        super(props);

        this.state = { elevation: 2 };
    }
    onPress = () => {
        const { onPress } = this.props;

        if (onPress) {
            onPress();
        }
    }
    render() {
        const { icon, onPress, onLongPress } = this.props;

        const styles = getStyles(this.props, this.context, this.state);

        return (
            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <View style={styles.container}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('#AAF', true)}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        onPressIn={() => this.setState({ elevation: 4 })}
                        onPressOut={() => this.setState({ elevation: 2 })}
                        delayPressIn={20}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name={icon} size={24} style={styles.icon} />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}

ActionButton.propTypes = propTypes;
ActionButton.defaultProps = defaultProps;
ActionButton.contextTypes = contextTypes;

export default ActionButton;
