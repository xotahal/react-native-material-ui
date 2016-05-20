import { View, Image } from 'react-native';
import HeaderAccount from './HeaderAccount';
import React, { Component, PropTypes } from 'react';


const styles = {
    contentContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    }
};

export default class Header extends Component {

    static Account = HeaderAccount;

    static propTypes = {
        image: PropTypes.shape({ type: PropTypes.oneOf([Image]) }),
        backgroundColor: PropTypes.string,
        height: PropTypes.number,
        children: PropTypes.node
    };

    static defaultProps = {
        height: 150,
        backgroundColor: '#333333'
    };

    render() {
        const { image, height, backgroundColor, children } = this.props;

        const contetnStyle = {
            height,
            backgroundColor: image ? 'transparent' : backgroundColor
        };

        const content = (
            <View style={contetnStyle}>
                {React.Children.map(children, (child) => {
                    const props = { height };
                    return React.cloneElement(child, props);
                })}
            </View>
        );

        if (image) {
            return (
                <View style={[{ height }]}>
                    {React.cloneElement(image, { style: [{ height }] })}
                    <View style={[styles.contentContainer]}>
                        {content}
                    </View>
                </View>
            );
        }

        return content;
    }
}
