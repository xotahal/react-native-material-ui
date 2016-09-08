import { View, Image, StyleSheet } from 'react-native';
import HeaderAccount from './HeaderAccount.react';
import React, { Component, PropTypes } from 'react';

const propTypes = {
    image: PropTypes.shape({ type: PropTypes.oneOf([Image]) }),
    backgroundColor: PropTypes.string,
    children: PropTypes.node,
};
const defaultProps = {
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
            backgroundColor: image,
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

class Header extends Component {
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
