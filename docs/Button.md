# [Button](https://material.google.com/components/buttons.html)
<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/buttons-1.jpg" height="560">

### Usage

```js
...
import { Button } from 'react-native-material-ui';
...
render() {
    <View>
        <Button primary text="Primary" /> // flat button with primary color
        <Button accent text="Accent" /> // flat button with accent color
        <Button raised primary text="Primary" /> // raised button with primary color
        <Button disabled text="Disabled" /> // disabled button
    </View>
}
```
### API
```js
const propTypes = {
    /**
    * If true button will be disabled
    */
    disabled: PropTypes.bool,
    /**
    * If true button will be raised
    */
    raised: PropTypes.bool,
    /**
    * Called when button is pressed. Text is passed as param
    */
    onPress: PropTypes.func,
    /**
    * Called when button is long pressed. Text is passed as param
    */
    onLongPress: PropTypes.func,
    /**
    * Text will be shown on button
    */
    text: PropTypes.string.isRequired,
    /**
    * Button text will be in uppercase letters
    */
    upperCase: PropTypes.bool,
    /**
    * If specified it'll be shown before text
    */
    icon: PropTypes.string,
    /**
    * You can overide any style for this button
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
        text: Text.propTypes.style,
    }),
};

const defaultProps = {
    primary: false,
    accent: false,
    disabled: false,
    raised: false,
    upperCase: true,
    style: {},
};
```
