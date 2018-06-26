/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { ViewPropTypes } from '../utils';
/* eslint-enable import/no-unresolved, import/extensions */

import withTheme from '../styles/withTheme';

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
    container: ViewPropTypes.style,
  }),
};
const defaultProps = {
  active: null,
  hidden: false,
  style: {},
};

function getStyles(props) {
  const { bottomNavigation } = props.theme;
  const local = {};

  return {
    container: [
      bottomNavigation.container,
      local.container,
      props.style.container,
    ],
    actionsContainer: [
      bottomNavigation.actionsContainer,
      local.actionsContainer,
      props.style.actionsContainer,
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
    const { style, hidden } = this.props;

    if (nextProps.style !== style) {
      this.setState({ styles: getStyles(nextProps, this.context) });
    }

    if (nextProps.hidden !== hidden) {
      if (nextProps.hidden === true) {
        this.hide();
      } else {
        this.show();
      }
    }
  }

  show = () => {
    const { moveAnimated } = this.state;

    Animated.timing(moveAnimated, {
      toValue: 0,
      duration: 225,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  hide = () => {
    const { moveAnimated, styles } = this.state;

    Animated.timing(moveAnimated, {
      toValue: StyleSheet.flatten(styles.container).height,
      duration: 195,
      easing: Easing.bezier(0.4, 0.0, 0.6, 1),
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { active, children } = this.props;
    const { styles, moveAnimated } = this.state;

    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: moveAnimated }] },
        ]}
      >
        <View style={styles.actionsContainer}>
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              ...child.props,
              active: child.key === active,
            }),
          )}
        </View>
      </Animated.View>
    );
  }
}

BottomNavigation.propTypes = propTypes;
BottomNavigation.defaultProps = defaultProps;

BottomNavigation.Action = BottomNavigationAction;

const ThemedBottomNavigation = withTheme(BottomNavigation);

export default ThemedBottomNavigation;
