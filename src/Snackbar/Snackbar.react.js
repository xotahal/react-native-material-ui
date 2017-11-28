/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, Animated, Easing, Platform, StyleSheet } from 'react-native';
import { ViewPropTypes } from '../utils';

import Button from '../Button';

const propTypes = {
    /**
    * The text message to display.
    */
    message: PropTypes.string.isRequired,
    /**
    * Whether or not the snackbar is visible.
    */
    visible: PropTypes.bool,
    /**
    * The amount of time in milliseconds to show the snackbar.
    */
    timeout: PropTypes.number,
    /**
    * Callback for when the timeout finishes.
    */
    onRequestClose: PropTypes.func.isRequired,
    /**
    * Whether or not there is a bottom navigation on the screen.
    */
    bottomNavigation: PropTypes.bool,
    /**
    * The function to execute when the action is clicked.
    */
    onActionPress: PropTypes.func,
    /**
    * The function to execute when the action is clicked.
    */
    actionText: PropTypes.string,
    /**
    * Take a look at the Button component for more details.
    */
    button: PropTypes.shape({
        ...Button.propTypes,
        text: PropTypes.string,
    }),
    /**
    * Inline style of snackbar
    */
    style: PropTypes.shape({
        container: ViewPropTypes.style,
        message: ViewPropTypes.style,
    }),
};
const defaultProps = {
    onActionPress: null,
    actionText: null,
    visible: false,
    timeout: 2750,
    bottomNavigation: false,
    style: {},
    button: {},
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
        const { style, visible, bottomNavigation } = this.props;

        if (nextProps.style !== style) {
            this.setState({ styles: getStyles(this.props, this.context) });
        }

        if (nextProps.visible !== visible) {
            if (nextProps.visible === true) {
                this.show(nextProps.bottomNavigation);
                this.setHideTimer();
            } else {
                this.hide();
            }
        } else if ((nextProps.bottomNavigation !== bottomNavigation)
        && nextProps.visible) {
            this.move(nextProps.bottomNavigation);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.hideTimer);
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

    show = (bottomNavigation) => {
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
            easing: Easing.bezier(0.4, 0.0, 1, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }

    move = (bottomNavigation) => {
        const { moveAnimated } = this.state;
        const toValue = bottomNavigation ? -56 : 0;
        const duration = bottomNavigation ? 225 : 195;
        const easing = bottomNavigation ?
            Easing.bezier(0.0, 0.0, 0.2, 1) : Easing.bezier(0.4, 0.0, 0.6, 1);

        Animated.timing(moveAnimated, {
            toValue,
            duration,
            easing,
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }

    renderAction = () => {
        const { snackbar } = this.context.uiTheme;
        const { button, actionText, onActionPress } = this.props;
        const styles = {};

        if (actionText && (typeof onActionPress === 'function')) {
            if (button !== 'undefined' && 'style' in button) {
                if ('container' in button.style) {
                    styles.container = {
                        ...StyleSheet.flatten(snackbar.actionContainer),
                        ...button.style.container,
                    };
                }
                if ('text' in button.style) {
                    styles.text = {
                        ...StyleSheet.flatten(snackbar.actionText),
                        ...button.style.text,
                    };
                }
            } else {
                styles.container = snackbar.actionContainer;
                styles.text = snackbar.actionText;
            }

            return (
                <Button
                    {...button}
                    style={styles}
                    text={actionText}
                    onPress={onActionPress}
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
