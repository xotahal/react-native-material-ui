/* eslint-disable import/no-unresolved, import/extensions */
import { View, Text, StyleSheet } from 'react-native';
import React, { PureComponent, PropTypes } from 'react';
/* eslint-enable import/no-unresolved, import/extensions */
import Icon from '../Icon';
import RippleFeedback from '../RippleFeedback';
import getPlatformElevation from '../styles/getPlatformElevation';

const propTypes = {
    /**
    * If true button will be disabled
    */
    disabled: PropTypes.bool,
    /**
    * If true button will be raised
    */
    raised: PropTypes.bool,
    /**
    * Called when button is pressed. Text is passed as param
    */
    onPress: PropTypes.func,
    /**
    * Called when button is long pressed. Text is passed as param
    */
    onLongPress: PropTypes.func,
    /**
    * Text will be shown on button
    */
    text: PropTypes.string.isRequired,
    /**
    * Button text will be in uppercase letters
    */
    upperCase: PropTypes.bool,
    /**
    * If specified it'll be shown before text
    */
    icon: PropTypes.string,
    /**
    * You can overide any style for this button
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
        text: Text.propTypes.style,
    }),
};
const defaultProps = {
    primary: false,
    accent: false,
    disabled: false,
    raised: false,
    upperCase: true,
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

    if (raised) {
        local.container = {
            ...local.container,
            ...getPlatformElevation(state.elevation),
        };
    }

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

class Button extends PureComponent {
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
        const { text, disabled, raised, upperCase, onLongPress } = this.props;

        const styles = getStyles(this.props, this.context, this.state);

        const content = (
            <View style={styles.container}>
                {this.renderIcon(styles)}
                <Text style={styles.text}>
                    {upperCase ? text.toUpperCase() : text}
                </Text>
            </View>
        );

        if (disabled) {
            return content;
        }

        return (
            <RippleFeedback
                onPress={!disabled ? this.onPress : null}
                onLongPress={!disabled ? onLongPress : null}
                onPressIn={raised ? this.setElevation : null}
                onPressOut={raised ? this.removeElevation : null}
                delayPressIn={50}
            >
                {content}
            </RippleFeedback>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.contextTypes = contextTypes;

export default Button;
