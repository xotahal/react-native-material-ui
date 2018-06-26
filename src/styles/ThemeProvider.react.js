/* eslint-disable import/no-unresolved, import/extensions */
import { Component } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import getTheme from './getTheme';

const propTypes = {
  children: PropTypes.element.isRequired,
  // TODO: flowtype
  uiTheme: PropTypes.object, // eslint-disable-line
};
const defaultProps = {
  uiTheme: {},
};
const childContextTypes = {
  uiTheme: PropTypes.object.isRequired, // eslint-disable-line
};

class ThemeProvider extends Component {
  getChildContext() {
    const { uiTheme } = this.props;

    return {
      uiTheme: getTheme(uiTheme),
    };
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

ThemeProvider.propTypes = propTypes;
ThemeProvider.defaultProps = defaultProps;
ThemeProvider.childContextTypes = childContextTypes;

export default ThemeProvider;
