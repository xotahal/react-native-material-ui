import { THEME_NAME, PRIMARY, PRIMARY_COLORS } from './config';
import { View } from 'react-native';
import Checkbox from './Checkbox';
import React, { Component, PropTypes } from 'react';

export default class CheckboxGroup extends Component {

    static propTypes = {
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(PRIMARY_COLORS),
        onSelect: PropTypes.func,
        checked: PropTypes.array,
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

    constructor(props) {
        super(props);
        this.state = {
            selected: []
        };
    }

    componentWillMount = () => {
        const { checked } = this.props;

        if (checked && checked.length) {
            this.value = checked;
        }
    };

    _onChange = (checked, value) => {
        const { selected } = this.state;

        if (checked) {
            this.setState({
                selected: [...selected, value]
            });
        } else {
            const index = selected.indexOf(value);
            this.setState({
                selected: [
                    ...selected.slice(0, index),
                    ...selected.slice(index + 1)
                ]
            });
        }

        const { onSelect } = this.props;

        if (onSelect) {
            onSelect(this.value);
        }
    };

    /**
     * Get the value of checked Checkbox in CheckboxGroup. Often use in form.
     * @returns {Array}
     */
    get value() {
        return this.state.selected;
    }

    /**
     * Make CheckboxGroup set some checkbox checked
     * @param {string[]} value - An array of values of some Checkbox in CheckboxGroup
     */
    set value(value) {
        this.setState({
            selected: value
        });

        const { onSelect } = this.props;

        if (onSelect) {
            onSelect(value);
        }
    }

    render() {
        const { items, theme, primary } = this.props;
        const { selected } = this.state;

        return (
            <View>
                {
                    items && items.length && items.map((item) => {
                        const { value } = item;
                        return (
                            <Checkbox
                              ref={value}
                              key={`Checkbox${value}`}
                              value={value}
                              theme={theme}
                              primary={primary}
                              onCheck={this._onChange}
                              checked={selected && selected.indexOf(value) !== -1}
                              {...item}
                            />
                        );
                    })
                }
            </View>
        );
    }
}
