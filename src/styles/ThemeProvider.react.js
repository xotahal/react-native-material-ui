/* eslint-disable import/no-unresolved, import/extensions */
import { Component } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import getTheme from './getTheme';

const propTypes = {
    children: PropTypes.element.isRequired,
    // TODO: flowtype
    uiTheme: PropTypes.object.isRequired, // eslint-disable-line
};
const childContextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

class ThemeProvider extends Component {
    getChildContext() {
        return {
            uiTheme: getTheme(this.props.uiTheme),
        };
    }

    render() {
        return this.props.children;
    }
}

ThemeProvider.propTypes = propTypes;
ThemeProvider.childContextTypes = childContextTypes;

export default ThemeProvider;
