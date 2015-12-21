import React, { Component, PropTypes, View, Image } from 'react-native';
import Icon from './Icon';
import { getColor } from './helpers';

export default class Avatar extends Component {

    static propTypes = {
        icon: PropTypes.string,
        src: PropTypes.string,
        size: PropTypes.number,
        color: PropTypes.string,
        backgroundColor: PropTypes.string
    };

    static defaultProps = {
        size: 40,
        color: '#ffffff',
        backgroundColor: getColor('paperGrey500')
    };

    render() {
        const { icon, src, size, color, backgroundColor } = this.props;

        if (src) {
            return (
                <Image
                    style={{ width: size, height: size, borderRadius: size / 2, borderColor: 'rgba(0,0,0,.1)', borderWidth: 1 }}
                    source={{ uri: src }}
                />
            );
        }

        if (icon) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: getColor(backgroundColor), alignItems:'center', justifyContent: 'center' }}>
                        <Icon
                            name={icon}
                            color={color}
                            size={0.6 * size}
                        />
                    </View>
                </View>
            );
        }
    }
}