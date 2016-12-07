# [BottomNavigation](https://material.google.com/components/bottom-navigation.html)

### Usage

Check [this](https://github.com/xotahal/react-native-material-ui/blob/master/docs/BottomNavigationAction.md) for more infromation on the BottomNavigationAction component.

```js
...
import { BottomNavigation } from '../react-native-material-ui';
...
state = {
  navIndex: 0,
};

render() {
  <BottomNavigation>
    <BottomNavigationAction
      label="Home"
      iconName="home"
      isActive={this.state.navIndex === 0}
      onPress={() => this.setState({navIndex: 0})}
    />
    <BottomNavigationAction
      label="Collection"
      iconName="collections"
      isActive={this.state.navIndex === 1}
      onPress={() => this.setState({navIndex: 1})}
    />
    <BottomNavigationAction
      label="Store"
      iconName="store"
      isActive={this.state.navIndex === 2}
      onPress={() => this.setState({navIndex: 2})}
    />
    <BottomNavigationAction
      label="Menu"
      iconName="menu"
      isActive={this.state.navIndex === 3}
      onPress={() => this.setState({navIndex: 3})}
    />
  </BottomNavigation>
}
```
### API
```js
const propTypes = {
    /**
    * The key of selected/active tab
    */
    active: PropTypes.string,
    /**
    * BottomNavigation.Action nodes
    */
    children: PropTypes.node.isRequired,
    /**
    * Wether or not the BottomNaviagtion should show
    */
    hidden: PropTypes.bool,
    /**
    * Inline style of bottom navigation
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
    }),
};
```
