/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import Button from '../Button';
import { ViewPropTypes } from '../utils';
import withTheme from '../styles/withTheme';

const propTypes = {
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onActionPress: PropTypes.func.isRequired,
  options: PropTypes.objectOf(PropTypes.object),
  style: PropTypes.shape({
    stackedActionsContainer: ViewPropTypes.style,
  }),
};
const defaultProps = {
  style: {},
  options: {},
};

function getStyles(props) {
  const { dialog } = props.theme;

  return {
    stackedActionsContainer: [
      dialog.stackedActionsContainer,
      props.style.stackedActionsContainer,
    ],
  };
}

class DialogStackedActions extends PureComponent {
  renderAction(action) {
    const { options, onActionPress } = this.props;
    const isButtonDisabled =
      options[`${action}`] && options[`${action}`].disabled;

    return (
      <Button
        key={action}
        primary
        disabled={isButtonDisabled}
        text={action}
        onPress={onActionPress}
        style={{
          container: {
            justifyContent: 'flex-end',
          },
        }}
      />
    );
  }

  render() {
    const { actions } = this.props;

    const styles = getStyles(this.props);

    return (
      <View style={styles.stackedActionsContainer}>
        {actions.map(action => this.renderAction(action))}
      </View>
    );
  }
}

DialogStackedActions.propTypes = propTypes;
DialogStackedActions.defaultProps = defaultProps;

export default withTheme(DialogStackedActions);
