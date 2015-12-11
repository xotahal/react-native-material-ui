import React, { Component, PropTypes, View } from 'react-native';
import Checkbox from './Checkbox';
import { THEME_NAME, COLOR_NAME } from './config';

export default class CheckboxGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: []
        };
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(COLOR_NAME),
        onSelect: PropTypes.func,
        value: PropTypes.array
    };

    static defaultProps = {
        value: []
    };

    render() {
        const options = React.Children.map(this.props.children, (option) => {
            const { value, label, disabled, ...other } = option.props;
            const { name, theme, primary } = this.props;

            return (
                <Checkbox
                    ref={value}
                    name={name}
                    key={`CheckboxGroup${value}`}
                    value={value}
                    label={label}
                    theme={theme}
                    primary={primary}
                    disabled={disabled}
                    onCheck={this._onChange}
                    checked={this.state.selected && this.state.selected.indexOf(value) !== -1}
                    {...other}
                />
            );
        }, this);

        return (
            <View>
                {options}
            </View>
        );
    };

    _onChange = (checked, value) => {
        const { selected } = this.state;

        if (checked) {
            this.setState({
                selected: [...selected, value]
            });
        } else {
            let index = selected.indexOf(value);
            this.setState({
                selected: [
                    ...selected.slice(0, index),
                    ...selected.slice(index + 1)
                ]
            });
        }

        const { onSelect } = this.props;
        onSelect && onSelect(this.value);
    };

    /**
     * Get the value of checked Checkbox in CheckboxGroup. Often use in form.
     * @returns {Array}
     */
    get value() {
        return this.state.selected
    }

    /**
     * Make CheckboxGroup set some checkbox checked
     * @param {string[]} value - An array of values of some Checkbox in　CheckboxGroup
     */
    set value(value) {
        this.setState({
            selected: value
        });

        const { onSelect } = this.props;
        onSelect && onSelect(this.value);
    }
}
