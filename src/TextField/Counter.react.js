import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';


function getStyles(props, context) {
    const { textfield, erroredTextfield } = context.uiTheme;
    const { count, limit } = props;

    const styleState = count > limit ?
        StyleSheet.flatten(erroredTextfield.counterText).color :
        StyleSheet.flatten(textfield.counterText).color;

    return {
        counterText: [StyleSheet.flatten(textfield.counterText), StyleSheet.flatten(styleState)],
        counterContainer: textfield.counterContainer,
    };
}

const propTypes = {
    count: PropTypes.number.isRequired,
    limit: PropTypes.number,

    fontSize: PropTypes.number.isRequired,
    style: Text.propTypes.style,
};

const defaultProps = {
    limit: null,
    style: null,
};

const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

class Counter extends PureComponent {
    render() {
        const styles = getStyles(this.props, this.context);
        const {
            count,
            limit,
            fontSize,
            style,
        } = this.props;

        const textStyle = {
            fontSize,
        };

        if (!limit) {
            return null;
        }

        return (
            <View style={styles.counterContainer}>
                <Text style={[styles.counterText, style, textStyle]}>
                    {count} / {limit}
                </Text>
            </View>
        );
    }
}

Counter.propTypes = propTypes;
Counter.contextTypes = contextTypes;
Counter.defaultProps = defaultProps;

export default Counter;
