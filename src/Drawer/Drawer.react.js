/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import Container from '../Container';

import Header from './Header.react';
import Section from './Section.react';

const propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.shape({
        container: ScrollView.propTypes.style,
    }),
};
const defaultProps = {
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { drawer } = context.uiTheme;

    return {
        container: [
            drawer.container,
            props.style.container,
        ],
    };
}

class Drawer extends PureComponent {
    render() {
        const { children } = this.props;

        const styles = getStyles(this.props, this.context);

        return (
            <Container>
                <ScrollView style={styles.container}>
                    {children}
                </ScrollView>
            </Container>
        );
    }
}

Drawer.propTypes = propTypes;
Drawer.defaultProps = defaultProps;
Drawer.contextTypes = contextTypes;

Drawer.Header = Header;
Drawer.Section = Section;

export default Drawer;
