import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated } from 'react-native';


function getStyles(props, context) {
    const { textfield } = context.uiTheme;

    return {
        helper: [
            textfield.helper,
        ],
    };
}

const defaultProps = {
    numberOfLines: 1,
    style: null,
};

const propTypes = {
    style: Animated.Text.propTypes.style,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    numberOfLines: PropTypes.number,
};

const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

class Helper extends PureComponent {
    render() {
        const styles = getStyles(this.props, this.context, this.state);
        const { children, style, ...props } = this.props;

        return (
            <View style={styles.container}>
                <Animated.Text style={[styles.text, style]} {...props}>
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

