import { View } from 'react-native';
import React, { PureComponent, PropTypes } from 'react';


const propTypes = {
    inset: PropTypes.bool,
    style: PropTypes.object,
};
const defaultProps = {
    inset: false,
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { divider } = context.uiTheme;

    const local = {
        container: props.inset ? { marginLeft: 72 } : null,
    };

    return {
        container: [
            divider.container,
            local.container,
            props.style.container,
        ],
    };
}

class Divider extends PureComponent {
    render() {
        const styles = getStyles(this.props, this.context);

        return (
            <View style={styles.container} />
        );
    }
}

Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;
Divider.contextTypes = contextTypes;

export default Divider;
