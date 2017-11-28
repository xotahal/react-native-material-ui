/* eslint-disable import/no-unresolved, import/extensions */
import { StyleSheet, Text, View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import IconToggle from '../IconToggle';
import RippleFeedback from '../RippleFeedback';
import { ViewPropTypes } from '../utils';

const propTypes = {
    /**
    * Text will be shown after Icon
    */
    label: PropTypes.string.isRequired,
    /**
    * Value will be returned when onCheck is fired
    */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /**
    * True if it's check
    */
    checked: PropTypes.bool,
    /**
    * Is checkbox active
    */
    disabled: PropTypes.bool,
    /**
    * Will be shown when checked is false
    */
    uncheckedIcon: PropTypes.string,
    /**
    * Will be shown when checked is true
    */
    checkedIcon: PropTypes.string,
    /**
    * Event that is called when state is changed
    */
    onCheck: PropTypes.func.isRequired,
    style: PropTypes.shape({
        container: ViewPropTypes.style,
        icon: IconToggle.propTypes.style,
        label: Text.propTypes.style,
    }),
};
const defaultProps = {
    checked: false,
    checkedIcon: 'check-box',
    uncheckedIcon: 'check-box-outline-blank',
    disabled: false,
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { checkbox, palette } = context.uiTheme;
    const { disabled } = props;

    const local = {};

    return {
        container: [
            checkbox.container,
            local.container,
            props.style.container,
        ],
        icon: [
            checkbox.icon,
            props.style.icon,
        ],
        label: [
            checkbox.label,
            local.label,
            props.style.label,
            // disabled has the highest priority
            disabled && { color: palette.disabledTextColor },
        ],
    };
}

class Checkbox extends PureComponent {
    onPress = () => {
        const {
            checked, disabled, onCheck, value,
        } = this.props;

        if (!disabled && onCheck) {
            onCheck(!checked, value);
        }
    }
    render() {
        const {
            checked, checkedIcon, uncheckedIcon, disabled, value,
        } = this.props;

        const styles = getStyles(this.props, this.context);

        const labelColor = StyleSheet.flatten(styles.label).color;
        const iconColor = StyleSheet.flatten(styles.icon).color;

        const content = (
            <View style={styles.container} pointerEvents="box-only">
                <IconToggle
                    key={`${value}-${checked}`}
                    name={checked ? checkedIcon : uncheckedIcon}
                    disabled={disabled}
                    color={checked ? iconColor : labelColor}
                    onPress={this.onPress}
                />
                <Text style={styles.label}>
                    {this.props.label}
                </Text>
            </View>
        );

        if (disabled) {
            return content;
        }

        return (
            <RippleFeedback onPress={this.onPress}>
                {content}
            </RippleFeedback>
        );
    }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;
Checkbox.contextTypes = contextTypes;

export default Checkbox;
