import React, { Component, PropTypes, ScrollView } from 'react-native';
import { THEME_NAME, PRIMARY_COLORS } from '../config';
import { getColor } from '../helpers';

import Header from './Header';
import Section from './Section';

const styles = {
    container: {
        flex: 1
    }
};

export default class Drawer extends Component {

    static propTypes = {
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(PRIMARY_COLORS),
        overrides: PropTypes.shape({
            backgroundColor: PropTypes.string
        }),
        children: PropTypes.node.isRequired
    };

    static defaultProps = {
        theme: 'light',
        primary: 'paperGrey'
    };

    static Header = Header;

    static Section = Section;

    render() {
        const { theme, overrides, children } = this.props;

        const backgroundColorMap = {
            light: '#ffffff',
            dark: '#333333'
        };

        const backgroundColor = (() => {
            if (overrides && overrides.backgroundColor) {
                return getColor(overrides.backgroundColor);
            }
            return backgroundColorMap[theme];
        })();

        return (
            <ScrollView style={[styles.container, { backgroundColor }]}>
                {React.Children.map(children, (child) =>
                    React.cloneElement(child, { theme })
                )}
            </ScrollView>
        );
    }

}
