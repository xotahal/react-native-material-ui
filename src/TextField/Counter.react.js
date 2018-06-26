import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';


function getStyles(props, context) {
    const { textfield, erroredTextfield } = context.uiTheme;
    const { count, limit } = props;

    const styleState = count > limit ? {
        color: StyleSheet.flatten(erroredTextfield.counterText).color,
    } : {
        color: StyleSheet.flatten(textfield.counterText).color,
    };

    return {
        counterText: [StyleSheet.flatten(textfield.counterText), styleState],
        counterContainer: textfield.counterContainer,
    };
}

const propTypes = {
    count: PropTypes.number.isRequired,
    limit: PropTypes.number,

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
            style,
        } = this.props;

        if (!limit) {
            return null;
        }

        return (
            <View style={styles.counterContainer}>
                <Text style={[styles.counterText, style]}>
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
