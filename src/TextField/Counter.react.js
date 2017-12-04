import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';


function getStyles(props, context) {
    const { textfield } = context.uiTheme;

    return {
        counterText: textfield.counterText,
        counterContainer: textfield.counterContainer,
    };
}

const propTypes = {
    count: PropTypes.number.isRequired,
    limit: PropTypes.number,

    fontSize: PropTypes.number.isRequired,

    baseColor: PropTypes.string.isRequired,
    errorColor: PropTypes.string.isRequired,

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
        const styles = getStyles(this.props, this.context, this.state);
        const {
            count,
            limit,
            baseColor,
            errorColor,
            fontSize,
            style,
        } = this.props;

        const textStyle = {
            color: count > limit ? errorColor : baseColor,
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
