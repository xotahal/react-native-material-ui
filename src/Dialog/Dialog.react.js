/* eslint-disable import/no-unresolved, import/extensions */
import { View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import RippleFeedback from '../RippleFeedback';
import { ViewPropTypes } from '../utils';
import withTheme from '../styles/withTheme';

import Title from './Title.react';
import Content from './Content.react';
import Actions from './Actions.react';

const propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({
    container: ViewPropTypes.style,
  }),
};
const defaultProps = {
  onPress: null,
  style: {},
};

function getStyles(props) {
  const { dialog } = props.theme;

  return {
    container: [dialog.container, props.style.container],
  };
}

class Dialog extends PureComponent {
  renderContent = () => {
    const { children } = this.props;
    const styles = getStyles(this.props);

    return (
      <View style={styles.container} pointerEvents="auto">
        {children}
      </View>
    );
  };

  render() {
    const { onPress } = this.props;

    if (onPress) {
      return (
        <RippleFeedback onPress={onPress}>
          {this.renderContent()}
        </RippleFeedback>
      );
    }

    return this.renderContent();
  }
}

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;

Dialog.Title = Title;
Dialog.Content = Content;
Dialog.Actions = Actions;

export default withTheme(Dialog);
