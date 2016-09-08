import React, { Component, PropTypes } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import ListItem from '../ListItem';

const propTypes = {
    avatar: PropTypes.element,
    accounts: PropTypes.arrayOf(PropTypes.shape({
        avatar: PropTypes.element,
        onPress: PropTypes.func,
    })),
    footer: PropTypes.object,
};
const defaultProps = {
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { drawerHeaderAccount } = context.uiTheme;

    return {
        container: [
            drawerHeaderAccount.container,
            props.style.container,
        ],
        accountContainer: [
            drawerHeaderAccount.accountContainer,
            props.style.accountContainer,
        ],
        topContainer: [
            drawerHeaderAccount.topContainer,
            props.style.topContainer,
        ],
        avatarsContainer: [
            drawerHeaderAccount.avatarsContainer,
            props.style.avatarsContainer,
        ],
        activeAvatarContainer: [
            drawerHeaderAccount.activeAvatarContainer,
            props.style.activeAvatarContainer,
        ],
        inactiveAvatarContainer: [
            drawerHeaderAccount.inactiveAvatarContainer,
            props.style.inactiveAvatarContainer,
        ],
    };
}

class HeaderAcount extends Component {
    renderFooter = () => {
        const { footer } = this.props;

        if (!footer) {
            return null;
        }

        const props = {
            ...footer,
            style: this.context.uiTheme.drawerHeaderListItem,
        };

        return <ListItem {...props} />;
    }
    render() {
        const {
            accounts,
            avatar,
        } = this.props;

        const styles = getStyles(this.props, this.context);

        return (
            <View style={styles.container}>
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
                </View>
                {this.renderFooter()}

            </View>
        );
    }
}

HeaderAcount.propTypes = propTypes;
HeaderAcount.defaultProps = defaultProps;
HeaderAcount.contextTypes = contextTypes;

export default HeaderAcount;
