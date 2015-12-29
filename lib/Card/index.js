import React, { Component, PropTypes, View } from 'react-native';
import { isCompatible } from '../helpers';

import Media from './Media';
import Body from './Body';
import Actions from './Actions';

export default class Card extends Component {

    static propTypes = {
        elevation: PropTypes.number,
        children: PropTypes.node.isRequired
    };

    static defaultProps = {
        elevation: 2
    };

    static Media = Media;

    static Body = Body;

    static Actions = Actions;

    render() {
        const { elevation, children } = this.props;

        return (
            <View style={[
                styles.container, {
                    elevation
                }, !isCompatible('elevation') && {
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,.12)'
                }]}
            >
                {children}
            </View>
        );
    }

}

const styles = {
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 2,
        margin: 8,
        paddingLeft: 16,
        paddingRight: 16
    }
};