import React, { PropTypes, PureComponent } from 'react';
import { View, Text } from 'react-native';

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
    render() {
        const { active, children } = this.props;
        const styles = getStyles(this.props, this.context);

        return (
            <View style={styles.container}>
                {React.Children.map(
                    children,
                    child => React.cloneElement(child, {
                        ...child.props,
                        active: child.key === active,
                    })
                )}
            </View>
        );
    }
}

BottomNavigation.propTypes = propTypes;
BottomNavigation.defaultProps = defaultProps;
BottomNavigation.contextTypes = contextTypes;

BottomNavigation.Action = BottomNavigationAction;

export default BottomNavigation;
