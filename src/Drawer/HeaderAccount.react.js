/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import ListItem from '../ListItem';
import { ViewPropTypes } from '../utils';
import withTheme from '../styles/withTheme';

const propTypes = {
  avatar: PropTypes.element,
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.element,
      onPress: PropTypes.func,
    }),
  ),
  footer: PropTypes.shape(ListItem.propTypes), // eslint-disable-line
  style: PropTypes.shape({
    container: ViewPropTypes.style,
    accountContainer: ViewPropTypes.style,
    topContainer: ViewPropTypes.style,
    avatarsContainer: ViewPropTypes.style,
    activeAvatarContainer: ViewPropTypes.style,
    inactiveAvatarContainer: ViewPropTypes.style,
  }),
  /**
   * Theme
   */
  theme: PropTypes.any, // eslint-disable-line
};
const defaultProps = {
  avatar: null,
  accounts: null,
  footer: null,
  style: {},
};

function getStyles(props) {
  const { drawerHeaderAccount } = props.theme;

  return {
    container: [drawerHeaderAccount.container, props.style.container],
    accountContainer: [
      drawerHeaderAccount.accountContainer,
      props.style.accountContainer,
    ],
    topContainer: [drawerHeaderAccount.topContainer, props.style.topContainer],
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

class HeaderAcount extends PureComponent {
  componentWillMount = () => {
    // We need to change state if relevant props are changed
    this.setState({
      styles: getStyles(this.props),
    });
  };

  renderFooter = () => {
    const { footer, theme } = this.props;

    if (!footer) {
      return null;
    }

    const props = {
      ...footer,
      style: theme.drawerHeaderListItem,
    };

    return <ListItem {...props} />;
  };

  renderAccount = account => {
    const { styles } = this.state;

    // invariant(account.key, 'Please provide key prop to account object in accounts array.');

    return (
      <TouchableWithoutFeedback key={account.key} onPress={account.onPress}>
        <View style={[styles.inactiveAvatarContainer]}>{account.avatar}</View>
      </TouchableWithoutFeedback>
    );
  };

  renderAccounts = () => {
    const { accounts } = this.props;

    if (!accounts) {
      return null;
    }

    // TODO: slice of accounts
    // add more soficticated slice when there will be lots of accounts
    return accounts.slice(0, 3).map(this.renderAccount);
  };

  render() {
    const { avatar } = this.props;
    const { styles } = this.state;

    return (
      <View style={styles.container}>
        <View style={[styles.accountContainer]}>
          <View style={[styles.topContainer]}>
            <View style={[styles.avatarsContainer]}>
              <View style={[styles.activeAvatarContainer]}>
                {React.cloneElement(avatar, { size: 56 })}
              </View>
              {this.renderAccounts()}
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

export default withTheme(HeaderAcount);
