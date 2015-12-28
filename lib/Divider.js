import React, { Component, StyleSheet, PropTypes, View } from 'react-native';
import { THEME_NAME } from './config';

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

        return (
            <View
                style={[
                    styles.divider,
                    style,
                    inset && { marginLeft: 72 }, {
                        backgroundColor: theme === 'light' ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.12)'
                    },
                ]}
            />
        );
    }
}

const styles = {
    divider: {
        height: 1
    }
};