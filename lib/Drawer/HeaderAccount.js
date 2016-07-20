import { View, Text, TouchableWithoutFeedback } from 'react-native';
import IconToggle from '../IconToggle';
import React, { Component, PropTypes } from 'react';


const styles = {
    accountContainer: {
        flex: 1,
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    activeAvatarContainer: {
        flex: 1,
    },
    inactiveAvatarContainer: {
        paddingLeft: 8,
    },
    topContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    avatarsContainer: {
        flexDirection: 'row',
    },
    bottomContainer: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
    },
    firstLineContainer: {
    },
    primaryText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
};

export default class HeaderAcount extends Component {

    static propTypes = {
        accounts: PropTypes.arrayOf(PropTypes.shape({
            avatar: PropTypes.element,
            onPress: PropTypes.func,
        })),
        avatar: PropTypes.element,
        height: PropTypes.number,
        onPress: PropTypes.func,
        onRightIconPress: PropTypes.func,
        primaryText: PropTypes.string,
        rightIcon: PropTypes.element,
        secondaryText: PropTypes.string,
    };
    static defaultProps = {
        height: 150,
    };

    render() {
        const {
            accounts,
            avatar,
            primaryText,
            secondaryText,
            rightIcon,
            onPress,
            onRightIconPress,
        } = this.props;

        const primaryColor = 'rgba(0,0,0,.87)';

        return (
            <View style={[styles.accountContainer]}>
                <View style={[styles.topContainer]}>
                    <View style={[styles.avatarsContainer]}>
                        <View style={[styles.activeAvatarContainer]}>
                            {React.cloneElement(avatar, { size: 56 })}
                        </View>
                        {
                            // TODO: slice of accounts
                            // add more soficticated slice when there will be lots of accounts
                            accounts &&
                            accounts.slice(0, 3).map((account, index) =>
                                <TouchableWithoutFeedback key={index} onPress={account.onPress}>
                                    <View style={[styles.inactiveAvatarContainer]}>
                                        {account.avatar}
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={onPress}>
                    <View style={[styles.bottomContainer]}>
                        <View style={[styles.textContainer]}>
                            <Text style={[styles.primaryText]}>
                                {primaryText}
                            </Text>
                            {
                                secondaryText &&
                                    <Text>
                                        {secondaryText}
                                    </Text>
                            }
                        </View>
                        <View style={[styles.iconContainer]}>
                            <IconToggle color={primaryColor} onPress={onRightIconPress} >
                                {rightIcon}
                            </IconToggle>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
