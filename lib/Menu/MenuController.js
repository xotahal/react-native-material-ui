import { View } from 'react-native';
import Overlay from './Overlay';
import React, { Component, PropTypes } from 'react';

export default class MenuController extends Component {

    static childContextTypes = {
        menuController: PropTypes.object
    };
    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object
    };

    constructor(props) {
        super(props);

        this._menus = new Map();

        this.state = {
            openMenu: null
        };
    }
    getChildContext() {
        return {
            menuController: this
        };
    }

    add(menu) {
        const lastId = this._menus.size;
        const menuId = lastId + 1;

        this._menus.set(menuId, menu);

        return menuId;
    }
    close = () => {
        this.setState({ openMenu: null });
    }
    open = (menu, target) => {
        this.setState({
            openMenu: menu,
            target
        });
    }
    toggle = (menu, target) => {
        if (this.state.openMenu) {
            this.setState({
                openMenu: null,
                target: null
            });
        } else {
            this.setState({
                openMenu: menu,
                target
            });
        }
    }
    remove = (menu) => {
        this._menus.delete(menu.getId());
    }

    render() {
        const overlay = this.state.openMenu ? <Overlay onPress={this.close} /> : null;

        // TODO:
        // the overlay could be render within menu if there is request to know
        // that the menu is close via overlay's onPress
        return (
            <View style={{ flex: 1 }}>
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
