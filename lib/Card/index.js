import React, { Component, PropTypes, View } from 'react-native';

import Media from './Media';
import Body from './Body';

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
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 2
    }
};