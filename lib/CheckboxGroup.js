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

    componentWillMount = () => {
        const { checked } = this.props;

        if (checked && checked.length) {
            this.value = checked;
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
                            <Checkbox
                                ref={value}
                                key={`CheckboxGroup${value}`}
                                value={`${value}`}
                                theme={theme}
                                primary={primary}
                                onCheck={this._onChange}
                                checked={this.state.selected && this.state.selected.indexOf(value) !== -1}
                                {...item}
                            />
                        );
                    })
                }
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
