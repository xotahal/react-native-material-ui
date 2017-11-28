/* eslint-disable import/no-unresolved, import/extensions */
import { View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import { ViewPropTypes } from '../utils';


const propTypes = {
    inset: PropTypes.bool,
    style: PropTypes.shape({
        container: ViewPropTypes.style,
    }),
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
