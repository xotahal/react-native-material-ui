/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent, PropTypes } from 'react';
import { ScrollView } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
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
                { children.slice(0, 1) }
                <ScrollView style={styles.container}>
                    { children.slice(1) }
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
