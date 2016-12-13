/* eslint-disable import/no-unresolved, import/extensions */
import { Component, PropTypes } from 'react';
/* eslint-enable import/no-unresolved, import/extensions */
import getTheme from './getTheme';

const propTypes = {
    children: PropTypes.element,
    uiTheme: PropTypes.object,
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
