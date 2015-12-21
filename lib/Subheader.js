import React, { Component, StyleSheet, PropTypes, View, Text } from 'react-native';
import { TYPO, THEME_NAME } from './config';
import { getColor } from './helpers';

export default class Subheader extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        color: PropTypes.string,
        inset: PropTypes.bool,
        theme: PropTypes.oneOf(THEME_NAME)
    };

    static defaultProps = {
        color: 'rgba(0,0,0,.54)',
        inset: false,
        theme: 'light'
    };

    render() {
        const { text, color, inset } = this.props;

        return (
            <View
                style={[styles.container, {
                    paddingLeft: inset ? 72 : 16
                }]}
            >
                <Text
                    style={[styles.text, {
                        color: getColor(color),
                        fontWeight: '500'
                    }]}
                >
                    {text}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    text: TYPO.paperFontBody1
});