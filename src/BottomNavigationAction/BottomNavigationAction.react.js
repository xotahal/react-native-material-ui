import React, { Component, PropTypes, View, Text } from 'react-native';

import Icon from '../Icon';
import RippleFeedback from '../RippleFeedbacks';

const propTypes = {
  label: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isActive: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

const defaultProps = {};

const contextTypes = {
  uiTheme: PropTypes.object.isRequired,
};

class BottomNavigationAction extends Component {
  render() {
    const { style, iconName, label, isActive, onPress } = this.props;
    const { palette } = this.context.uiTheme;

    const internalStyles = {
      container: {
        flex: 1,
        minWidth: 80,
        maxWidth: 168,
        height: 56,
      },
      icon: {
        textAlign: 'center',
        marginTop: isActive ? 6 : 8,
      },
      label: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 10,
        fontSize: isActive ? 14 : 12,
        textAlign: 'center',
        color: isActive ? palette.primaryTextColor : palette.secondaryTextColor,
      }
    };

    return(
      <RippleFeedback
          onPress={onPress}
      >
          <View style={internalStyles.container}>
              <Icon
                  style={internalStyles.icon}
                  color={isActive ? palette.primaryColor : palette.secondaryColor}
                  size={24}
                  name={iconName}
              />
              <Text style={internalStyles.label}>{ label }</Text>
          </View>
      </RippleFeedback>
    );
  }
};

BottomNavigationAction.propTypes = propTypes;
BottomNavigationAction.defaultProps = defaultProps;
BottomNavigationAction.contextTypes = contextTypes;

export default BottomNavigationAction;
