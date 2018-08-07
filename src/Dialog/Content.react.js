/* eslint-disable import/no-unresolved, import/extensions */
import { View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import { ViewPropTypes } from '../utils';
import withTheme from '../styles/withTheme';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({
    contentContainer: ViewPropTypes.style,
  }),
};
const defaultProps = {
  style: {},
};

function getStyles(props) {
  const { dialog } = props.theme;

  return {
    contentContainer: [dialog.contentContainer, props.style.contentContainer],
  };
}

class DialogContent extends PureComponent {
  render() {
    const { children } = this.props;

    const styles = getStyles(this.props, this.context);

    return <View style={styles.contentContainer}>{children}</View>;
  }
}

DialogContent.propTypes = propTypes;
DialogContent.defaultProps = defaultProps;

export default withTheme(DialogContent);
