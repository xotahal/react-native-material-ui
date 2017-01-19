/* eslint-disable import/no-unresolved, import/extensions */
import React, { PropTypes, PureComponent } from 'react';
import { View, Text, Platform, Animated, Easing, StyleSheet } from 'react-native';


const propTypes = {
    /**
    * Wether or not the BottomNaviagtion should show
    */
    hidden: PropTypes.bool,
    /**
    * Inline style of bottom navigation
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
    }),
};
const defaultProps = {
    hidden: false,
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
    };
}
/**
* Component for bottom navigation
* https://material.google.com/components/bottom-navigation.html
*/
class Snackbar extends PureComponent {
    constructor() {
        super();
        this.state = {
            moveAnimated: new Animated.Value(0),
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.hidden !== this.props.hidden) {
            if (nextProps.hidden === true) {
                this.hide();
            } else {
                this.show();
            }
        }
    }
    show = () => {
        Animated.timing(this.state.moveAnimated, {
            toValue: 0,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    hide = () => {
        const { moveAnimated, styles } = this.state;

        Animated.timing(moveAnimated, {
            toValue: StyleSheet.flatten(styles.container).height,
            duration: 195,
            easing: Easing.bezier(0.4, 0.0, 0.6, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    render() {
        const styles = getStyles(this.props, this.context);

        return (
            <Animated.View
                style={[styles.container, {
                    transform: [{
                        translateY: this.state.moveAnimated,
                    }],
                }]}
            >
                <Text>Snackbar</Text>
            </Animated.View>
        );
    }
}

Snackbar.propTypes = propTypes;
Snackbar.defaultProps = defaultProps;
Snackbar.contextTypes = contextTypes;

export default Snackbar;
