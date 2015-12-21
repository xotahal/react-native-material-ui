import React, { Component, PropTypes, View, Text } from 'react-native';
import { TYPO } from '../config';

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