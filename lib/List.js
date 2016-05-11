import React, {
    Component,
    findNodeHandle,
    StyleSheet,
    PropTypes,
    UIManager,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableNativeFeedback
} from 'react-native';

import { TYPO } from './config';
import Icon from './Icon';
import IconToggle from './IconToggle';

const defaultStyles = StyleSheet.create({
    listContainer: {
        backgroundColor: '#ffffff',
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16
    },

    contentViewContainer: {
        flex: 1,
        flexDirection: 'row',
    },


    leftViewContainer: {
        flexDirection: 'column',
        width: 56
    },
    leftIcon: {
    },
    leftAvatar: {
        flex: 1,
    },

    textViewContainer: {
        flex: 1
    },
    primaryText: Object.assign({}, TYPO.paperFontSubhead, { lineHeight: 24 }),
    secondaryText: Object.assign({}, TYPO.paperFontBody1, {
        lineHeight: 22,
        fontSize: 14,
        color: 'rgba(0,0,0,.54)'
    }),
    firstLine: {
        flexDirection: 'row'
    },
    primaryTextContainer: {
        flex: 1
    },

    rightViewContainer: {
        flexDirection: 'column',
        paddingLeft: 16
    },
    rightActionsViewContainer: {
        flex: 1
    },
    rightIcon: {
        flex: 1,
    },
    rightAvatar: {
        width: 56
    },

    captionText: Object.assign({}, TYPO.paperFontCaption),
    captionTextContainer: {
        flex: 1
    },
    captionTextContainer2: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    }
});

export default class List extends Component {

    static propTypes = {
        dense: PropTypes.bool,
        primaryText: PropTypes.string.isRequired,
        secondaryText: PropTypes.string,
        captionText: PropTypes.string,
        secondaryTextMoreLine: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            style: PropTypes.object
        })),
        leftIcon: PropTypes.element,
        onLeftIconClicked: PropTypes.func,
        rightIcon: PropTypes.element,
        leftAvatar: PropTypes.element,
        menuActions: PropTypes.shape({
            onPress: PropTypes.func,
            labels: PropTypes.array
        }),
        rightAvatar: PropTypes.element,
        lines: React.PropTypes.oneOf([1, 2, 3, 'dynamic']),
        primaryColor: PropTypes.string,
        onPress: PropTypes.func,
        onPressValue: PropTypes.any,
        onLeftIconClick: PropTypes.func,
        onRightIconClick: PropTypes.func
    };

    static defaultProps = {
        lines: 1,
        primaryColor: 'rgba(0,0,0,.87)'
    };
    _handleShowPopupError() { }
    _onMenuPressed = () => {
        const { menuActions } = this.props;

        UIManager.showPopupMenu(
            findNodeHandle(this.refs.menu),
            menuActions.labels,
            this._handleShowPopupError,
            menuActions.onPress
        );
    };
    _onListItemPressed = () => {
        const { onPress, onPressValue } = this.props;

        if (onPress) {
            onPress(onPressValue);
        }
    };
    _onLeftIconPressed = () => {
        const { onLeftIconClicked, onPressValue } = this.props;

        if (onLeftIconClicked) {
            onLeftIconClicked(onPressValue);
        }
    };

    _getStyles() {
        const {
            dense,
            lines,
            secondaryText
        } = this.props;

        let numberOfLines = lines;

        if (secondaryText && (!lines || lines < 2)) {
            numberOfLines = 2;
        }

        const styles = {};

        if (numberOfLines === 3) {
            styles.listContainer = {
                alignItems: 'center',
                height: dense === true ? 76 : 88
            };
        } else if (numberOfLines === 2) {
            styles.listContainer = {
                height: dense === true ? 60 : 72
            };
            styles.contentViewContainer = {
                alignItems: 'center'
            };
        } else if (numberOfLines === 1) {
            styles.listContainer = {
                height: dense === true ? 48 : 56
            };
            styles.contentViewContainer = {
                alignItems: 'center'
            };
        } else if (numberOfLines === 'dynamic') {
            styles.listContainer = {
                alignItems: 'center',
                paddingTop: 16,
                paddingBottom: 16
            };
        }


        return styles;
    }

    render() {
        const {
            primaryText,
            secondaryText,
            leftIcon,
            leftAvatar,
            rightAvatar,
            rightIcon,
            lines,
            menuActions,
            onPress,
            onRightIconClick,
            primaryColor,
            secondaryTextMoreLine,
            captionText
        } = this.props;

        const styles = this._getStyles();

        const content = (
                <View style={[defaultStyles.listContainer, styles.listContainer]}>

                    <View style={[defaultStyles.contentViewContainer, styles.contentViewContainer]}>

                        {
                            (leftIcon || leftAvatar) &&
                            <View
                              style={[defaultStyles.leftViewContainer, styles.leftViewContainer]}
                            >
                                {leftIcon &&
                                    <TouchableWithoutFeedback onPress={this._onLeftIconPressed}>
                                        <View style={[defaultStyles.leftIcon, styles.leftIcon]}>
                                            {leftIcon}
                                        </View>
                                    </TouchableWithoutFeedback>
                                }
                                {leftAvatar &&
                                    <TouchableWithoutFeedback onPress={this._onLeftIconPressed}>
                                        <View style={[defaultStyles.leftAvatar, styles.leftAvatar]}>
                                            {leftAvatar}
                                        </View>
                                    </TouchableWithoutFeedback>
                                }
                            </View>
                        }

                        <View style={defaultStyles.textViewContainer}>
                            <View style={defaultStyles.firstLine}>
                                <View style={defaultStyles.primaryTextContainer}>
                                    <Text
                                      numberOfLines={lines && lines === 'dynamic' ? null : 1}
                                      style={[defaultStyles.primaryText, { color: primaryColor }]}
                                    >
                                        {primaryText}
                                    </Text>
                                </View>
                            </View>
                            {secondaryText &&
                                <View>
                                    <Text
                                      style={[
                                          { height: 18 },
                                          lines > 2 && { height: 22 * (lines - 1) - 4 },
                                          defaultStyles.secondaryText
                                      ]}
                                    >
                                        {secondaryText}
                                    </Text>
                                </View>
                            }
                            {secondaryTextMoreLine &&
                                <View
                                  style={[
                                      { height: 18 },
                                      lines > 2 && { height: 22 * (lines - 1) - 4 }
                                  ]}
                                >
                                    {secondaryTextMoreLine.map((line) => (
                                        <Text style={[
                                            defaultStyles.secondaryText,
                                            { height: 22 },
                                            line.style]}
                                        >
                                            {line.text}
                                        </Text>
                                    ))}
                                </View>
                            }
                        </View>


                        <View style={[defaultStyles.rightViewContainer, styles.rightViewContainer]}>
                            {rightAvatar &&
                                <View style={[defaultStyles.rightAvatar]} >
                                    {rightAvatar}
                                </View>
                            }
                            {
                                lines === 3 && !!rightIcon && !!captionText &&
                                <View style={[defaultStyles.captionTextContainer]} >
                                    <Text style={[defaultStyles.captionText]}>{captionText}</Text>
                                </View>
                            }
                            <View style={[defaultStyles.rightIcon, styles.rightIcon]} >
                                {
                                    menuActions &&
                                    <IconToggle
                                      color={primaryColor}
                                      onPress={this._onMenuPressed}
                                    >
                                        <Icon name={'more-vert'}
                                          color={primaryColor}
                                          ref="menu"
                                          size={24}
                                        />
                                    </IconToggle>
                                }
                                {
                                    rightIcon && !menuActions &&
                                    <IconToggle
                                      color={primaryColor}
                                      onPress={onRightIconClick}
                                    >
                                        {rightIcon}
                                    </IconToggle>
                                }
                            </View>
                        </View>
                    </View>
                </View>
        );

        if (onPress) {
            return (
                <TouchableNativeFeedback onPress={this._onListItemPressed}>
                    {content}
                </TouchableNativeFeedback>
            );
        }

        return content;
    }
}
