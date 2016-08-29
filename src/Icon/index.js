import { default as VectorIcon } from 'react-native-vector-icons/MaterialIcons';
import React, { Component, PropTypes } from 'react';

export default class Icon extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        size: PropTypes.number,
        color: PropTypes.string,
    };

    static defaultProps = {
        size: 30,
        color: '#757575',
    };

    render() {
        const { name, style, size, color } = this.props;

        return (
            <VectorIcon
                name={name}
                size={size}
                color={color}
                style={style}
            />
        );
    }
}
