# [BottomNavigation](https://material.google.com/components/bottom-navigation.html)

<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/bottom-navigation-1.gif" width="285">
<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/bottom-navigation-anim.gif" width="285">

### Usage

```js
...
import { BottomNavigation } from 'react-native-material-ui';
...
render() {
    <BottomNavigation active={this.state.active} hidden={false} >
        <BottomNavigation.Action
            key="today"
            icon="today"
            label="Today"
            onPress={() => this.setState({ active: 'today' })}
        />
        <BottomNavigation.Action
            key="people"
            icon="people"
            label="People"
            onPress={() => this.setState({ active: 'people' })}
        />
        <BottomNavigation.Action
            key="bookmark-border"
            icon="bookmark-border"
            label="Bookmark"
            onPress={() => this.setState({ active: 'bookmark-border' })}
        />
        <BottomNavigation.Action
            key="settings"
            icon="settings"
            label="Settings"
            onPress={() => this.setState({ active: 'settings' })}
        />
    </BottomNavigation>
}
```
### API
```js
// BottomNavigation
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
    hidden: PropTypes.bool, /* DEFAULT: false */
    /*
    * Inline style of bottom navigation
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
    }),
};

// BottomNavigation.Action
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
