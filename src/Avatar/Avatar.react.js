/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent, PropTypes } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import Icon from '../Icon';

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
    * If passed in, this component will render an icon with this color.
    */
    iconColor: PropTypes.string,
    /**
    * If passed in, this component will render an icon with this size.
    */
    iconSize: PropTypes.number,
    /**
    * If passed in, this component will render text element inside avatar.
    */
    text: PropTypes.string,
    /**
    * It's just sugar for: style: { width: size, height: size, borderRadius: size / 2 }
    */
    size: PropTypes.number,
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
    const { size } = props;

    const local = {};

    if (size) {
        local.container = {
            height: size,
            width: size,
            borderRadius: size / 2,
        };
    }

    return {
        container: [
            avatar.container,
            local.container,
            props.style.container,
        ],
        content: [
            avatar.content,
            local.content,
            props.style.content,
        ],
    };
}

class Avatar extends PureComponent {
    render() {
        const { image, icon, iconSize, iconColor, text } = this.props;

        let content = null;
        const { avatar, spacing } = this.context.uiTheme;
        const styles = getStyles(this.props, this.context);

        if (icon) {
            const color = iconColor || StyleSheet.flatten(avatar.content).color;
            const size = iconSize || spacing.iconSize;

            content = <Icon name={icon} color={color} size={size} />;
        } else if (text) {
            content = <Text style={styles.content}>{text}</Text>;
        } else if (image) {
            content = image;
        }


        return (
            <View style={{ flexGrow: 1 }}>
                <View style={styles.container} >
                    {content}
                </View>
            </View>
        );
    }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;
Avatar.contextTypes = contextTypes;

export default Avatar;
