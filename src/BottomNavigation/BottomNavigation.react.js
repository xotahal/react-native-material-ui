import React, { PropTypes, PureComponent } from 'react';
import { Animated, Easing } from 'react-native';

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
    * Inline style of bottom navigation
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
    }),
};
const defaultProps = {
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};
function getStyles(props, local, context) {
    const { bottomNavigation } = context.uiTheme;

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
    constructor(props) {
        super(props);
        this.state = {
            moveAnimated: new Animated.Value(0 - this.context.uiTheme.bottomNavigation.container.height),
        };
    }

    componentDidMount() {
        Animated.timing(this.state.moveAnimated, {
            toValue: 0,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
        }).start();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.shouldShow !== this.props.shouldShow && nextProps.shouldShow === true) {
            this._show();
        }

        if (nextProps.shouldHide !== this.props.shouldHide && nextProps.shouldHide === true) {
            this._hide();
        }
    }

    _show = () => {
        Animated.timing(this.state.moveAnimated, {
            toValue: 0,
            delay: 0,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
        }).start();
    }

    _hide = () => {
        Animated.timing(this.state.moveAnimated, {
            toValue: 0 - this.context.uiTheme.bottomNavigation.container.height,
            duration: 195,
            easing: Easing.bezier(0.4, 0.0, 0.6, 1),
        }).start();
    }

    render() {
        const { active, children } = this.props;
        const local = {
          container: {
            bottom: this.state.moveAnimated,
          },
        };
        const styles = getStyles(this.props, local, this.context);

        return (
            <Animated.View style={styles.container}>
                {React.Children.map(
                    children,
                    child => React.cloneElement(child, {
                        ...child.props,
                        active: child.key === active,
                    })
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
