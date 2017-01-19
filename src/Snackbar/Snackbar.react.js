/* eslint-disable import/no-unresolved, import/extensions */
import React, { PropTypes, PureComponent } from 'react';
import { View, Text, Animated } from 'react-native';


const propTypes = {
    /**
    * The text message to display.
    */
    message: PropTypes.string.isRequired,
    /**
    * The amount of time in milliseconds to show the snackbar.
    */
    timeout: PropTypes.number,
    /**
    * The function to execute when the action is clicked.
    */
    actionHandler: PropTypes.func,
    /**
    * The function to execute when the action is clicked.
    */
    actionText: PropTypes.string,
    /**
    * Inline style of bottom navigation
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
    }),
};
const defaultProps = {
    timeout: 2750,
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    // const { snackbar } = context.uiTheme;
    const local = {
        container: {
            height: 48,
            backgroundColor: '#323232',
            paddingHorizontal: 24,
        },
        text: {
            fontSize: 14,
            marginVertical: 14,
            color: '#ffffff',
        },
    };

    return {
        container: [
            // snackbar.container,
            local.container,
            props.style.container,
        ],
    };
}

/**
* Component for snackbars
* https://material.io/guidelines/components/snackbars-toasts.html
*/
class Snackbar extends PureComponent {
    render() {
        const { message } = this.props;
        const styles = getStyles(this.props, this.context);

        return (
            <Animated.View
                style={styles.container}
            >
                <Text>{ message.toUpperCase() }</Text>
            </Animated.View>
        );
    }
}

Snackbar.propTypes = propTypes;
Snackbar.defaultProps = defaultProps;
Snackbar.contextTypes = contextTypes;

export default Snackbar;
