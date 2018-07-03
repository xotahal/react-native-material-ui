import Item from './MenuItem';
import Items from './MenuItems';
import React, { Animated, ListView, PropTypes, Text, View } from 'react-native';

export default class Menu extends React.Component {

    static propTypes = {
    };
    static contextTypes = {
        menuController: React.PropTypes.object
    };

    static Item = Item;

    constructor(props){
        super(props);
        this._id = null;
    }

    componentDidMount() {
        setTimeout(() => {
            this._id = this.context.menuController.add(this.refs.menu);
        }, 0);
    }
    componentWillUnmount() {
        this.context.menuController.remove(this);
    }
    getId() {
        return this._id;
    }
    getOptions(target) {
        const { children } = this.props;

        return (
            <Items
                items={children}
                closeMenu={() => this.close()}
                ref='menuItems'
                target={target}
            />
        );
    }

    toggle(target) {
        this.context.menuController.toggle(this, target);
    }
    open(target) {
        this.context.menuController.open(this, target);
    }
    close() {
        this.context.menuController.close(this);
    }
    _onItemPressed = (item) => {
        this.close();
    };

    render() {
        return null;
    }
}
