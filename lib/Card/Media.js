import React, { Component, StyleSheet, PropTypes, Image, View } from 'react-native';


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
                <Image source={src} style={[styles.media, { height }]} />
                { children &&
                    <View style={[styles.content, overlay && { backgroundColor: 'rgba(0,0,0,.35)' }]}>
                        {children}
                    </View>
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    media: {
        position: 'absolute',
        top: -16,
        left: -16,
        right: -16,
        bottom: -16
    },
    content: {
        position: 'absolute',
        left: -16,
        right: -16,
        bottom: 16,
        paddingTop: 24,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16
    }
});