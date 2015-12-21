import React, { Component, PropTypes, View, Text, Image, TouchableHighlight } from 'react-native';
import Icon from '../Icon';
import { TYPO } from '../config';
import { getColor } from '../helpers';

export default class Subheader extends Component {

    static propTypes = {
        value: PropTypes.string.isRequired
    };

    render() {
        const { value } = this.props;

        return (
            <View style={styles.subheader}>
                <Text style={[TYPO.paperFontBody2, { color: 'rgba(0,0,0,.54)' }]}>
                    {value}
                </Text>
            </View>
        );
    }
}

const styles = {
    subheader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 8,
        height: 48
    }
};