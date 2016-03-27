import React, { Component, PropTypes, View } from 'react-native';
import RadioButton from './RadioButton';
import { PRIMARY, PRIMARY_COLORS, THEME_NAME } from './config';

export default class RadioButtonGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected || null
        };
    }

    static propTypes = {
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(PRIMARY_COLORS),
        onSelect: PropTypes.func,
        selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        items: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string,
            disabled: PropTypes.bool
        }))
    };

    static defaultProps = {
        theme: 'light',
        primary: PRIMARY
    };

    componentDidMount = () => {
        const { selected } = this.state;

        if (selected) {
            this.value = selected;
        }
    };

    render() {
        const { items, theme, primary } = this.props;
        return (
            <View>
                {
                    items && items.length && items.map((item) => {
                        const { value } = item;
                        return (
                            <RadioButton
                              ref={value}
                              key={`RadioButton${value}`}
                              value={`${value.toString()}`}
                              theme={theme}
                              primary={primary}
                              onSelect={this.onSelect}
                              checked={this.state.selected && this.state.selected === value}
                              {...item}
                            />
                        );
                    })
                }
            </View>
        );
    }

    onSelect = (value) => {
        const { onSelect } = this.props;

        this.setState({
            selected: value
        });

        onSelect && onSelect(value);
    };

    /**
     * Get the value of checked RadioButton in RadioButtonGroup. Often use in form.
     * @returns {string}
     */
    get value() {
        return this.state.selected;
    }

    /**
     * Specifies that which RadioButton should be pre-selected
     * @param {string} value
     */
    set value(value) {
        this.onSelect(value);
    }
}
