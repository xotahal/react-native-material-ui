import Menu from './Menu/Menu';
import React, { Component, StyleSheet, PropTypes, View, Text, TouchableWithoutFeedback, TouchableNativeFeedback} from 'react-native';
import Ripple from './Ripple';
import { TYPO } from './config';
import Icon from './Icon';
import IconToggle from './IconToggle';

const MenuItem = Menu.Item;

export default class List extends Component {

    static propTypes = {
        primaryText: PropTypes.string.isRequired,
        secondaryText: PropTypes.string,
        captionText: PropTypes.string,
        secondaryTextMoreLine: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            style: PropTypes.object
        })),
        leftIcon: PropTypes.element,
        rightIcon: PropTypes.element,
        leftAvatar: PropTypes.element,
        menuActions: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string,
            onPress: PropTypes.func,
            label: PropTypes.string,
            value: PropTypes.object
        })),
        rightAvatar: PropTypes.element,
        lines: PropTypes.number,
        primaryColor: PropTypes.string,
        onPress: PropTypes.func,
        onLeftIconClick: PropTypes.func,
        onRightIconClick: PropTypes.func
    };

    static defaultProps = {
        lines: 1,
        primaryColor: 'rgba(0,0,0,.87)'
    };

    _onMenuPressed = () => {
        if(this.refs.menu){
            this.refs.menu.toggle(this.refs.menuTrigger)
        }
    };

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
            primaryColor,
            onLeftIconClicked,
            onRightIconClicked,
            secondaryTextMoreLine,
            captionText
        } = this.props;

        const rightActions = this._getRightActions();

        return (
            <TouchableNativeFeedback onPress={onPress}>
                <View style={[styles.listContainer, { height: lines > 2 ? ((lines -1) * 16 + 56) : (secondaryText ? 72 : (leftAvatar || rightAvatar ) ? 56 : 48) }]}>
                    {leftIcon &&
                        <TouchableWithoutFeedback onPress={onLeftIconClicked}>
                            <View style={[styles.leftIcon, lines > 2 && { paddingTop: 16, alignSelf: 'flex-start' }]}>
                                {leftIcon}
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    {leftAvatar &&
                        <View style={[styles.leftAvatar, lines > 2 && { paddingTop: 16, alignSelf: 'flex-start' }]}>
                            {leftAvatar}
                        </View>
                    }
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={styles.firstLine}>
                            <View style={styles.primaryTextContainer}>
                                <Text numberOfLines={1} style={[styles.primaryText,{ color: primaryColor }]}>
                                    {primaryText}
                                </Text>
                            </View>
                            {(lines > 2 && !!rightIcon) ||
                                <View style={styles.captionTextContainer}>
                                    <Text style={styles.captionText}>
                                        {captionText}
                                    </Text>
                                </View>
                            }
                        </View>
                        {secondaryText &&
                            <View>
                                <Text style={[{ height:18 }, lines > 2 && { height: 22 * (lines - 1) -4 }, styles.secondaryText]}>
                                    {secondaryText}
                                </Text>
                            </View>
                        }
                        {secondaryTextMoreLine &&
                            <View style={[{ height:18 }, lines > 2 && { height: 22 * (lines - 1) - 4 }]}>
                                {secondaryTextMoreLine.map((line) => (
                                    <Text style={[styles.secondaryText, { height: 22 }, line.style]}>
                                        {line.text}
                                    </Text>
                                ))}
                            </View>
                        }
                    </View>

                    {rightAvatar &&
                        <View
                            style={[styles.rightAvatar, lines > 2 && {
                                paddingTop: 16,
                                alignSelf: 'flex-start'
                            }]}
                        >
                            {rightAvatar}
                        </View>
                    }
                    { rightActions }
                </View>
            </TouchableNativeFeedback>
        )
    }

    _getRightActions() {
        const {
            rightAvatar,
            rightIcon,
            lines,
            menuActions,
            primaryColor,
            onRightIconClicked,
            captionText
        } = this.props;

        let rightIconJsx = null;

        if(menuActions){
            rightIconJsx = (
                <IconToggle
                    color={primaryColor}
                    onPress={() => this._onMenuPressed()}
                    style={styles.rightIcon}
                >
                    <Icon name={'more-vert'}
                        color={primaryColor}
                        ref='menuTrigger'
                        size={24}
                    />
                </IconToggle>
            )
        }else if(rightIcon){
            rightIconJsx = (
                <IconToggle
                    color={primaryColor}
                    onPress={onRightIconClicked}
                >
                    {rightIcon}
                </IconToggle>
            )
        }

        return (
            <View style={{ flexDirection: 'column' }}>
                {
                    lines > 2 && !!rightIconJsx && !!captionText &&
                    <View style={styles.captionTextContainer2}>
                        <Text>{captionText}</Text>
                    </View>
                }
                {
                    rightIconJsx &&
                    <View
                        style={[styles.rightIcon, { flex: 1 },lines > 2 && {
                            paddingTop: 16,
                            alignSelf: 'flex-end',
                            justifyContent:'flex-end'
                        }]}
                    >
                        {rightIconJsx}
                    </View>
                }
                {
                    menuActions &&
                    <Menu ref='menu'>
                        {
                            menuActions.map((action, i) => {
                                return (
                                    <MenuItem
                                        key={i}
                                        label={action.label}
                                        onPress={action.onPress}
                                        value={action.value}
                                    />
                                );
                            })
                        }
                    </Menu>
                }
            </View>

        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        height: 48,
        alignItems: 'center'
    },
    leftIcon: {
        width: 56,
        position: 'relative'
    },
    rightIcon: {
        paddingLeft: 16,
        position: 'relative',
        left: -8
    },
    leftAvatar: {
        width: 56
    },
    rightAvatar: {
        width: 56
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
        flex: 1,
        paddingRight: 16
    },
    captionTextContainer: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start'
    },
    captionText: Object.assign({}, TYPO.paperFontCaption),
    captionTextContainer2: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    }
});
