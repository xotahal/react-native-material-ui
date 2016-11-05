import { View } from 'react-native';
import React, { PureComponent, PropTypes } from 'react';

const propTypes = {
    children: PropTypes.node,
};

class Container extends PureComponent {
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.children}
            </View>
        );
    }
}

Container.propTypes = propTypes;

export default Container;
