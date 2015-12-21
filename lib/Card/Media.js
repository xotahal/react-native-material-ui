import React, { Component, StyleSheet, PropTypes, Image, View } from 'react-native';


export default class Media extends Component {

    static propTypes = {
        image: PropTypes.shape({ type: PropTypes.oneOf([Image]) }).isRequired,
        height: PropTypes.number,
        overlay: PropTypes.bool,
        children: PropTypes.node
    };

    static defaultProps = {
        height: 150,
        overlay: false
    };

    render() {
        const { image, height, overlay, children } = this.props;

        return (
            <View style={{ height }}>
                {React.cloneElement(image, {
                    style: [styles.media, { height }]
                })}
                {children &&
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
        left: -16,
        right: -16,
    },
    content: {
        position: 'absolute',
        left: -16,
        right: -16,
        bottom: 0,
        paddingTop: 24,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16
    }
});