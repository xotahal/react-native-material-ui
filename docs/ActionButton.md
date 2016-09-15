# [Action Button](https://material.google.com/components/buttons-floating-action-button.html)
<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/action-button-1.jpg" height="560">

### Usage

```js
...
import { ActionButton } from '../react-native-material-ui';
...
render() {
    <View>
        <ActionButton /> // default with icon (default icon is +)
        <ActionButton icon="done" /> // with done icon
    </View>
}
```
### API
```js
const propTypes = {
    /**
    * Called when button is pressed. Text is passed as param
    */
    onPress: PropTypes.func,
    /**
    * Called when button is long pressed. Text is passed as param
    */
    onLongPress: PropTypes.func,
    /**
    * If specified it'll be shown before text
    */
    icon: PropTypes.string,
    /**
    * You can overide any style for this button
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
        icon: Text.propTypes.style,
    }),
};
```
