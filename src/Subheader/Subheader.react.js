/* eslint-disable import/no-unresolved, import/extensions */
import { View, Text } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import { ViewPropTypes } from '../utils';
import withTheme from '../styles/withTheme';

const propTypes = {
  text: PropTypes.string.isRequired,
  inset: PropTypes.bool,
  lines: PropTypes.number,
  style: PropTypes.shape({
    contaienr: ViewPropTypes.style,
    text: Text.propTypes.style, // eslint-disable-line
  }),
};
const defaultProps = {
  style: {},
  inset: false,
  lines: 1,
};

function getStyles(props) {
  const { subheader } = props.theme;

  return {
    container: [
      subheader.container,
      { paddingLeft: props.inset ? 72 : 16 },
      props.style.container,
    ],
    text: [subheader.text, props.style.text],
  };
}

class Subheader extends PureComponent {
  render() {
    const { text, lines } = this.props;

    const styles = getStyles(this.props);

    return (
      <View style={styles.container}>
        <Text numberOfLines={lines} style={styles.text}>
          {text}
        </Text>
      </View>
    );
  }
}

Subheader.propTypes = propTypes;
Subheader.defaultProps = defaultProps;

export default withTheme(Subheader);
