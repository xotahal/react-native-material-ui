/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    NativeModules,
    findNodeHandle,
} from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import { ViewPropTypes } from '../utils';

import Divider from '../Divider';
import Icon from '../Icon';
import IconToggle from '../IconToggle';
import RippleFeedback from '../RippleFeedback';

const { UIManager } = NativeModules;

const propTypes = {
    // generally
    dense: PropTypes.bool,
    // should render divider after list item?
    divider: PropTypes.bool,
    onPress: PropTypes.func,
    onPressValue: PropTypes.any, // eslint-disable-line
    /**
    * Called when list item is long pressed.
    */
    onLongPress: PropTypes.func,
    numberOfLines: PropTypes.oneOf([1, 2, 3, 'dynamic']),
    style: PropTypes.shape({
        container: ViewPropTypes.style,
        contentViewContainer: ViewPropTypes.style,
        leftElementContainer: ViewPropTypes.style,
        centerElementContainer: ViewPropTypes.style,
        textViewContainer: ViewPropTypes.style,
        primaryText: Text.propTypes.style,
        firstLine: ViewPropTypes.style,
        primaryTextContainer: Text.propTypes.style,
        secondaryText: Text.propTypes.style,
        tertiaryText: Text.propTypes.style,
        rightElementContainer: ViewPropTypes.style,
        leftElement: ViewPropTypes.style,
        rightElement: ViewPropTypes.style,
    }),

    // left side
    leftElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
    onLeftElementPress: PropTypes.func,

    // center side
    centerElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.shape({
            primaryText: PropTypes.string.isRequired,
            secondaryText: PropTypes.string,
            tertiaryText: PropTypes.string,
        }),
    ]),

    // right side
    rightElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.shape({
            menu: PropTypes.shape({
                labels: PropTypes.array.isRequired,
            }),
        }),
    ]),
    onRightElementPress: PropTypes.func,
    /**
     * Children passed into the `ListItem`.
     */
    children: PropTypes.node,
};
const defaultProps = {
    dense: false,
    onPress: null,
    onPressValue: null,
    onLongPress: null,
    divider: false,
    leftElement: null,
    onLeftElementPress: null,
    centerElement: null,
    rightElement: null,
    onRightElementPress: null,
    numberOfLines: 1,
    children: null,
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getNumberOfSecondaryTextLines(numberOfLines) {
    if (numberOfLines === 'dynamic') {
        return null;
    }

    return numberOfLines - 1;
}
function getNumberOfLines(props) {
    const { numberOfLines, centerElement } = props;

    if (centerElement && centerElement.secondaryText && centerElement.tertiaryText
        && (!numberOfLines || numberOfLines < 3)) {
        return 3;
    } else if (centerElement && centerElement.secondaryText &&
        (!numberOfLines || numberOfLines < 2)) {
        return 2;
    }

    return numberOfLines || 1;
}
/**
* Please see this: https://material.google.com/components/lists.html#lists-specs
*/
function getListItemHeight(props, state) {
    const { leftElement, dense } = props;
    const { numberOfLines } = state;

    if (numberOfLines === 'dynamic') {
        return null;
    }

    if (!leftElement && numberOfLines === 1) {
        return dense ? 40 : 48;
    }

    if (numberOfLines === 1) {
        return dense ? 48 : 56;
    } else if (numberOfLines === 2) {
        return dense ? 60 : 72;
    } else if (numberOfLines === 3) {
        return dense ? 80 : 88;
    }

    return null;
}
function getStyles(props, context, state) {
    const { leftElement, rightElement } = props;
    const { listItem } = context.uiTheme;
    const { numberOfLines } = state;


    const container = {
        height: getListItemHeight(props, state),
    };
    const contentViewContainer = {};
    const leftElementContainer = {};
    const centerElementContainer = {};

    if (numberOfLines === 'dynamic') {
        contentViewContainer.paddingVertical = 16;
        leftElementContainer.alignSelf = 'flex-start';
    }

    if (!rightElement) {
        contentViewContainer.paddingRight = 16;
    }
    if (!leftElement) {
        centerElementContainer.paddingLeft = 16;
    }

    return {
        container: [
            listItem.container,
            container,
            props.style.container,
        ],
        content: [
            listItem.content,
            props.style.content,
        ],
        contentViewContainer: [
            listItem.contentViewContainer,
            contentViewContainer,
            props.style.contentViewContainer,
        ],
        leftElementContainer: [
            listItem.leftElementContainer,
            leftElementContainer,
            props.style.leftElementContainer,
        ],
        centerElementContainer: [
            listItem.centerElementContainer,
            centerElementContainer,
            props.style.centerElementContainer,
        ],
        textViewContainer: [
            listItem.textViewContainer,
            props.style.textViewContainer,
        ],
        primaryText: [
            listItem.primaryText,
            props.style.primaryText,
        ],
        firstLine: [
            listItem.firstLine,
            props.style.firstLine,
        ],
        primaryTextContainer: [
            listItem.primaryTextContainer,
            props.style.primaryTextContainer,
        ],
        secondaryText: [
            listItem.secondaryText,
            props.style.secondaryText,
        ],
        tertiaryText: [
            listItem.tertiaryText,
            props.style.tertiaryText,
        ],
        rightElementContainer: [
            listItem.rightElementContainer,
            props.style.rightElementContainer,
        ],
        leftElement: [
            listItem.leftElement,
            props.style.leftElement,
        ],
        rightElement: [
            listItem.rightElement,
            props.style.rightElement,
        ],
    };
}

class ListItem extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            numberOfLines: getNumberOfLines(props),
        };
    }
    componentWillReceiveProps(nextPros) {
        this.setState({ numberOfLines: getNumberOfLines(nextPros) });
    }
    onMenuPressed = (labels) => {
        const { onRightElementPress, onPressValue } = this.props;

        UIManager.showPopupMenu(
            findNodeHandle(this.menu),
            labels,
            () => {},
            (result, index) => {
                if (onRightElementPress) {
                    onRightElementPress({
                        action: 'menu',
                        result,
                        index,
                        value: onPressValue,
                    });
                }
            },
        );
    };
    onListItemPressed = () => {
        const { onPress, onPressValue } = this.props;

        if (onPress) {
            onPress(onPressValue);
        }
    };
    onListItemLongPressed = () => {
        const { onLongPress, onPressValue } = this.props;

        if (onLongPress) {
            onLongPress(onPressValue);
        }
    };
    onLeftElementPressed = () => {
        const { onLeftElementPress, onPress, onPressValue } = this.props;

        if (onLeftElementPress) {
            onLeftElementPress(onPressValue);
        } else if (onPress) {
            onPress(onPressValue);
        }
    };
    onRightElementPressed = () => {
        const { onRightElementPress, onPressValue } = this.props;

        if (onRightElementPress) {
            onRightElementPress(onPressValue);
        }
    };
    getPointerEvents = () => {
        // 'box-only' fixes misplaced ripple effect, but ruins click events for subviews.
        // It's suitable only for simple cases with no touchable views, except the main one.
        const {
            onLeftElementPress, leftElement, centerElement, rightElement,
        } = this.props;
        return onLeftElementPress ||
            React.isValidElement(leftElement) ||
            React.isValidElement(centerElement) ||
            rightElement ? 'auto' : 'box-only';
    }
    renderLeftElement = (styles) => {
        const { leftElement } = this.props;

        if (!leftElement) {
            return null;
        }

        const flattenLeftElement = StyleSheet.flatten(styles.leftElement);
        let content = null;

        if (typeof leftElement === 'string') {
            content = (
                <TouchableWithoutFeedback onPress={this.onLeftElementPressed}>
                    <Icon name={leftElement} color={flattenLeftElement.color} />
                </TouchableWithoutFeedback>
            );
        } else {
            content = (
                <TouchableWithoutFeedback onPress={this.onLeftElementPressed}>
                    <View>
                        {leftElement}
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        return (
            <View style={styles.leftElementContainer}>
                {content}
            </View>
        );
    }
    renderCenterElement = (styles) => {
        const { centerElement } = this.props;
        const numberOfLines = getNumberOfSecondaryTextLines(this.state.numberOfLines);
        let content = null;

        if (React.isValidElement(centerElement)) {
            content = centerElement;
        } else if (centerElement) {
            let primaryText = null;
            let secondaryText = null;
            let tertiaryText = null;

            if (typeof centerElement === 'string') {
                primaryText = centerElement;
            } else {
                /* eslint-disable prefer-destructuring */
                primaryText = centerElement.primaryText;
                secondaryText = centerElement.secondaryText;
                tertiaryText = centerElement.tertiaryText;
                /* eslint-enable prefer-destructuring */
            }
            const secondLineNumber = !tertiaryText ? numberOfLines : 1;
            const thirdLineNumber = tertiaryText ? numberOfLines : 1;
            content = (
                <View style={styles.textViewContainer}>
                    <View style={styles.firstLine}>
                        <View style={styles.primaryTextContainer}>
                            <Text numberOfLines={1} style={styles.primaryText}>
                                {primaryText}
                            </Text>
                        </View>
                    </View>
                    {secondaryText &&
                        <View>
                            <Text numberOfLines={secondLineNumber} style={styles.secondaryText}>
                                {secondaryText}
                            </Text>
                        </View>
                    }
                    {tertiaryText &&
                        <View>
                            <Text numberOfLines={thirdLineNumber} style={styles.tertiaryText}>
                                {tertiaryText}
                            </Text>
                        </View>
                    }
                </View>
            );
        }

        return (
            <View style={styles.centerElementContainer}>
                {content}
            </View>
        );
    }
    renderRightElement = (styles) => {
        const { rightElement } = this.props;

        let content = [];
        let elements = null;

        if (typeof rightElement === 'string') {
            elements = [rightElement];
        } else if (Array.isArray(rightElement)) {
            elements = rightElement;
        } else if (rightElement && rightElement.actions) {
            elements = rightElement.actions;
        }

        const flattenRightElement = StyleSheet.flatten(styles.rightElement);

        if (elements) {
            content = elements.map(action => (
                <IconToggle
                    key={action}
                    color={flattenRightElement.color}
                    name={action}
                    size={24}
                    style={styles.rightElement}
                    onPress={() => this.onRightElementPressed({ action })}
                />
            ));
        }

        if (React.isValidElement(rightElement)) {
            content.push(React.cloneElement(rightElement, { key: 'customRightElement' }));
        }

        if (rightElement && rightElement.menu) {
            // We need this view as an anchor for drop down menu. findNodeHandle can
            // find just view with width and height, even it needs backgroundColor :/
            content.push((
                <View key="menuIcon">
                    <View
                        ref={(c) => { this.menu = c; }}
                        style={{
                            backgroundColor: 'transparent',
                            width: StyleSheet.hairlineWidth,
                            height: StyleSheet.hairlineWidth,
                        }}
                    />
                    <IconToggle
                        name={rightElement.menu.icon || 'more-vert'}
                        color={flattenRightElement.color}
                        onPress={() => this.onMenuPressed(rightElement.menu.labels)}
                        style={flattenRightElement}
                    />
                </View>
            ));
        }

        return (
            <View style={styles.rightElementContainer}>
                {content}
            </View>
        );
    }
    renderDivider = () => {
        const { divider } = this.props;

        if (!divider) {
            return null;
        }

        return <Divider />;
    }
    renderContent = styles => (
        <View style={styles.contentViewContainer} pointerEvents={this.getPointerEvents()}>
            {this.renderLeftElement(styles)}
            {this.renderCenterElement(styles)}
            {this.renderRightElement(styles)}
        </View>
    )
    render() {
        const { onPress, onLongPress } = this.props;

        const styles = getStyles(this.props, this.context, this.state);

        // renders left element, center element and right element
        let content = (
            <View style={styles.container}>
                {this.renderContent(styles)}
            </View>
        );

        if (onPress || onLongPress) {
            content = (
                <RippleFeedback
                    delayPressIn={50}
                    onPress={this.onListItemPressed}
                    onLongPress={this.onListItemLongPressed}
                >
                    {content}
                </RippleFeedback>
            );
        }


        return (
            <View>
                {content}
                {this.renderDivider()}
            </View>
        );
    }
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;
ListItem.contextTypes = contextTypes;

export default ListItem;
