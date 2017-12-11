import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, StyleSheet } from 'react-native';

// import styles from './styles';
function getStyles(props, context, state) {
    const { textfield } = context.uiTheme;
    const { type } = props;

    switch (type) {
        case 'prefix':
            textfield.affix.paddingRight = 8;
            textfield.affixText.textAlign = 'left';
            break;

        case 'suffix':
            textfield.affix.paddingLeft = 8;
            textfield.affixText.textAlign = 'right';
            break;
    }

    const containerStyle = {
        height: StyleSheet.flatten(textfield.affixText).fontSize * 1.5,
        opacity: state.opacity,
    };

    return {
        affix: [textfield.affix, containerStyle],
        affixText: textfield.affixText,
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
        const {
            style,
            children,
        } = this.props;

        return (
            <Animated.View style={styles.affix}>
                <Animated.Text style={[style, style.affixText]}>{children}</Animated.Text>
            </Animated.View>
        );
    }
}

Affix.propTypes = propTypes;
Affix.contextTypes = contextTypes;
Affix.defaultProps = defaultProps;

export default Affix;
