import React, { Component, PropTypes, Image, View } from 'react-native';


export default class Media extends Component {

    static propTypes = {
        src: PropTypes.object.isRequired,
        height: PropTypes.number,
        overlay: PropTypes.bool,
        children: PropTypes.node
    };

    static defaultProps = {
        height: 150,
        overlay: false
    };

    render() {
        const { src, height, overlay, children } = this.props;

        return (
            <View style={{ height }}>
                <Image source={src} style={styles.media} />
                <View style={[styles.content, overlay && { backgroundColor: 'rgba(0,0,0,.35)' }]}>
                    {children}
                </View>
            </View>
        );
    }

}

const styles = {
    media: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    content: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 24,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16
    }
};