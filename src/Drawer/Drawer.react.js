import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import Container from '../Container';

import Header from './Header.react';
import Section from './Section.react';

const propTypes = {
    children: PropTypes.node.isRequired,
};
const defaultProps = {
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

class Drawer extends Component {
    render() {
        const { children } = this.props;


        return (
            <Container>
                <ScrollView>
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
