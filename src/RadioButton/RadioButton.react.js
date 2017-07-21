/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import Checkbox from '../Checkbox';

const propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func,
};
const defaultProps = {
    theme: 'light',
    disabled: false,
};

class RadioButton extends PureComponent {
    onPress = () => {
        const { value, checked, disabled, onSelect } = this.props;

        if (disabled && !checked) {
            return;
        }

        onSelect(value);
    }

    render() {
        return (
            <Checkbox
                checkedIcon="radio-button-checked"
                uncheckedIcon="radio-button-unchecked"
                {...this.props}
            />
        );
    }
}

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

export default RadioButton;
