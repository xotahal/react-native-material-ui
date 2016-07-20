import { isCompatible } from '../helpers';
import { View, TouchableNativeFeedback } from 'react-native';
import React, { Component, PropTypes } from 'react';
import Ripple from '../polyfill/Ripple';

import Title from './Title';
import Content from './Content';
import Actions from './Actions';

const defaultStyles = {
    dialogContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 2,
        elevation: 24,
        width: 280,
        paddingTop: 24,
        paddingHorizontal: 24,
    },
};

export default class Dialog extends Component {

    static propTypes = {
        theme: PropTypes.string,
        overrides: PropTypes.shape({
            backgroundColor: PropTypes.string,
            rippleColor: PropTypes.string,
        }),
        elevation: PropTypes.number,
        fullWidth: PropTypes.bool,
        disabled: PropTypes.bool,
        onPress: PropTypes.func,
        children: PropTypes.node.isRequired,
        style: PropTypes.object,
    };

    static Title = Title;
    static Content = Content;
    static Actions = Actions;

    render() {
        const {
            onPress,
            children,
        } = this.props;

        const dialog = (
            <View style={defaultStyles.dialogContainer}>
                {children}
            </View>
        );

        if (!isCompatible('TouchableNativeFeedback')) {
            return (
                <Ripple onPress={onPress} >
                    {dialog}
                </Ripple>
            );
        }

        return (
            <TouchableNativeFeedback onPress={onPress} >
                {dialog}
            </TouchableNativeFeedback>
        );
    }

}
