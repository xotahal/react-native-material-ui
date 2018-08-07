# Checkbox
![Imgur](http://i.imgur.com/eUUOXMv.jpg)

### Usage
```jsx
...
import { Checkbox } from 'react-native-material-ui'
...

render() {
    <View>
        <Checkbox label="I Agree" value="agree" checked={true} />
    </View>
}
```


### API
```jsx
const propTypes = {
    /**
    * Text will be shown after Icon
    */
    label: PropTypes.string,
    /**
    * Value will be returned when onCheck is fired
    */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /**
    * True if it's check
    */
    checked: PropTypes.bool,
    /**
    * Is checkbox active
    */
    disabled: PropTypes.bool,
    /**
    * Will be shown when checked is false
    */
    uncheckedIcon: PropTypes.string,
    /**
    * Will be shown when checked is true
    */
    checkedIcon: PropTypes.string,
    /**
    * Event that is called when state is changed
    */
    onCheck: PropTypes.func,
};

const defaultProps = {
    checkedIcon: 'check-box',
    uncheckedIcon: 'check-box-outline-blank',
    disabled: false,
    style: {},
};
```
