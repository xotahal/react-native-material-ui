/* eslint-disable import/no-unresolved, import/extensions */
import React, { PropTypes, PureComponent } from 'react';
import { View, Platform, Animated, Easing, StyleSheet } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */

import BottomNavigationAction from './BottomNavigationAction.react';

const propTypes = {
    /**
    * The key of selected/active tab
    */
    active: PropTypes.string,
    /**
    * BottomNavigation.Action nodes
    */
    children: PropTypes.node.isRequired,
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
    const { bottomNavigation } = context.uiTheme;
    const local = {};

    return {
        container: [
            bottomNavigation.container,
            local.container,
            props.style.container,
        ],
    };
}
/**
* Component for bottom navigation
* https://material.google.com/components/bottom-navigation.html
*/
class BottomNavigation extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            styles: getStyles(props, context),
            moveAnimated: new Animated.Value(0),
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.style !== this.props.style) {
            this.setState({ styles: getStyles(nextProps, this.context) });
        }

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
        const { active, children } = this.props;
        const { styles } = this.state;

        return (
            <Animated.View
                style={[styles.container, {
                    transform: [{
                        translateY: this.state.moveAnimated,
                    }],
                }]}
            >
                {React.Children.map(
                    children,
                    child => React.cloneElement(child, {
                        ...child.props,
                        active: child.key === active,
                    }),
                )}
            </Animated.View>
        );
    }
}

BottomNavigation.propTypes = propTypes;
BottomNavigation.defaultProps = defaultProps;
BottomNavigation.contextTypes = contextTypes;

BottomNavigation.Action = BottomNavigationAction;

export default BottomNavigation;
