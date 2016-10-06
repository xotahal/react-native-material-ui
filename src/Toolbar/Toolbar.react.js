import React, { Component, PropTypes } from 'react';
import {
    Animated,
    BackAndroid,
    findNodeHandle,
    NativeModules,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Icon from '../Icon';
import IconToggle from '../IconToggle';
import isFunction from '../utils/isFunction';

const UIManager = NativeModules.UIManager;


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
    }),
    /**
    * You can overide any style for the component via this prop
    */
    style: PropTypes.shape({
        container: Animated.View.propTypes.style,
        leftElementContainer: View.propTypes.style,
        leftElement: Text.propTypes.style,
        centerElementContainer: Animated.View.propTypes.style,
        titleText: Text.propTypes.style,
        rightElementContainer: View.propTypes.style,
        rightElement: Text.propTypes.style,
    }),
    /**
    * Just alias for style={{ rightElement: {}, leftElement: {}}}
    */
    iconProps: PropTypes.shape({
        size: PropTypes.number,
        color: PropTypes.string,
    }),
    /**
    * DEPRECATED: (use style prop instead)
    * If it's true, the toolbar has elevation set to 0 and position absolute, left, right set to 0.
    * This prop will be deprecated probably, because it's not pretty clear what it does. I use
    * it during the animation of toolbar, but I can use the style prop that is much more obvious.
    */
    translucent: PropTypes.bool,
    /**
    * Called when centerElement was pressed.
    * TODO: better to rename to onCenterElementPress
    */
    onPress: PropTypes.func,
    /**
    * Will be shown on the left side.
    */
    leftElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
    /**
    * Called when leftElement was pressed.
    */
    onLeftElementPress: PropTypes.func,
    /**
    * Will be shown between leftElement and rightElement. Usually use for title.
    */
    centerElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
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
                PropTypes.oneOfType([
                    PropTypes.element,
                    PropTypes.string,
                ]),
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
};
const defaultProps = {
    elevation: 4, // TODO: probably useless, elevation is defined in getTheme function
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context, state) {
    const { toolbar, toolbarSearchActive } = context.uiTheme;

    const local = {};
    const isSearchActive = props.searchable && state.isSearchActive;

    if (props.translucent) {
        local.container = {
            ...StyleSheet.absoluteFillObject,
            elevation: 0,
        };
    }

    return {
        container: [
            toolbar.container,
            local.container,
            isSearchActive && toolbarSearchActive.container,
            props.style.container,
        ],
        leftElementContainer: [
            toolbar.leftElementContainer,
            isSearchActive && toolbarSearchActive.leftElementContainer,
            props.style.leftElementContainer,
        ],
        leftElement: [
            toolbar.leftElement,
            isSearchActive && toolbarSearchActive.leftElement,
            props.style.leftElement,
        ],
        centerElementContainer: [
            toolbar.centerElementContainer,
            isSearchActive && toolbarSearchActive.centerElementContainer,
            props.style.centerElementContainer,
        ],
        titleText: [
            toolbar.titleText,
            isSearchActive && toolbarSearchActive.titleText,
            props.style.titleText,
        ],
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

class Toolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSearchActive: props.isSearchActive,
            searchValue: '',
        };
    }
    onMenuPressed = (labels) => {
        const { onRightElementPress } = this.props;

        UIManager.showPopupMenu(
            findNodeHandle(this.menu),
            labels,
            () => {},
            (result, index) => {
                if (onRightElementPress) {
                    onRightElementPress({ action: 'menu', result, index });
                }
            }
        );
    };
    onSearchCloseRequested = () => {
        this.onSearchClosePressed();
        return true; // because we need to stop propagation
    }
    onSearchTextChanged = (value) => {
        const { searchable } = this.props;

        if (searchable && isFunction(searchable.onChangeText)) {
            searchable.onChangeText(value);
        }

        this.setState({ searchValue: value });
    };
    onSearchPressed = () => {
        const { searchable } = this.props;

        // on android it's typical that back button closes search input on toolbar
        if (Platform.OS !== 'ios') {
            BackAndroid.addEventListener('onSearchCloseRequested', this.onSearchCloseRequested);
        }

        if (searchable && isFunction(searchable.onSearchPressed)) {
            searchable.onSearchPressed();
        }


        this.setState({
            isSearchActive: true,
            searchValue: '',
        });
    };
    onSearchClosePressed = () => {
        const { searchable } = this.props;

        if (Platform.OS !== 'ios') {
            BackAndroid.removeEventListener('onSearchCloseRequested', this.onSearchCloseRequested);
        }

        if (searchable && isFunction(searchable.onSearchClosed)) {
            searchable.onSearchClosed();
        }


        this.setState({
            isSearchActive: false,
            searchValue: '',
        });
    };
    focusSearchField() {
        this.searchFieldRef.focus();
    }
    renderLeftElement = (style) => {
        const { searchable, leftElement, onLeftElementPress } = this.props;

        if (!leftElement && !this.state.isSearchActive) {
            return null;
        }

        let iconName = leftElement;
        let onPress = onLeftElementPress;

        if (searchable && this.state.isSearchActive) {
            iconName = 'arrow-back';
            onPress = this.onSearchClosePressed;
        }

        const flattenLeftElement = StyleSheet.flatten(style.leftElement);

        return (
            <View style={style.leftElementContainer}>
                <IconToggle
                    name={iconName}
                    color={flattenLeftElement.color}
                    onPress={onPress}
                    style={style.leftElement}
                />
            </View>
        );
    }
    renderCenterElement = (style) => {
        const { searchable, centerElement, onPress } = this.props;

        // there can be situastion like this:
        // 1. Given toolbar with title and searchable feature
        // 2. User presses search icon - isSearchActive === true
        // 3. User writes some search text and then select searched items in list (just example)
        // 4. Then you want to display to user he has 'n' selected items
        // 5. So you render toolbar with another props like centerElement==="n items selected" but
        //    you don't want user to be able search anymore (after he has selected something)
        // 6. So this.props.searchable===null and isSearchActive === true, if you pass searchable
        //    object again to this instance, search text and isSearchActive will be still set
        if (searchable && this.state.isSearchActive) {
            return (
                <TextInput
                    ref={(ref) => { this.searchFieldRef = ref; }}
                    autoFocus={searchable.autoFocus}
                    onChangeText={this.onSearchTextChanged}
                    onSubmitEditing={searchable.onSubmitEditing}
                    placeholder={searchable.placeholder}
                    style={style.titleText}
                    underlineColorAndroid="transparent"
                    value={this.state.searchValue}
                />
            );
        }

        let content = null;

        if (typeof centerElement === 'string') {
            content = (
                <Animated.View style={style.centerElementContainer}>
                    <Text numberOfLines={1} style={style.titleText}>
                        {centerElement}
                    </Text>
                </Animated.View>
            );
        } else {
            content = centerElement;
        }

        if (!content) {
            return null;
        }

        return (
            <TouchableWithoutFeedback key="center" onPress={onPress}>
                {content}
            </TouchableWithoutFeedback>
        );
    }
    renderRightElement = (style) => {
        const { rightElement, onRightElementPress, searchable } = this.props;
        const { isSearchActive, searchValue } = this.state;
        const { spacing } = this.context.uiTheme;

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

        const flattenRightElement = StyleSheet.flatten(style.rightElement);

        if (actionsMap) {
            result = actionsMap.map((action, index) => {
                let content = null;

                if (React.isValidElement(action)) {
                    content = React.cloneElement(action, {
                        size: spacing.iconSize,
                        color: flattenRightElement.color,
                        style: style.rightElement,
                    });
                } else {
                    content = (
                        <Icon
                            name={action}
                            size={spacing.iconSize}
                            color={flattenRightElement.color}
                        />
                    );
                }

                return (
                    <IconToggle
                        key={index}
                        color={flattenRightElement.color}
                        onPress={() =>
                            onRightElementPress && onRightElementPress({ action, index })
                        }
                    >
                        {content}
                    </IconToggle>
                );
            });
        }

        if (React.isValidElement(rightElement)) {
            result.push(React.cloneElement(rightElement, { key: 'customRightElement' }));
        }


        // if searchable feature is on and search is active with some text, then we show clear
        // button, to be able to clear text
        if (searchable) {
            if (isSearchActive && searchValue.length > 0) {
                result.push(
                    <IconToggle
                        key="searchClear"
                        name="clear"
                        size={spacing.iconSize}
                        color={flattenRightElement.color}
                        style={style.rightElement}
                        onPress={() => this.onSearchTextChanged('')}
                    />
                );
            } else {
                result.push(
                    <IconToggle
                        key="searchIcon"
                        name="search"
                        color={flattenRightElement.color}
                        onPress={this.onSearchPressed}
                        style={style.rightElement}
                    />
                );
            }
        }

        if (rightElement && rightElement.menu && !isSearchActive) {
            result.push(
                <IconToggle
                    key="menuIcon"
                    color={flattenRightElement.color}
                    onPress={() => this.onMenuPressed(rightElement.menu.labels)}
                >
                    <Icon
                        ref={(c) => { this.menu = c; }}
                        name="more-vert"
                        size={spacing.iconSize}
                        color={flattenRightElement.color}
                        style={style.rightElement}
                    />
                </IconToggle>
            );
        }

        return (
            <View style={style.rightElementContainer}>
                {result}
            </View>
        );
    }
    render() {
        const styles = getStyles(this.props, this.context, this.state);

        return (
            <Animated.View style={styles.container}>
                {this.renderLeftElement(styles)}
                {this.renderCenterElement(styles)}
                {this.renderRightElement(styles)}
            </Animated.View>
        );
    }

}

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;
Toolbar.contextTypes = contextTypes;

export default Toolbar;
