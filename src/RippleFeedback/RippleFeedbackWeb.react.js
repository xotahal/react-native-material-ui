/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */

const propTypes = {
    /**
    * The color of the underlay that will show when the touch is active.
    */
    color: PropTypes.string,
    borderless: PropTypes.bool,
    children: PropTypes.node.isRequired,
};
const defaultProps = {
    color: null,
    borderless: true,
};

class RippleFeedbackWeb extends PureComponent {
    render() {
        const {
            children, color, borderless, ...otherProps
        } = this.props;

        return (
            <TouchableWithoutFeedback {...otherProps}>
                {children}
            </TouchableWithoutFeedback>
        );
    }
}

RippleFeedbackWeb.propTypes = propTypes;
RippleFeedbackWeb.defaultProps = defaultProps;

export default RippleFeedbackWeb;
