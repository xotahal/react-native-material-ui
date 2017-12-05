import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated, StyleSheet } from 'react-native';


function getStyles(props, context) {
    const { textfield, erroredTextfield } = context.uiTheme;
    const { errorType } = props;

    let helperTextStyle = textfield.helperText;

    if (errorType) {
        helperTextStyle = [
            StyleSheet.flatten(textfield.helperText),
            StyleSheet.flatten(erroredTextfield.helperText),
        ];
    }

    return {
        helperText: helperTextStyle,
        helperContainer: textfield.helperContainer,
    };
}

const defaultProps = {
    numberOfLines: 1,
    style: null,
    errorType: false,
};

const propTypes = {
    style: Animated.Text.propTypes.style,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    numberOfLines: PropTypes.number,
    errorType: PropTypes.bool,
};

const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

class Helper extends PureComponent {
    render() {
        const styles = getStyles(this.props, this.context);
        const {
            children,
            style,
            errorType,
            ...props
        } = this.props;

        return (
            <View style={styles.helperContainer}>
                <Animated.Text style={[style, styles.helperText]} {...props}>
                    {children}
                </Animated.Text>
            </View>
        );
    }
}

Helper.propTypes = propTypes;
Helper.contextTypes = contextTypes;
Helper.defaultProps = defaultProps;

export default Helper;

