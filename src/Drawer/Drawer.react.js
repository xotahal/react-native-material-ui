import React, { PureComponent, PropTypes } from 'react';
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
