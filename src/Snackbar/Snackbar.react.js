/* eslint-disable import/no-unresolved, import/extensions */
import React, { PropTypes, PureComponent } from 'react';
import { View, Text, Animated, Easing, Platform, StyleSheet } from 'react-native';

import Button from '../Button';

const propTypes = {
    /**
    * The text message to display.
    */
    message: PropTypes.string.isRequired,
    /**
    * Whether or not the snackbar is visible.
    */
    visible: PropTypes.bool.isRequired,
    /**
    * The amount of time in milliseconds to show the snackbar.
    */
    timeout: PropTypes.number.isRequired,
    /**
    * Callback for when the timeout finishes.
    */
    onRequestClose: PropTypes.func.isRequired,
    /**
    * Whether or not there is a bottom navigation on the screen.
    */
    bottomNavigation: PropTypes.bool.isRequired,
    /**
    * The function to execute when the action is clicked.
    */
    actionHandler: PropTypes.func,
    /**
    * The function to execute when the action is clicked.
    */
    actionText: PropTypes.string,
    /**
    * Inline style of snackbar
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
    }),
};
const defaultProps = {
    visible: false,
    timeout: 2750,
    bottomNavigation: false,
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { snackbar } = context.uiTheme;
    const local = {};

    return {
        container: [
            snackbar.container,
            local.container,
            props.style.container,
        ],
        message: [
            snackbar.message,
            local.message,
            props.style.message,
        ],
        action: {
            ...snackbar.action,
            ...local.action,
            ...props.style.action,
        },
    };
}

/**
* Component for snackbars
* https://material.io/guidelines/components/snackbars-toasts.html
*/
class Snackbar extends PureComponent {
    constructor(props, context) {
        super(props, context);
        const styles = getStyles(props, context);
        this.state = {
            styles,
            moveAnimated: new Animated.Value(StyleSheet.flatten(styles.container).height),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.props.visible) {
            if (nextProps.visible === true) {
                this.show();
                this.setHideTimer();
            } else {
                this.hide();
            }
        }
    }

    setHideTimer() {
        const { timeout, onRequestClose } = this.props;

        if (timeout > 0) {
            clearTimeout(this.hideTimer);
            this.hideTimer = setTimeout(() => {
                onRequestClose();
            }, timeout);
        }
    }

    show = () => {
        const { bottomNavigation } = this.props;
        let toValue = 0;
        if (bottomNavigation) {
            // TODO: Get bottom navigation height from context.
            toValue = -56;
        }

        Animated.timing(this.state.moveAnimated, {
            toValue,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }

    hide = () => {
        const { moveAnimated, styles } = this.state;
        Animated.timing(moveAnimated, {
            toValue: (StyleSheet.flatten(styles.container).height),
            duration: 195,
            easing: Easing.bezier(0.4, 0.0, 0.6, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }

    renderAction = () => {
        const { actionText, actionHandler } = this.props;
        const { styles } = this.state;

        if (actionText && (typeof actionHandler === 'function')) {
            return (
                <Button
                    style={styles.action}
                    text={actionText}
                    onPress={actionHandler}
                    primary
                />
            );
        }
        return null;
    }

    render() {
        const { message } = this.props;
        const { styles, moveAnimated } = this.state;

        return (
            <Animated.View
                style={[styles.container, {
                    transform: [{
                        translateY: moveAnimated,
                    }],
                }]}
            >
                <Text style={styles.message} >{ message }</Text>
                {this.renderAction()}
            </Animated.View>
        );
    }
}

Snackbar.propTypes = propTypes;
Snackbar.defaultProps = defaultProps;
Snackbar.contextTypes = contextTypes;

export default Snackbar;
