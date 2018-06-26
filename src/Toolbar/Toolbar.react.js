/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { ViewPropTypes, BackAndroid } from '../utils';
/* eslint-enable import/no-unresolved, import/extensions */
import LeftElement from './LeftElement.react';
import CenterElement from './CenterElement.react';
import RightElement from './RightElement.react';
import isFunction from '../utils/isFunction';
import withTheme from '../styles/withTheme';

const propTypes = {
  /**
   * Indicates if search is active or not
   */
  isSearchActive: PropTypes.bool,
  /**
   * When you want to activate search feature you have to pass this object with config of search.
   */
  searchable: PropTypes.shape({
    /**
     * Called when search text was changed.
     */
    onChangeText: PropTypes.func,
    /**
     * Called when search was closed.
     */
    onSearchClosed: PropTypes.func,
    /**
     * Called when action to close search was requested.
     */
    onSearchCloseRequested: PropTypes.func,
    /**
     * Called when search was opened.
     */
    onSearchPressed: PropTypes.func,
    /**
     * Called when user press submit button on hw keyboard
     */
    onSubmitEditing: PropTypes.func,
    /**
     * Will shown as placeholder for search input.
     */
    placeholder: PropTypes.string,
    /**
     * Indicates when input should be focused after the search is opened.
     */
    autoFocus: PropTypes.bool,
    /**
     * Enable auto-capitalize for search input
     */
    autoCapitalize: PropTypes.string,
    /**
     * Enable auto-correct for search input
     */
    autoCorrect: PropTypes.bool,
    /**
     * Override default search icon
     */
    icon: PropTypes.string,
  }),
  /**
   * You can overide any style for the component via this prop
   */
  style: PropTypes.shape({
    container: ViewPropTypes.style,
    leftElementContainer: ViewPropTypes.style,
    // FIXME
    leftElement: PropTypes.any, // eslint-disable-line
    centerElementContainer: ViewPropTypes.style,
    titleText: Text.propTypes.style, // eslint-disable-line
    rightElementContainer: ViewPropTypes.style,
    rightElement: PropTypes.any, // eslint-disable-line
  }),
  /**
   * This size is used for each icon on the toolbar
   */
  size: PropTypes.number,
  /**
   * Wether or not the Toolbar should show
   */
  hidden: PropTypes.bool,
  /**
   * Called when centerElement was pressed.
   * TODO: better to rename to onCenterElementPress
   */
  onPress: PropTypes.func,
  /**
   * Will be shown on the left side.
   */
  leftElement: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /**
   * Called when leftElement was pressed.
   */
  onLeftElementPress: PropTypes.func,
  /**
   * Will be shown between leftElement and rightElement. Usually use for title.
   */
  centerElement: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /**
   * Will be shown on the right side.
   */
  rightElement: PropTypes.oneOfType([
    /**
     * Whatever you want to have on the right side
     */
    PropTypes.element,
    /**
     * One action (name of icon). Alias for ['icon1'].
     */
    PropTypes.string,
    /**
     * For many actions: ['icon1', 'icon2', ...]
     */
    PropTypes.arrayOf(PropTypes.string),
    /**
     * For actions and menu. The menu will be shown as last one icon.
     */
    PropTypes.shape({
      actions: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
      ),
      menu: PropTypes.shape({
        icon: PropTypes.string,
        labels: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
  ]),
  /**
   * Called when rightElement was pressed.
   */
  onRightElementPress: PropTypes.func,
  /**
   * Theme
   */
  theme: PropTypes.any, // eslint-disable-line
};
const defaultProps = {
  style: {},
  hidden: false,
  isSearchActive: false,
  onRightElementPress: null,
  rightElement: null,
  searchable: null,
  onPress: null,
  centerElement: null,
  leftElement: null,
  onLeftElementPress: null,
  size: 24,
};

const getBackButtonListener = callback =>
  BackAndroid.addEventListener('hardwareBackPress', callback);

// const isSearchable = props => (props.searchable && props.isSearchActive) || false;
// const getIsSearchActive = (props, state) => (props.searchable && state.isSearchActive) || false;

function getStyles(props) {
  const { toolbar } = props.theme;

  return {
    container: [toolbar.container, props.style.container],
  };
}

class Toolbar extends PureComponent {
  constructor(props) {
    super(props);

    const isSearchActiveInternal = props.isSearchActive || false;
    this.backButtonListener = isSearchActiveInternal
      ? getBackButtonListener(this.onSearchCloseRequested)
      : null;

    this.state = {
      // indicates if searc is activated
      isSearchActiveInternal,
      // value for serach input
      searchValue: '',
      // everything around background animation
      defaultScaleValue: new Animated.Value(isSearchActiveInternal ? 0.01 : 1),
      searchScaleValue: new Animated.Value(isSearchActiveInternal ? 1 : 0.01),
      radius: 0,
      diameter: 0,
      // it'll change z index after the animation is complete
      order: isSearchActiveInternal ? 'searchFirst' : 'defaultFirst',
      // toolbar animation - you can hide toolbar via hidden prop
      positionValue: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isSearchActiveInternal } = this.state;
    const { isSearchActive, hidden } = this.props;

    // if search is active and we clicked on the results which does not allow search
    // then close the previous search.
    if (isSearchActiveInternal && !nextProps.searchable) {
      this.onSearchCloseRequested();
    }

    // there should be also posibility to change search through props, so we need to check
    // props first and then we should check state if we need to change search state
    if (isSearchActive !== nextProps.isSearchActive) {
      // because nextProps.isSearchActive could be null, undefined
      // so we need it convert to boolean
      const nextIsSearchActive = !!nextProps.isSearchActive;
      if (isSearchActiveInternal !== nextIsSearchActive) {
        if (nextIsSearchActive) {
          this.onSearchOpenRequested();
        } else {
          this.onSearchCloseRequested();
        }
      }
    }

    // if hidden prop is changed we animate show or hide
    if (nextProps.hidden !== hidden) {
      if (nextProps.hidden === true) {
        this.hide();
      } else {
        this.show();
      }
    }
  }

  onSearchOpenRequested = () => {
    this.setState({
      isSearchActiveInternal: true,
      searchValue: '',
      // zIndex: 'toDefaultNext',
    });

    this.animateSearchBackground(() => {
      const { defaultScaleValue } = this.state;

      // default scale set up back to "hidden" value
      defaultScaleValue.setValue(0.01);
      this.setState({ order: 'searchFirst' });
      // on android it's typical that back button closes search input on toolbar
      this.backButtonListener = getBackButtonListener(
        this.onSearchCloseRequested,
      );
    });
  };

  onSearchPressed = () => {
    this.onSearchOpenRequested();

    const { searchable } = this.props;

    if (searchable && isFunction(searchable.onSearchPressed)) {
      searchable.onSearchPressed();
    }
  };

  onSearchTextChanged = value => {
    const { searchable } = this.props;

    if (searchable && isFunction(searchable.onChangeText)) {
      searchable.onChangeText(value);
    }

    this.setState({ searchValue: value });
  };

  onSearchClearRequested = () => {
    this.onSearchTextChanged('');
  };

  /**
   * Android's HW/SW back button
   */
  onSearchCloseRequested = () => {
    const { searchable } = this.props;
    const { searchScaleValue } = this.state;

    if (searchable.onSearchCloseRequested) {
      searchable.onSearchCloseRequested();
    }

    this.setState({
      isSearchActiveInternal: false,
      searchValue: '',
    });

    this.animateDefaultBackground(() => {
      // default scale set up back to "hidden" value
      searchScaleValue.setValue(0.01);
      this.setState({ order: 'defaultFirst' });

      this.onSearchClosed();
    });

    return true; // because we need to stop propagation
  };

  onSearchClosed = () => {
    const { searchable } = this.props;

    if (this.backButtonListener) {
      this.backButtonListener.remove();
    }

    if (searchable && isFunction(searchable.onSearchClosed)) {
      searchable.onSearchClosed();
    }
  };

  onLayout = event => {
    const { width, height } = event.nativeEvent.layout;

    // pythagorean
    const radius = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2)); // eslint-disable-line
    let diameter = radius * 2;
    // if there wasn't issue in react native we wouldn't do this
    // because there is issue in react native that we can't set scale value to 0, we need to use
    // 0.01 and it means we still see the point even if the scale set to 0.01
    const bgPosition = width - radius; // the correct left position of circle background
    // we need circle to be bigger, then we won't see the 0.01 scaled point (because it'll be
    // out of screen)
    const pointSize = diameter * 0.01;
    diameter += pointSize;

    this.setState({
      bgPosition,
      radius: diameter / 2,
      diameter,
    });
  };

  animateSearchBackground = onComplete => {
    const { searchScaleValue } = this.state;

    Animated.timing(searchScaleValue, {
      toValue: 1,
      duration: 325,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start(onComplete);
  };

  animateDefaultBackground = onComplete => {
    const { defaultScaleValue } = this.state;

    Animated.timing(defaultScaleValue, {
      toValue: 1,
      duration: 325,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start(onComplete);
  };

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
    const { moveAnimated } = this.state;
    const styles = getStyles(this.props);
    Animated.timing(moveAnimated, {
      toValue: -1 * StyleSheet.flatten(styles.container).height,
      duration: 195,
      easing: Easing.bezier(0.4, 0.0, 0.6, 1),
      useNativeDriver: true,
    }).start();
  };

  focusSearchField() {
    this.searchFieldRef.focus();
  }

  renderAnimatedBackgrounds = styles => {
    const { theme } = this.props;
    const {
      diameter,
      bgPosition,
      radius,
      defaultScaleValue,
      searchScaleValue,
      order,
    } = this.state;

    const bgStyle = {
      position: 'absolute',
      top: -radius,
      width: diameter,
      height: diameter,
      borderRadius: radius,
    };

    const { toolbarSearchActive } = theme;
    const container = StyleSheet.flatten(styles.container);
    const searchActive = StyleSheet.flatten(toolbarSearchActive.container);

    const bgSearch = (
      <Animated.View
        key="searchBackground"
        style={[
          bgStyle,
          {
            left: bgPosition,
            backgroundColor: searchActive.backgroundColor,
            transform: [{ scale: searchScaleValue }],
          },
        ]}
      />
    );

    const bgDefault = (
      <Animated.View
        key="defaultBackground"
        style={[
          bgStyle,
          {
            right: bgPosition,
            backgroundColor: container.backgroundColor,
            transform: [{ scale: defaultScaleValue }],
          },
        ]}
      />
    );

    let content = null;

    if (order === 'defaultFirst') {
      content = [bgDefault, bgSearch];
    } else {
      content = [bgSearch, bgDefault];
    }

    return <View style={StyleSheet.absoluteFill}>{content}</View>;
  };

  render() {
    const { onLeftElementPress, onPress, onRightElementPress } = this.props;

    const { isSearchActiveInternal, searchValue, positionValue } = this.state;
    // TODO: move out from render method
    const styles = getStyles(this.props);

    return (
      <Animated.View
        onLayout={this.onLayout}
        style={[
          styles.container,
          { transform: [{ translateY: positionValue }] },
        ]}
      >
        {this.renderAnimatedBackgrounds(styles)}
        <LeftElement
          {...this.props}
          onLeftElementPress={onLeftElementPress}
          isSearchActive={isSearchActiveInternal}
          onSearchClose={this.onSearchCloseRequested}
        />
        <CenterElement
          {...this.props}
          onPress={onPress}
          searchValue={searchValue}
          isSearchActive={isSearchActiveInternal}
          onSearchTextChange={this.onSearchTextChanged}
        />
        <RightElement
          {...this.props}
          searchValue={searchValue}
          isSearchActive={isSearchActiveInternal}
          onSearchPress={this.onSearchPressed}
          onSearchClearRequest={this.onSearchClearRequested}
          onRightElementPress={onRightElementPress}
        />
      </Animated.View>
    );
  }
}

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;

export default withTheme(Toolbar);
