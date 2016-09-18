import { View, Text, TouchableNativeFeedback, LayoutAnimation } from 'react-native';
import React, { Component, PropTypes } from 'react';
import Icon from '../Icon';
import IconToggle from '../IconToggle';

const propTypes = {
    /**
    * Array of names of icons that will be shown after the main button is pressed
    */
    actions: PropTypes.array,
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
    * Leave it empty if you don't want any transition after press. Otherwise, it will be trnasform
    * to another view - depends on transition value.
    */
    transition: PropTypes.oneOf(['toolbar', 'speedDial']),
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
        toolbarContainer: [
            actionButton.toolbarContainer,
            local.toolbarContainer,
            props.style.toolbarContainer,
        ],
        toolbarActionContainer: [
            actionButton.toolbarActionContainer,
            local.toolbarActionContainer,
            props.style.toolbarActionContainer,
        ],
        speedDialContainer: [
            actionButton.speedDialContainer,
            local.speedDialContainer,
            props.style.speedDialContainer,
        ],
        speedDialActionContainer: [
            actionButton.speedDialActionContainer,
            local.speedDialActionContainer,
            props.style.speedDialActionContainer,
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

        this.state = {
            render: 'button',
            elevation: 2,
        };
    }
    componentWillUpdate(nextProps, nextState) {
        if (this.state.render !== nextState.render) {
            LayoutAnimation.easeInEaseOut();
        }
    }
    onPress = (action) => {
        const { onPress, transition } = this.props;

        if (this.state.render === 'button') {
            if (transition) {
                this.setState({ render: transition });
            }
        } else {
            this.setState({ render: 'button' });
        }

        if (onPress) {
            onPress(action);
        }
    }
    renderToolbarTransition = (styles) => {
        const { actions } = this.props;

        return (
            <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                <View key="main-button" style={styles.toolbarContainer}>
                    {actions.map(action => (
                        <View key={action} style={styles.toolbarActionContainer}>
                            <IconToggle
                                key={action}
                                name={action}
                                onPress={() => this.onPress(action)}
                                style={{ icon: styles.icon }}
                            />
                        </View>
                    ))}
                </View>
            </View>
        );
    }
    renderSpeedDialTransition = (styles) => {
        const { actions } = this.props;

        return (
            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <View style={styles.speedDialContainer}>
                    {actions.map(action => (
                        <View key={action} style={styles.speedDialActionContainer}>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('#AAF', true)}
                                onPress={() => this.onPress(action)}
                                delayPressIn={20}
                            >
                                {this.renderIconButton(styles, action)}
                            </TouchableNativeFeedback>
                        </View>
                    ))}
                </View>
                {this.renderMainButton(styles)}
            </View>
        );
    }
    renderMainButton = (styles) => {
        const { onLongPress, icon } = this.props;

        return (
            <View key="main-button" style={styles.container}>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('#AAF', true)}
                    onPress={() => this.onPress('main-button')}
                    onLongPress={onLongPress}
                    onPressIn={() => this.setState({ elevation: 4 })}
                    onPressOut={() => this.setState({ elevation: 2 })}
                    delayPressIn={20}
                >
                    {this.renderIconButton(styles, icon)}
                </TouchableNativeFeedback>
            </View>
        );
    }
    renderIconButton = (styles, name) => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={name} style={styles.icon} />
        </View>
    )
    renderButton = (styles) => (
        <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
            {this.renderMainButton(styles)}
        </View>
    );
    render() {
        const { render } = this.state;

        const styles = getStyles(this.props, this.context, this.state);

        if (render === 'toolbar') {
            return this.renderToolbarTransition(styles);
        } else if (render === 'speedDial') {
            return this.renderSpeedDialTransition(styles);
        }

        return this.renderButton(styles);
    }
}

ActionButton.propTypes = propTypes;
ActionButton.defaultProps = defaultProps;
ActionButton.contextTypes = contextTypes;

export default ActionButton;
