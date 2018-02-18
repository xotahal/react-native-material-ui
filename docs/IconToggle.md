# IconToggle

### Usage

```js
...
import { IconToggle } from 'react-native-material-ui';
...
render() {
    <View>
      <IconToggle name="person"/>
    </View>
}
```
### API
```js
const propTypes = {
    color: PropTypes.string,
    /**
    * The color of the underlay that will show when the touch is active.
    */
    underlayColor: PropTypes.string,
    /**
    * Max opacity of ripple effect
    */
    maxOpacity: PropTypes.number,
    /**
    * Size of underlayColor
    */
    percent: PropTypes.number,
    /**
    * If true, the interaction will be forbidden
    */
    disabled: PropTypes.bool,
    /**
    * Size of icon (default is 24 - see spacing in palette)
    */
    size: PropTypes.number,
    /**
    * Name of icon to show
    */
    name: PropTypes.string.isRequired,
    /**
    * It'll be used instead of icon (see props name) if exists
    */
    children: PropTypes.element,
    /**
    * Call when icon was pressed
    */
    onPress: PropTypes.func,
    style: PropTypes.shape({
        container: View.propTypes.style,
        icon: Text.propTypes.style,
    }),
};
```
