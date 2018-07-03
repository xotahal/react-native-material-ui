# [BottomNavigationAction](https://material.google.com/components/bottom-navigation.html)

### Usage

Check [this](https://github.com/xotahal/react-native-material-ui/blob/master/docs/BottomNavigation.md) for more infromation on the BottomNavigation component.

```js
...
import { BottomNavigationAction } from 'react-native-material-ui';
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
    * Will be rendered above the label as a content of the action.
    */
    icon: PropTypes.string.isRequired,
    /**
    * Will be rendered under the icon as a content of the action.
    */
    label: PropTypes.string,
    /**
    * True if the action is active (for now it'll be highlight by primary color)
    */
    active: PropTypes.bool.isRequired,
    /**
    * Callback for on press event.
    */
    onPress: PropTypes.func,
    /**
    * Inline style of bottom navigation
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
        active: Text.propTypes.style,
        disabled: Text.propTypes.style,
    }),
};
```
