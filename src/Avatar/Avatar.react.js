import { View, Image, Text, StyleSheet } from 'react-native';
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
    * Inline style of avatar
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
        content: Text.propTypes.style,
    }),
};
const defaultProps = {
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { avatar } = context.uiTheme;

    return {
        container: [
            avatar.container,
            props.style.container,
        ],
        content: [
            avatar.content,
            props.style.content,
        ],
    };
}

class Avatar extends Component {
    render() {
        const { image, icon, text } = this.props;

        let content = null;
        const { avatar, spacing } = this.context.uiTheme;
        const styles = getStyles(this.props, this.context);

        if (icon) {
            const color = StyleSheet.flatten(avatar.content).color;
            content = <Icon name={icon} color={color} size={spacing.iconSize} />;
        } else if (text) {
            content = <Text style={styles.content}>{text}</Text>;
        } else if (image) {
            content = image;
        }


        return (
            <Container>
                <View style={styles.container} >
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
