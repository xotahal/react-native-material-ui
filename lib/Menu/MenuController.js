import Items from './MenuItems';
import Overlay from './Overlay';
import React, { Animated, Dimensions, ListView, PropTypes, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

export default class MenuController extends React.Component {

    static childContextTypes = {
        menuController: React.PropTypes.object
    };

    constructor(props){
        super(props);

        this._menus = new Map();

        this.state = {
            openMenu: null
        }
    }

    add(menu) {
        const lastId = this._menus.size;
        const menuId = lastId + 1;

        this._menus.set(menuId, menu);

        return menuId;
    }
    close(menu) {
        this.setState({
            openMenu: null
        })
    }
    getChildContext() {
        return {
            menuController: this
        }
    }
    open(menu, target){
        this.setState({
            openMenu: menu,
            target: target
        })
    }
    toggle(menu, target){
        if(this.state.openMenu){
            this.setState({
                openMenu: null,
                target: null
            });
        }else{
            this.setState({
                openMenu: menu,
                target: target
            });
        }
    }
    remove(menu) {
        this._menus.delete(menu.getId());
    }

    render() {
        const { children } = this.props;

        const overlay = this.state.openMenu ? <Overlay onPress={() => this.close()} /> : null;

        // TODO:
        // the overlay could be render within menu if there is request to know
        // that the menu is close via overlay's onPress
        return (
            <View style={{flex: 1}}>
                <View style={this.props.style}>
                    {this.props.children}
                </View>
                { overlay }
                {
                    this.state.openMenu &&
                    this.state.openMenu.getOptions(this.state.target)
                }
            </View>
        );

    }
}


const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: window.height,
        bottom: -window.height,
        left: 0
    },
    overlay: {
        elevation: 4,
        backgroundColor: 'rgba(0,0,0,0.8)'
    }
});
