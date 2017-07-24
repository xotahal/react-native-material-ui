/* eslint-disable import/no-unresolved, import/extensions */
import { View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import RippleFeedback from '../RippleFeedback';

const propTypes = {
    children: PropTypes.node,
    onPress: PropTypes.func,
    style: PropTypes.object,
};
const defaultProps = {
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { card } = context.uiTheme;

    const local = {};

    if (props.fullWidth) {
        local.container = {
            marginHorizontal: 0,
        };
    }

    return {
        container: [
            card.container,
            local.container,
            props.style.container,
        ],
    };
}

class Card extends PureComponent {
    render() {
        const { onPress, children } = this.props;

        const styles = getStyles(this.props, this.context);

        const content = (
            <View style={styles.container}>
                {children}
            </View>
        );

        if (onPress) {
            return (
                <RippleFeedback onPress={onPress}>
                    {content}
                </RippleFeedback>
            );
        }

        return content;
    }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;
Card.contextTypes = contextTypes;

export default Card;
