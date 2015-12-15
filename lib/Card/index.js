import React, { Component, PropTypes, View } from 'react-native';

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
            <View style={Object.assign(styles.container, { elevation })}>
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