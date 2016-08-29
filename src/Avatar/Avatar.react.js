import { View, Image, Text } from 'react-native';
import Container from '../Container';
import Icon from '../Icon';
import React, { Component, PropTypes } from 'react';

const propTypes = {
    /**
    * If passed in, this component will render image.
    */
    image: PropTypes.shape({ type: PropTypes.oneOf([Image]) }),
    /**
    * If passed in, this component will render icon element inside avatar.
    */
    icon: PropTypes.string,
    /**
    * If passed in, this component will render text element inside avatar.
    */
    text: PropTypes.string,
    /**
    * Size of avatar component (default: 40).
    */
    size: PropTypes.number,
    /**
    * Color of inside element.
    */
    color: PropTypes.string,
    /**
    * Color of avatar's background.
    */
    backgroundColor: PropTypes.string,
};
const defaultProps = {
    size: 40,
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { avatar } = context.uiTheme;
    const size = props.size || avatar.size;

    const styles = {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: props.backgroundColor || avatar.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    };

    return styles;
}

class Avatar extends Component {
    render() {
        const { image, icon, text } = this.props;

        let content = null;
        const { avatar } = this.context.uiTheme;

        if (icon) {
            content = <Icon name={icon} color={avatar.color} size={avatar.size * 0.6} />;
        } else if (text) {
            content = <Text style={{ color: avatar.color }}>{text}</Text>;
        } else if (image) {
            content = image;
        }

        const styles = getStyles(this.props, this.context);

        return (
            <Container>
                <View style={styles} >
                    {content}
                </View>
            </Container>
        );
    }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;
Avatar.contextTypes = contextTypes;

export default Avatar;
