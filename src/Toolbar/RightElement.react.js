/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, NativeModules, findNodeHandle } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */

import IconToggle from '../IconToggle';
import isFunction from '../utils/isFunction';

const UIManager = NativeModules.UIManager;

const propTypes = {
    isSearchActive: PropTypes.bool.isRequired,
    searchValue: PropTypes.string.isRequired,
    searchable: PropTypes.object,
    style: PropTypes.object,
    size: PropTypes.number,
    rightElement: PropTypes.any,
    onRightElementPress: PropTypes.func,
    onSearchClearRequest: PropTypes.func.isRequired,
    onSearchPress: PropTypes.func.isRequired,
    onFiltersPress: PropTypes.func.isRequired,
};
const defaultProps = {
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { isSearchActive } = props;
    const { toolbar, toolbarSearchActive } = context.uiTheme;

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
            },
        );
    };
    onSearchPressed = () => {
        const { onSearchPress } = this.props;

        if (isFunction(onSearchPress)) {
            onSearchPress();
        }
    };
    onFiltersPressed = () => {
        const { onFiltersPress } = this.props;

        if (isFunction(onFiltersPress)) {
            onFiltersPress();
        }
    };

    render() {
        const {
            isSearchActive,
            rightElement,
            onRightElementPress,
            searchable,
            size,
            searchValue,
            onSearchClearRequest,
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
                        key={index}
                        name={action}
                        color={flattenRightElement.color}
                        size={size}
                        style={flattenRightElement}
                        onPress={() =>
                            onRightElementPress && onRightElementPress({ action, index })
                        }
                    />
                );
            });
        }

        if (React.isValidElement(rightElement)) {
            result.push(React.cloneElement(rightElement, { key: 'customRightElement' }));
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
                        name="search"
                        color={flattenRightElement.color}
                        size={size}
                        style={flattenRightElement}
                        onPress={this.onSearchPressed}
                    />,
                );
                if (rightElement.filters) {
                    result.push(
                        <IconToggle
                            key="filtersIcon"
                            name="filter-list"
                            color={flattenRightElement.color}
                            size={size}
                            style={flattenRightElement}
                            onPress={this.onFiltersPressed}
                        />,
                    );
                }
            }
        }

        console.log('ALALA', rightElement);

        if (rightElement && rightElement.menu && !isSearchActive) {
            result.push(
                <View key="menuIcon">
                    {/* We need this view as an anchor for drop down menu. findNodeHandle can
                        find just view with width and height, even it needs backgroundColor :/
                    */}
                    <View
                        ref={(c) => { this.menu = c; }}
                        style={{
                            backgroundColor: 'transparent',
                            width: 1,
                            height: StyleSheet.hairlineWidth,
                        }}
                    />
                    <IconToggle
                        name="more-vert"
                        color={flattenRightElement.color}
                        size={size}
                        onPress={() => this.onMenuPressed(rightElement.menu.labels)}
                        style={flattenRightElement}
                    />
                </View>,
            );
        }

        return (
            <View style={styles.rightElementContainer}>
                {result}
            </View>
        );
    }
}

RightElement.propTypes = propTypes;
RightElement.defaultProps = defaultProps;
RightElement.contextTypes = contextTypes;

export default RightElement;
