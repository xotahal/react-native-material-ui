import React, { Component, StyleSheet, PropTypes, View, Text } from 'react-native';
import { TYPO, THEME_NAME } from './config';

export default class Subheader extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        primaryColor: PropTypes.string,
        inset: PropTypes.bool,
        theme: PropTypes.oneOf(THEME_NAME)
    };

    static defaultProps = {
        primaryColor: 'rgba(0,0,0,.54)',
        inset: false,
        theme: 'light'
    };

    render() {
        const { text, primaryColor, inset } = this.props;

        return (
            <View
                style={[styles.container, {
                    paddingLeft: inset ? 72 : 16
                }]}
            >
                <Text
                    style={[styles.text, {
                        color: primaryColor,
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