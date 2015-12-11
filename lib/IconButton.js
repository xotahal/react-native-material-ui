import React, { Component, PropTypes, View } from 'react-native';
import Icon from './Icon';
import Ripple from './Ripple';

export default class IconButton extends Component {

    static propTypes = {
        onPress: PropTypes.func,
        children: PropTypes.node.isRequired
    };

    handleOnPress = () => {
        const { onPress } = this.props;

        onPress && onPress();
    };

    render() {
        const { children } = this.props;

        return (
            <Ripple onPress={this.handleOnPress}>
                <View>
                    {children}
                </View>
            </Ripple>
        );
    }
}
