import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

// import styles from './styles';
function getStyles(props, context) {
    const { textfield } = context.uiTheme;

    return {
        affix: [
            textfield.affix,
        ],
    };
}

const defaultProps = {
    numberOfLines: 1,

    active: false,
    focused: false,

    style: null,
};

const propTypes = {
    numberOfLines: PropTypes.number,

    active: PropTypes.bool,
    focused: PropTypes.bool,

    type: PropTypes.oneOf(['prefix', 'suffix']).isRequired,

    fontSize: PropTypes.number.isRequired,
    baseColor: PropTypes.string.isRequired,
    animationDuration: PropTypes.number.isRequired,

    style: Animated.Text.propTypes.style,

    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

class Affix extends PureComponent {
    constructor(props) {
        super(props);

        const { active, focused } = this.props;

        this.state = {
            opacity: new Animated.Value((active || focused) ? 1 : 0),
        };
    }

    componentWillReceiveProps(props) {
        const { opacity } = this.state;
        const { active, focused, animationDuration } = this.props;

        if ((focused !== props.focused) || (active !== props.active)) {
            Animated
                .timing(opacity, {
                    toValue: (props.active || props.focused) ? 1 : 0,
                    duration: animationDuration,
                })
                .start();
        }
    }

    render() {
        const styles = getStyles(this.props, this.context, this.state);
        const { opacity } = this.state;
        const {
            style,
            children,
            type,
            fontSize,
            baseColor: color,
        } = this.props;

        const containerStyle = {
            height: fontSize * 1.5,
            opacity,
        };

        const textStyle = {
            color,
            fontSize,
        };

        switch (type) {
            case 'prefix':
                containerStyle.paddingRight = 8;
                textStyle.textAlign = 'left';
                break;

            case 'suffix':
                containerStyle.paddingLeft = 8;
                textStyle.textAlign = 'right';
                break;
        }

        return (
            <Animated.View style={[styles.container, containerStyle]}>
                <Animated.Text style={[style, textStyle]}>{children}</Animated.Text>
            </Animated.View>
        );
    }
}

Affix.propTypes = propTypes;
Affix.contextTypes = contextTypes;
Affix.defaultProps = defaultProps;

export default Affix;
