import React, { Component, PropTypes, View } from 'react-native';
import RadioButton from './RadioButton';
import { COLOR_NAME, THEME_NAME } from './config';

export default class RadioButtonGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: null
        };
    }
    componentWillMount = () => {
        React.Children.map(this.props.children, (option) => {
            let { value, checked } = option.props;

            if (!this.state.selected && checked) {
                const { onSelect } = this.props;

                this.setState({
                    selected: value
                });
                onSelect && onSelect(this.value);
            }
        })
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(COLOR_NAME),
        onSelect: PropTypes.func
    };


    render() {
        const options = React.Children.map(this.props.children, (option) => {
            const { value, label, disabled, ...other } = option.props;
            const { name, theme, primary } = this.props;

            return (
                <RadioButton
                    {...other}
                    ref={value}
                    name={name}
                    key={`RadioButtonGroup${value}`}
                    value={value}
                    label={label}
                    theme={theme}
                    primary={primary}
                    disabled={disabled}
                    onCheck={this._onChange}
                    checked={this.state.selected && value == this.state.selected}
                />
            );
        }, this);

        return (
            <View>
                {options}
            </View>
        );
    };

    _onChange = (value) => {
        const { onSelect } = this.props;

        this.setState({
            selected: value
        });

        onSelect && onSelect(this.value);
    };

    /**
     * Get the value of checked RadioButton in RadioButtonGroup. Often use in form.
     * @returns {string}
     */
    get value() {
        return this.state.selected
    }

    /**
     * Specifies that which RadioButton should be pre-selected
     * @param {string} value
     */
    set value(value) {
        this._onChange(value);
    }
}
