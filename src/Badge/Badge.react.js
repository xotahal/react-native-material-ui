import { Text, View } from 'react-native';
import React, { PureComponent, PropTypes } from 'react';
import Icon from '../Icon';

const propTypes = {
    /**
    * The badge will be added relativelty to this node
    */
    children: PropTypes.node,
    /**
    * This is the content rendered within the badge
    */
    text: PropTypes.string,
    /**
    * When the icon is set, the content will be <Icon name={icon} /> element
    */
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            name: PropTypes.string,
            color: PropTypes.string,
            size: PropTypes.number,
        }),
    ]),
    /**
    * Just sugar for style={{ container: { width: size, height: size, borderRadius: size / 2 }}}
    */
    size: PropTypes.number,
};
const defaultProps = {
    style: {
        container: {
            top: -8,
            right: -8,
        },
    },
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { badge, palette } = context.uiTheme;
    const { accent, size } = props;

    const local = {
        container: {},
    };

    if (size) {
        local.container.width = size;
        local.container.height = size;
        local.container.borderRadius = size / 2;
    }

    if (accent) {
        local.container.backgroundColor = palette.accentColor;
    }

    return {
        container: [
            badge.container,
            local.container,
            props.style.container,
        ],
        content: [
            badge.content,
            local.content,
            props.style.content,
        ],
    };
}
const mapIconProps = ({ icon, size }) => {
    let iconProps = {};

    if (typeof icon === 'string') {
        iconProps.name = icon;
    } else {
        iconProps = icon;
    }

    if (!iconProps.size && size) {
        iconProps.size = size / 2;
    }

    return iconProps;
};

class Badge extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.renderContent = this.renderContent.bind(this);
        this.renderChildren = this.renderChildren.bind(this);
    }
    renderContent(styles) {
        const { text, icon } = this.props;

        let content = null;

        if (icon) {
            const iconProps = mapIconProps(this.props);
            content = <Icon {...iconProps} />;
        } else if (text) {
            content = <Text style={styles.content}>{text}</Text>;
        }

        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
    renderChildren() {
        const { children } = this.props;

        if (!children) {
            return null;
        }

        return children;
    }
    render() {
        const styles = getStyles(this.props, this.context);

        return (
            <View style={{ flexDirection: 'row' }}>
                {this.renderChildren()}
                {this.renderContent(styles)}
            </View>
        );
    }
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;
Badge.contextTypes = contextTypes;

export default Badge;
