import { THEME_NAME } from './config';
import { View } from 'react-native';
import React, { Component, PropTypes } from 'react';

const styles = {
    divider: {
        height: 1
    }
};

export default class Divider extends Component {

    static propTypes = {
        inset: PropTypes.bool,
        theme: PropTypes.oneOf(THEME_NAME),
        style: PropTypes.object
    };

    static defaultProps = {
        inset: false,
        theme: 'light'
    };

    render() {
        const { inset, theme, style } = this.props;

        const backgroundColor = theme === 'light' ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.12)';

        return (
            <View
              style={[styles.divider, inset && { marginLeft: 72 }, { backgroundColor }, style]}
            />
        );
    }
}
