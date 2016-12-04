import React, { Component, PropTypes, View, Text, Dimensions } from 'react-native';

import getPlatformElevation from '../styles/getPlatformElevation';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const defaultProps = {};

const contextTypes = {
  uiTheme: PropTypes.object.isRequired,
};

class BottomNavigation extends Component {
  render() {
    const { width } = Dimensions.get('window');
    const { palette } = this.context.uiTheme;

    const internalStyles = {
      bottomNavigation: {
        width: width,
        height: 56,
        flexDirection: 'row',
        backgroundColor: palette.canvasColor,
        ...getPlatformElevation(8),
      }
    };

    return(
      <View style={internalStyles.bottomNavigation}>
          {this.props.children}
      </View>
    );
  }
};

BottomNavigation.propTypes = propTypes;
BottomNavigation.defaultProps = defaultProps;
BottomNavigation.contextTypes = contextTypes;

export default BottomNavigation;
