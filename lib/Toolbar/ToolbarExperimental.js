import {
    Animated,
    findNodeHandle,
    NativeModules,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { getColor } from '../helpers';
import { TYPO, PRIMARY, THEME_NAME, PRIMARY_COLORS } from '../config';
import Icon from '../Icon';
import IconToggle from '../IconToggle';
import isFunction from '../utils';
import React, { Component, PropTypes } from 'react';

const UIManager = NativeModules.UIManager;


const propTypes = {
    // generally
    iconProps: PropTypes.shape({
        size: PropTypes.number,
        color: PropTypes.string,
    }),
    isSearchActive: PropTypes.bool,
    primary: PropTypes.oneOf(PRIMARY_COLORS),
    searchable: PropTypes.shape({
        onChangeText: PropTypes.func,
        onSearchClosed: PropTypes.func,
        placeholder: PropTypes.string,
        onSearchPressed: PropTypes.func,
        onSubmitEditing: PropTypes.func,
        autoFocus: PropTypes.bool
    }),
    style: PropTypes.shape({
        toolbarContainer: PropTypes.object,
        centerElementContainer: PropTypes.object,
        leftElementContainer: PropTypes.object,
        rightElementContainer: PropTypes.object,
    }),
    theme: PropTypes.oneOf(THEME_NAME),
    title: PropTypes.string,
    translucent: PropTypes.bool,
    onPress: PropTypes.func,
    onPressValue: PropTypes.any,

    // left side
    leftElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
    onLeftElementPress: PropTypes.func,

    // center
    centerElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),

    // right side
    rightElement: PropTypes.oneOfType([
        PropTypes.element, // whatever you want to have on the right side
        PropTypes.string, // one action - alias for ['icon1']
        PropTypes.arrayOf(PropTypes.string), // for many actions ['icon1', 'icon2', ...]
        PropTypes.shape({ // for actions + menu
            actions: PropTypes.arrayOf(PropTypes.string),
            menu: PropTypes.shape({
                icon: PropTypes.string,
                labels: PropTypes.arrayOf(PropTypes.string),
            }),
        }),
    ]),
    onRightElementPress: PropTypes.func,
};
const defaultProps = {
    elevation: 4,
    iconProps: {
        size: 24,
        color: 'rgba(255,255,255,.87)',
    },
    primary: PRIMARY,
    style: {},
    theme: 'dark',
};

const styles = StyleSheet.create({
    toolbarContainer: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
    },
    centerElementContainer: {
        flex: 1,
        marginLeft: 16,
    },
    searchInput: TYPO.paperFontTitle,
    leftElementContainer: { },
    rightElementContainer: {
        flexDirection: 'row',
    },
    leftIcon: {
        margin: 16,
    },
    rightIcon: {
        margin: 16,
    }
});

class Toolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSearchActive: props.isSearchActive,
            searchValue: ''
        };
    }
    onMenuPressed = (labels) => {
        const { onRightElementPress } = this.props;

        UIManager.showPopupMenu(
            findNodeHandle(this.refs.menu),
            labels,
            () => {},
            (result, index) => onRightElementPress({ action: 'menu', result, index })
        );
    };
    onSearchTextChanged = (value) => {
        const { searchable } = this.props;

        if (isFunction(searchable.onChangeText)) {
            searchable.onChangeText(value);
        }

        this.setState({ searchValue: value });
    };
    onSearchPressed = () => {
        const { searchable } = this.props;

        if (isFunction(searchable.onSearchPressed)) {
            searchable.onSearchPressed();
        }

        this.setState({
            isSearchActive: true,
            searchValue: ''
        });
    };
    onSearchClosePressed = () => {
        const { searchable } = this.props;

        if (isFunction(searchable.onSearchClosed)) {
            searchable.onSearchClosed();
        }

        this.setState({
            isSearchActive: false,
            searchValue: ''
        });
    };
    getStyle = () => {
        const { style, primary, theme, translucent, iconProps } = this.props;

        let selectedTheme = {};

        if (this.state.isSearchActive || theme === 'light') {
            selectedTheme = {
                backgroundColor: '#ffffff',
                color: 'rgba(0,0,0,.87)',
                leftIconColor: 'rgba(0,0,0,.54)',
                rightIconColor: 'rgba(0,0,0,.54)'
            };
        } else {
            selectedTheme = {
                backgroundColor: getColor(primary),
                color: 'rgba(255,255,255,.87)',
                leftIconColor: 'rgba(255,255,255,.87)',
                rightIconColor: 'rgba(255,255,255,.87)'
            };
        }

        const result = {};
        let searchStyle = {};

        if (this.state.isSearchActive) {
            searchStyle = {
                toolbarContainer: { backgroundColor: getColor('paperGrey100') },
                titleText: {
                    color: 'rgba(0,0,0,.87)',
                    fontSize: 16,
                    fontWeight: 'normal',
                },
                leftIcon: { color: 'rgba(0,0,0,.54)' },
                rightIcon: { color: 'rgba(0,0,0,.54)' },
            };
        }

        result.toolbarContainer = [
            styles.toolbarContainer,
            { backgroundColor: selectedTheme.backgroundColor },
            searchStyle.toolbarContainer,
            translucent ? {
                elevation: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
            } : null,
            style.toolbarContainer,
        ];
        result.centerElementContainer = [
            styles.centerElementContainer,
            searchStyle.centerElementContainer,
            style.centerElementContainer
        ];
        result.titleText = [
            styles.titleText,
            TYPO.paperFontTitle,
            { color: selectedTheme.color },
            searchStyle.titleText,
            style.titleText
        ];
        result.leftElementContainer = [
            styles.leftElementContainer,
            searchStyle.leftElementContainer,
            style.leftElementContainer
        ];
        result.rightElementContainer = [
            styles.rightElementContainer,
            searchStyle.rightElementContainer,
            style.rightElementContainer
        ];
        result.leftIcon = [
            styles.leftIcon,
            searchStyle.leftIcon,
            style.leftIcon
        ];
        result.rightIcon = [
            styles.rightIcon,
            searchStyle.rightIcon,
            style.rightIcon
        ];
        result.iconProps = {
            size: iconProps.size,
            color: selectedTheme.leftIconColor,
        };

        return result;
    }
    focusSearchField() {
        this._searchFieldRef.focus();
    }
    renderLeftElement = (style) => {
        const { leftElement, onLeftElementPress } = this.props;

        if (!leftElement) {
            return null;
        }

        let iconName = leftElement;
        let onPress = onLeftElementPress;

        if (this.state.isSearchActive) {
            iconName = 'arrow-back';
            onPress = this.onSearchClosePressed;
        }

        return (
            <View style={style.leftElementContainer}>
                <IconToggle color={style.iconProps.color} onPress={onPress}>
                    <Icon
                      name={iconName}
                      size={style.iconProps.size}
                      color={style.iconProps.color}
                      style={style.leftIcon}
                    />
                </IconToggle>
            </View>
        );
    }
    renderCenterElement = (style) => {
        if (!this.state.isSearchActive) {
            const { centerElement, onPress } = this.props;

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

        const { searchable } = this.props;

        return (
            <View style={style.centerElementContainer}>
                <TextInput
                  ref={(ref) => { this._searchFieldRef = ref; }}
                  autoFocus={searchable.autoFocus}
                  onChangeText={this.onSearchTextChanged}
                  onSubmitEditing={searchable.onSubmitEditing}
                  placeholder={searchable.placeholder}
                  style={style.titleText}
                  underlineColorAndroid="transparent"
                  value={this.state.searchValue}
                />
            </View>
        );
    }
    renderRightElement = (style) => {
        const { rightElement, onRightElementPress, searchable } = this.props;

        if (!rightElement) {
            return null;
        }

        let actionsMap = [];

        if (typeof rightElement === 'string') {
            actionsMap.push(rightElement);
        } else if (Array.isArray(rightElement)) {
            actionsMap = rightElement;
        } else if (rightElement.actions) {
            actionsMap = rightElement.actions;
        }

        if (this.state.isSearchActive) {
            actionsMap = [{
                icon: 'clear',
                onPress: () => this.onSearchTextChanged('')
            }];
        }

        let result = [];

        if (actionsMap) {
            result = actionsMap.map((action, i) => (
                <IconToggle
                  key={i}
                  color={style.iconProps.color}
                  onPress={() => onRightElementPress({ action })}
                >
                    <Icon
                      name={action}
                      size={style.iconProps.size}
                      color={style.iconProps.color}
                      style={style.rightIcon}
                    />
                </IconToggle>
            ));
        }

        if (searchable && !this.state.isSearchActive) {
            result.push(
                <IconToggle
                  key="searchIcon"
                  color={style.iconProps.color}
                  onPress={this.onSearchPressed}
                >
                    <Icon name="search"
                      size={style.iconProps.size}
                      color={style.iconProps.color}
                      style={style.rightIcon}
                    />
                </IconToggle>
            );
        }
        if (rightElement.menu && !this.state.isSearchActive) {
            result.push(
                <IconToggle
                  key="menuIcon"
                  color={style.iconProps.color}
                  onPress={() => this.onMenuPressed(rightElement.menu.labels)}
                >
                    <Icon
                      ref="menu"
                      name="more-vert"
                      size={style.iconProps.size}
                      color={style.iconProps.color}
                      style={style.rightIcon}
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
        const style = this.getStyle();

        return (
            <Animated.View style={style.toolbarContainer}>
                { this.renderLeftElement(style) }
                { this.renderCenterElement(style) }
                { this.renderRightElement(style) }
            </Animated.View>
        );
    }

}

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;

export default Toolbar;
