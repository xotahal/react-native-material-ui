/* eslint-disable import/no-unresolved, import/extensions */
import { View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import RippleFeedback from '../RippleFeedback';
import { ViewPropTypes } from '../utils';
import withTheme from '../styles/withTheme';

const propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  style: PropTypes.shape({
    container: ViewPropTypes.style,
  }),
};
const defaultProps = {
  children: null,
  onPress: null,
  style: {},
};

function getStyles(props) {
  const { card } = props.theme;

  const local = {};

  if (props.fullWidth) {
    local.container = {
      marginHorizontal: 0,
    };
  }

  return {
    container: [card.container, local.container, props.style.container],
  };
}

class Card extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      styles: getStyles(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ styles: getStyles(nextProps) });
  }

  renderContent = () => {
    const { children } = this.props;
    const { styles } = this.state;

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

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default withTheme(Card);
