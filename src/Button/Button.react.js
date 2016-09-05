import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import React, { Component, PropTypes } from 'react';
import Icon from '../Icon';

const propTypes = {
    disabled: PropTypes.bool,
    raised: PropTypes.bool,

    onPress: PropTypes.func,
    onLongPress: PropTypes.func,

    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
};
const defaultProps = {
    primary: false,
    accent: false,
    disabled: false,
    raised: false,
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context, state) {
    const { button, buttonFlat, buttonDisabled, buttonRaised } = context.uiTheme;
    const { primary, accent, disabled, raised } = props;
    const { palette } = context.uiTheme;

    const local = {
        container: {},
    };

    if (primary && !raised) {
        local.text = { color: palette.primaryColor };
    } else if (accent && !raised) {
        local.text = { color: palette.accentColor };
    }

    if (primary && raised) {
        local.container.backgroundColor = palette.primaryColor;
        local.text = { color: palette.canvasColor };
    } else if (accent && raised) {
        local.container.backgroundColor = palette.accentColor;
        local.text = { color: palette.canvasColor };
    }

    local.container.elevation = raised ? state.elevation : null;

    return {
        container: [
            button.container,
            !raised && buttonFlat.container,
            disabled && buttonDisabled.container,
            raised && buttonRaised.container,
            local.container,
            props.style.container,
        ],
        text: [
            button.text,
            !raised && buttonFlat.text,
            disabled && buttonDisabled.text,
            raised && buttonRaised.text,
            local.text,
            props.style.text,
        ],
    };
}

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elevation: 2,
        };
    }
    onPress = () => {
        const { text, onPress } = this.props;

        if (onPress) {
            onPress(text);
        }
    }
    setElevation = () => {
        this.setState({
            elevation: 4,
        });
    };

    removeElevation = () => {
        this.setState({
            elevation: 2,
        });
    };
    renderIcon = (styles) => {
        const { icon } = this.props;
        const textFlatten = StyleSheet.flatten(styles.text);

        if (!icon) {
            return null;
        }


        return (
            <Icon
                name={icon}
                color={textFlatten.color}
                style={{ marginRight: 8 }}
                size={24}
            />
        );
    }
    render() {
        const { text, disabled, raised, onLongPress } = this.props;

        const styles = getStyles(this.props, this.context, this.state);

        const content = (
            <View style={styles.container}>
                {this.renderIcon(styles)}
                <Text style={styles.text}>
                    {text.toUpperCase()}
                </Text>
            </View>
        );

        if (disabled) {
            return content;
        }

        return (
            <TouchableNativeFeedback
                onPress={!disabled ? this.onPress : null}
                onLongPress={!disabled ? onLongPress : null}
                onPressIn={raised ? this.setElevation : null}
                onPressOut={raised ? this.removeElevation : null}
                delayPressIn={50}
            >
                {content}
            </TouchableNativeFeedback>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.contextTypes = contextTypes;

export default Button;
