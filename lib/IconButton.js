import React, { Component, PropTypes, View, Text } from 'react-native';
import { getColor } from './helpers';
import Icon from './Icon';
import Ripple from './Ripple';

export default class IconButton extends Component {

    static propTypes = {
        onPress: PropTypes.func,
        counter: PropTypes.number,
        counterBackgroundColor: PropTypes.string,
        counterTextColor: PropTypes.string,
        children: PropTypes.node.isRequired
    };

    static defaultProps = {
        counterBackgroundColor: 'paperRed500',
        counterTextColor: 'paperGrey50'
    };

    handleOnPress = () => {
        const { onPress } = this.props;

        onPress && onPress();
    };

    render() {
        const { counter, children, counterBackgroundColor, counterTextColor } = this.props;
        let counterComponent;

        if (typeof counter === 'number') {
            counterComponent = (
                <View style={[styles.counterContainer, { backgroundColor: getColor(counterBackgroundColor) }]}>
                    <Text style={[styles.counterText, { color: getColor(counterTextColor) }]}>{counter.toString()}</Text>
                </View>
            );
        }

        return (
            <Ripple onPress={this.handleOnPress}>
                <View>
                    {children}
                </View>
                {counterComponent}
            </Ripple>
        );
    }
}

const styles = {
    counterContainer: {
        position: 'absolute',
        top: 15,
        right: 15,
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 3
    },
    counterText: {
        fontSize: 8,
    }
}