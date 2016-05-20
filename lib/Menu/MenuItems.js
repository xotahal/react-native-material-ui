import { View, StyleSheet, NativeModules } from 'react-native';
import React, { Component, PropTypes } from 'react';

const UIManager = NativeModules.UIManager;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 2,
        elevation: 8,
        position: 'absolute',
        top: 0,
        left: 0
    },
    content: {
        paddingTop: 8,
        paddingBottom: 8
    }
});

export default class MenuItems extends Component {

    static propTypes = {
        closeMenu: PropTypes.func,
        target: PropTypes.object,
        items: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            style: {
                top: 0,
                left: -1000
            }
        };
    }

    componentDidMount() {
        const { target } = this.props;

        if (!target) {
            return;
        }

        const containerHandle = React.findNodeHandle(this.refs.container);
        const targetHandle = React.findNodeHandle(target);

        setTimeout(() => {
            UIManager.measure(containerHandle, (x, y, width) => {
                UIManager.measure(targetHandle, (tx, ty, twidth, theight, tpageX, tpageY) => {
                    const right = tpageX + twidth;
                    const left = right - width;
                    const top = tpageY;

                    this.setState({
                        style: {
                            top: top || 0,
                            left: left || 0
                        }
                    });
                });
            });
        }, 0);
    }


    render() {
        const { items, closeMenu } = this.props;

        return (
            <View ref="container" style={[styles.container, { width: 200 }, this.state.style]} >
                <View style={styles.content}>
                    {React.Children.map(items, (child) =>
                        React.cloneElement(child, { closeMenu })
                    )}
                </View>
            </View>
        );
    }
}
