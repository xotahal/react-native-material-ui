import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';


function getStyles(props, context) {
    const { textfield } = context.uiTheme;

    return {
        line: [
            textfield.line,
        ],
    };
}

const propTypes = {
    type: PropTypes.oneOf(['solid', 'dotted', 'dashed', 'none']).isRequired,
};

const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

class Line extends PureComponent {
    render() {
        const styles = getStyles(this.props, this.context, this.state);
        const { type: borderStyle } = this.props;

        if (borderStyle === 'none') {
            return null;
        }

        const lineStyle = {
            borderStyle,
        };

        return (
            <View style={[styles.line, lineStyle]} pointerEvents="none" />
        );
    }
}

Line.propTypes = propTypes;
Line.contextTypes = contextTypes;

export default Line;
