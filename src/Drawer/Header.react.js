/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import HeaderAccount from './HeaderAccount.react';
import { ViewPropTypes } from '../utils';

const propTypes = {
    image: PropTypes.shape({ type: PropTypes.oneOf([Image]) }),
    backgroundColor: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.shape({
        contentContainer: ViewPropTypes.style,
        container: ViewPropTypes.style,
    }),
};
const defaultProps = {
    image: null,
    backgroundColor: null,
    children: null,
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { drawerHeader } = context.uiTheme;
    const { image } = props;

    const local = {};

    if (image) {
        local.contentContainer = {
            backgroundColor: null,
        };
    }

    return {
        container: [
            drawerHeader.container,
            props.style.container,
        ],
        contentContainer: [
            drawerHeader.contentContainer,
            props.style.contentContainer,
            local.contentContainer,
        ],
    };
}

class Header extends PureComponent {
    render() {
        const { image, children } = this.props;

        const styles = getStyles(this.props, this.context);
        const flatten = StyleSheet.flatten(styles.contentContainer);

        const content = (
            <View style={styles.contentContainer}>
                {children}
            </View>
        );

        if (image) {
            return (
                <View>
                    {React.cloneElement(image, { style: [{ height: flatten.height }] })}
                    <View style={[styles.container]}>
                        {content}
                    </View>
                </View>
            );
        }

        return content;
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
Header.contextTypes = contextTypes;

Header.Account = HeaderAccount;

export default Header;
