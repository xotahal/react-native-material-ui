import React, { Component, PropTypes } from 'react-native';
import { default as VectorIcon } from 'react-native-vector-icons/MaterialIcons';

export default class Icon extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        style: PropTypes.object,
        size: PropTypes.number,
        color: PropTypes.string
    };

    static defaultProps = {
        size: 30,
        color: '#757575'
    };

    render() {
        const { name, style, size, color } = this.props;

        return (
            <VectorIcon name={name} size={size} color={color} style={style} />
        );
    }
}
