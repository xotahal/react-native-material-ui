/* eslint-disable import/no-unresolved, import/extensions */
import { View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import { ViewPropTypes } from '../utils';
import withTheme from '../styles/withTheme';

const propTypes = {
  inset: PropTypes.bool,
  style: PropTypes.shape({
    container: ViewPropTypes.style,
  }),
};
const defaultProps = {
  inset: false,
  style: {},
};

function getStyles(props) {
  const { divider } = props.theme;

  const local = {
    container: props.inset ? { marginLeft: 72 } : null,
  };

  return {
    container: [divider.container, local.container, props.style.container],
  };
}

class Divider extends PureComponent {
  render() {
    const styles = getStyles(this.props, this.context);

    return <View style={styles.container} />;
  }
}

Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;

export default withTheme(Divider);
