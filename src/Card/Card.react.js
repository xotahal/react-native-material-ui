/* eslint-disable import/no-unresolved, import/extensions */
import { View } from 'react-native';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable import/no-unresolved, import/extensions */
import RippleFeedback from '../RippleFeedback';
import { ViewPropTypes } from '../utils';

const propTypes = {
    children: PropTypes.node,
    onPress: PropTypes.func,
    style: PropTypes.shape({
        container: ViewPropTypes.style,
    }),
};
const defaultProps = {
    children: null,
    onPress: null,
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
    constructor(props, context) {
        super(props, context);

        this.state = {
            styles: getStyles(props, context),
        };
    }
    renderContent = () => {
        const { children } = this.props;
        const { styles } = this.state;

        return (
            <View style={styles.container} pointerEvents="box-only">
                {children}
            </View>
        );
    }
    render() {
        const { onPress } = this.props;

        if (onPress) {
            return (
                <RippleFeedback onPress={onPress}>
                    {this.renderContent()}
                </RippleFeedback>
            );
        }

        return this.renderContent();
    }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;
Card.contextTypes = contextTypes;

export default Card;
