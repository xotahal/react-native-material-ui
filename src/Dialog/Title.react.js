/* eslint-disable import/no-unresolved, import/extensions */
import { View, Text } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import { ViewPropTypes } from '../utils';
import withTheme from '../styles/withTheme';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({
    titleContainer: ViewPropTypes.style,
    titleText: Text.propTypes.style, // eslint-disable-line
  }),
};
const defaultProps = {
  style: {},
};

function getStyles(props) {
  const { dialog } = props.theme;

  return {
    titleContainer: [dialog.titleContainer, props.style.titleContainer],
    titleText: [dialog.titleText, props.style.titleText],
  };
}

class DialogHeader extends PureComponent {
  render() {
    const { children } = this.props;

    const styles = getStyles(this.props);

    return (
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{children}</Text>
      </View>
    );
  }
}

DialogHeader.propTypes = propTypes;
DialogHeader.defaultProps = defaultProps;

export default withTheme(DialogHeader);
