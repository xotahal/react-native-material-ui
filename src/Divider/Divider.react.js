import { View } from 'react-native';
import React, { Component, PropTypes } from 'react';


const propTypes = {
    inset: PropTypes.bool,
    style: PropTypes.object,
};
const defaultProps = {
    inset: false,
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { divider } = context.uiTheme;

    const insetStyle = props.inset ? { marginLeft: 72 } : null;

    return [
        divider,
        insetStyle,
        props.style,
    ];
}

class Divider extends Component {
    render() {
        const styles = getStyles(this.props, this.context);

        return (
            <View style={styles} />
        );
    }
}

Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;
Divider.contextTypes = contextTypes;

export default Divider;
