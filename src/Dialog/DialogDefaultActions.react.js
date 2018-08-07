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
  options: PropTypes.objectOf(PropTypes.object),
  onActionPress: PropTypes.func.isRequired,
  style: PropTypes.shape({
    defaultActionsContainer: ViewPropTypes.style,
  }),
};
const defaultProps = {
  style: {},
  options: {},
};

function getStyles(props) {
  const { dialog } = props.theme;

  return {
    defaultActionsContainer: [
      dialog.defaultActionsContainer,
      props.style.defaultActionsContainer,
    ],
  };
}

class DialogDefaultActions extends PureComponent {
  constructor(props) {
    super(props);

    this.onActionPressed = this.onActionPressed.bind(this);
  }

  onActionPressed(action) {
    const { onActionPress } = this.props;

    if (onActionPress) {
      onActionPress(action);
    }
  }

  renderAction(action) {
    const { options } = this.props;
    const isButtonDisabled =
      options[`${action}`] && options[`${action}`].disabled;

    return (
      <Button
        key={action}
        primary
        disabled={isButtonDisabled}
        text={action}
        onPress={this.onActionPressed}
        style={{
          container: {
            marginLeft: 8,
            paddingHorizontal: 8,
          },
        }}
      />
    );
  }

  render() {
    const { actions } = this.props;
    const styles = getStyles(this.props);

    return (
      <View style={styles.defaultActionsContainer}>
        {actions.map(action => this.renderAction(action))}
      </View>
    );
  }
}

DialogDefaultActions.propTypes = propTypes;
DialogDefaultActions.defaultProps = defaultProps;

export default withTheme(DialogDefaultActions);
