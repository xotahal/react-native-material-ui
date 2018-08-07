/* eslint-disable import/no-unresolved, import/extensions */
import { View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */

const propTypes = {
  children: PropTypes.node.isRequired,
};

class Container extends PureComponent {
  render() {
    const { children } = this.props;

    return <View style={{ flex: 1 }}>{children}</View>;
  }
}

Container.propTypes = propTypes;

export default Container;
