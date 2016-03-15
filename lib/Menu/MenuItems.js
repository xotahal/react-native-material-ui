import React, { Animated, PropTypes, Text, TouchableNativeFeedback, View, StyleSheet } from 'react-native';

const { NativeModules: { UIManager } } = React;

export default class MenuItems extends React.Component {

    static propTypes = {
    };

    constructor(props){
        super(props);
        this.state = {
            style: {
                top: 0,
                left: -1000
            }
        }
    }

    componentDidMount() {
        const { target } = this.props;

        if(!target)
            return;

        const containerHandle = React.findNodeHandle(this.refs.container);
        const targetHandle = React.findNodeHandle(target);

        setTimeout(() => {
            UIManager.measure(containerHandle, (x, y, width, height, pageX, pageY) => {
                UIManager.measure(targetHandle, (tx, ty, twidth, theight, tpageX, tpageY) => {

                    const right = tpageX + twidth;
                    const left = right - width;
                    const top = tpageY;

                    this.setState({
                        style: {
                            top: top ? top : 0,
                            left: left ? left : 0
                        }
                    });
                });
            });
        }, 0);
    }


    render() {
        const { items, closeMenu } = this.props;

        return (
            <View ref='container' style={[ styles.container, {width: 200}, this.state.style]} >
                <View style={styles.content}>
                    {React.Children.map(items, (child) => {
                        return React.cloneElement(child, {
                            closeMenu: closeMenu
                        });
                    })}
                </View>
            </View>
        );

    }
}

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
