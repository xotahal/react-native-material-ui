/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, NativeModules, findNodeHandle } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import { ViewPropTypes } from '../utils';

import withTheme from '../styles/withTheme';
import IconToggle from '../IconToggle';
import isFunction from '../utils/isFunction';

const { UIManager } = NativeModules;

const propTypes = {
  rightElementTestID: PropTypes.string,
  isSearchActive: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  // We need just check if searchable exists
  // TODO: pass bool to this component
  searchable: PropTypes.object, // eslint-disable-line
  style: PropTypes.shape({
    rightElementContainer: ViewPropTypes.style,
    rightEle: ViewPropTypes.style,
  }),
  size: PropTypes.number,
  // TODO: add shape control
  rightElement: PropTypes.any, // eslint-disable-line
  onRightElementPress: PropTypes.func,
  onSearchClearRequest: PropTypes.func.isRequired,
  onSearchPress: PropTypes.func.isRequired,
  /**
   * Name of Icon set that should be use. From react-native-vector-icons
   */
  iconSet: PropTypes.string,
};
const defaultProps = {
  rightElementTestID: null,
  rightElement: null,
  onRightElementPress: null,
  size: null,
  style: {},
  searchable: null,
  iconSet: null,
};

function getStyles(props) {
  const { isSearchActive, theme } = props;
  const { toolbar, toolbarSearchActive } = theme;

  return {
    rightElementContainer: [
      toolbar.rightElementContainer,
      isSearchActive && toolbarSearchActive.rightElementContainer,
      props.style.rightElementContainer,
    ],
    rightElement: [
      toolbar.rightElement,
      isSearchActive && toolbarSearchActive.rightElement,
      props.style.rightElement,
    ],
  };
}

class RightElement extends PureComponent {
  onMenuPressed = labels => {
    const { onRightElementPress } = this.props;

    UIManager.showPopupMenu(
      findNodeHandle(this.menu),
      labels,
      () => {},
      (result, index) => {
        if (onRightElementPress) {
          onRightElementPress({ action: 'menu', result, index });
        }
      },
    );
  };

  onSearchPressed = () => {
    const { onSearchPress } = this.props;

    if (isFunction(onSearchPress)) {
      onSearchPress();
    }
  };

  render() {
    const {
      rightElementTestID,
      isSearchActive,
      rightElement,
      onRightElementPress,
      searchable,
      size,
      searchValue,
      onSearchClearRequest,
      iconSet,
    } = this.props;

    const styles = getStyles(this.props, this.context, this.state);

    // if there is no rightElement and searchable feature is off then we are sure on the right
    // is nothing
    if (!rightElement && !searchable) {
      return null;
    }

    let actionsMap = [];
    let result = [];

    if (rightElement) {
      if (typeof rightElement === 'string') {
        actionsMap.push(rightElement);
      } else if (Array.isArray(rightElement)) {
        actionsMap = rightElement;
      } else if (rightElement.actions) {
        actionsMap = rightElement.actions;
      }
    }

    const flattenRightElement = StyleSheet.flatten(styles.rightElement);

    if (actionsMap) {
      result = actionsMap.map((action, index) => {
        if (React.isValidElement(action)) {
          return action;
        }

        return (
          <IconToggle
            key={action}
            name={action}
            color={flattenRightElement.color}
            size={size}
            style={flattenRightElement}
            iconSet={iconSet}
            onPress={() => onRightElementPress({ action, index })}
          />
        );
      });
    }

    if (React.isValidElement(rightElement)) {
      result.push(
        React.cloneElement(rightElement, { key: 'customRightElement' }),
      );
    }

    // if searchable feature is on and search is active with some text, then we show clear
    // button, to be able to clear text
    if (searchable) {
      if (isSearchActive) {
        // clear result to hide other icons
        result = [];

        if (searchValue.length > 0) {
          result.push(
            <IconToggle
              key="searchClear"
              name="clear"
              color={flattenRightElement.color}
              size={size}
              style={flattenRightElement}
              onPress={onSearchClearRequest}
            />,
          );
        }
      } else {
        result.push(
          <IconToggle
            key="searchIcon"
            name={searchable.icon ? searchable.icon : 'search'}
            color={flattenRightElement.color}
            size={size}
            style={flattenRightElement}
            onPress={this.onSearchPressed}
          />,
        );
      }
    }

    if (rightElement && rightElement.menu && !isSearchActive) {
      const view = (
        <View key="menuIcon">
          {/* We need this view as an anchor for drop down menu. findNodeHandle can
                        find just view with width and height, even it needs backgroundColor :/
                    */}
          <View
            ref={c => {
              this.menu = c;
            }}
            style={{
              backgroundColor: 'transparent',
              width: 1,
              height: StyleSheet.hairlineWidth,
            }}
          />
          <IconToggle
            name={rightElement.menu.icon || 'more-vert'}
            color={flattenRightElement.color}
            size={size}
            onPress={() => this.onMenuPressed(rightElement.menu.labels)}
            style={flattenRightElement}
          />
        </View>
      );

      result.push(view);
    }

    return (
      <View testID={rightElementTestID} style={styles.rightElementContainer}>
        {result}
      </View>
    );
  }
}

RightElement.propTypes = propTypes;
RightElement.defaultProps = defaultProps;

export default withTheme(RightElement);
