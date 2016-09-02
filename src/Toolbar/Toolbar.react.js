import {
    Animated,
    findNodeHandle,
    StyleSheet,
    NativeModules,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Icon from '../Icon';
import IconToggle from '../IconToggle';
import isFunction from '../utils/isFunction';
import React, { Component, PropTypes } from 'react';

const UIManager = NativeModules.UIManager;


const propTypes = {
    // generally
    iconProps: PropTypes.shape({
        size: PropTypes.number,
        color: PropTypes.string,
    }),
    isSearchActive: PropTypes.bool,
    searchable: PropTypes.shape({
        onChangeText: PropTypes.func,
        onSearchClosed: PropTypes.func,
        placeholder: PropTypes.string,
        onSearchPressed: PropTypes.func,
        onSubmitEditing: PropTypes.func,
        autoFocus: PropTypes.bool,
    }),
    style: PropTypes.shape({
        container: Animated.View.propTypes.style,
        leftElementContainer: View.propTypes.style,
        leftElement: Text.propTypes.style,
        centerElementContainer: Animated.View.propTypes.style,
        titleText: Text.propTypes.style,
        rightElementContainer: View.propTypes.style,
        rightElement: Text.propTypes.style,
    }),
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
    onRightElementPress: PropTypes.func,
};
const defaultProps = {
    elevation: 4,
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { toolbar } = context.uiTheme;

    const container = {};

    if (props.translucent) {
        container.position = 'absolute';
        container.elevation = 0;
        container.top = 0;
        container.left = 0;
        container.right = 0;
    }

    return {
        container: [
            toolbar.container,
            container,
            props.style.container,
        ],
        leftElementContainer: [
            toolbar.leftElementContainer,
            props.style.leftElementContainer,
        ],
        leftElement: [
            toolbar.leftElement,
            props.style.leftElement,
        ],
        centerElementContainer: [
            toolbar.centerElementContainer,
            props.style.centerElementContainer,
        ],
        titleText: [
            toolbar.titleText,
            props.style.titleText,
        ],
        rightElementContainer: [
            toolbar.rightElementContainer,
            props.style.rightElementContainer,
        ],
        rightElement: [
            toolbar.rightElement,
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
            searchValue: '',
        });
    };
    onSearchClosePressed = () => {
        const { searchable } = this.props;

        if (isFunction(searchable.onSearchClosed)) {
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
        const { leftElement, onLeftElementPress } = this.props;
        const { spacing } = this.context.uiTheme;

        if (!leftElement) {
            return null;
        }

        let iconName = leftElement;
        let onPress = onLeftElementPress;

        if (this.state.isSearchActive) {
            iconName = 'arrow-back';
            onPress = this.onSearchClosePressed;
        }

        const flattenLeftElement = StyleSheet.flatten(style.leftElement);

        return (
            <View style={style.leftElementContainer}>
                <IconToggle color={flattenLeftElement.color} onPress={onPress}>
                    <Icon
                        name={iconName}
                        size={spacing.iconSize}
                        color={flattenLeftElement.color}
                        style={style.leftElement}
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
    renderRightElement = (style) => {
        const { rightElement, onRightElementPress, searchable } = this.props;
        const { spacing } = this.context.uiTheme;

        if (!rightElement && !searchable) {
            return null;
        }

        let actionsMap = [];

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
        let result = [];

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
                            style={style.rightElement}
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

        if (this.state.isSearchActive && this.state.searchValue.length > 0) {
            result.push(
                <IconToggle
                    key="searchClear"
                    color={flattenRightElement.color}
                    onPress={() => this.onSearchTextChanged('')}
                >
                    <Icon
                        name="clear"
                        size={spacing.iconSize}
                        color={flattenRightElement.color}
                        style={style.rightElement}
                    />
                </IconToggle>
            );
        }

        if (searchable && !this.state.isSearchActive) {
            result.push(
                <IconToggle
                    key="searchIcon"
                    color={flattenRightElement.color}
                    onPress={this.onSearchPressed}
                >
                    <Icon
                        name="search"
                        size={spacing.iconSize}
                        color={flattenRightElement.color}
                        style={style.rightElement}
                    />
                </IconToggle>
            );
        }
        if (rightElement && rightElement.menu && !this.state.isSearchActive) {
            result.push(
                <IconToggle
                    key="menuIcon"
                    color={flattenRightElement.color}
                    onPress={() => this.onMenuPressed(rightElement.menu.labels)}
                >
                    <Icon
                        ref="menu"
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
        const styles = getStyles(this.props, this.context);

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
