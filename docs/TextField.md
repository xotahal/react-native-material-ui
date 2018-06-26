# [TextField](https://material.io/guidelines/components/text-fields.html)

### Usage

```js
...
import { TextField } from '../react-native-material-ui';
...
render() {
    <View>
      <TextField
        error="Errored input"
        value="Input value"
        onChangeText= {(text) => this.setState({text})}
      />
    </View>
}
```
### API
```js
const propTypes = {

    /**
    * Accepts all textinput propTypes
    */
    ...TextInput.propTypes,

    /**
    * Android specific propTypes for textInput
    */
    underlineColorAndroid: PropTypes.string,
    disableFullscreenUI: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    editable: PropTypes.bool,

    /**
    * Animation duration in ms
    */
    animationDuration: PropTypes.number,

    /**
    * Textfield label text
    */
    label: PropTypes.string.isRequired,
    /**
    * Textfield helper text, TODO: Change prop name
    */
    title: PropTypes.string,

    /**
    * Text field soft limit for character counter
    */
    characterRestriction: PropTypes.number,

    /**
    * Text field error text
    */
    error: PropTypes.string,

    /**
    * Boolean for disabling the textfield
    */
    disabled: PropTypes.bool,
    /**
    * Type of line if disabled, posible values: 'solid', 'dotted', 'dashed', 'none'
    */
    disabledLineType: Line.propTypes.type,

    /**
    * Render function in order to render an accessory view inside the textfield
    */
    renderAccessory: PropTypes.func,

    /**
    * Props for adding prefix and/or suffix in the textfield
    */
    prefix: PropTypes.string,
    suffix: PropTypes.string,

    /**
    * Boolean for enabling multiline
    */
    multiline: PropTypes.bool,

    /**
    * Override Styles
    */
    style: PropTypes.shape({
        inputContainer: View.propTypes.style,
        container: View.propTypes.style,
        labelText: Text.propTypes.style,
        titleText: Text.propTypes.style,
        affixText: Text.propTypes.style,
        input: TextInput.propTypes.style,
    }),

};

const defaultProps = {

    underlineColorAndroid: 'transparent',
    disableFullscreenUI: true,
    autoCapitalize: 'sentences',
    editable: true,

    animationDuration: 225,

    error: null,

    disabled: false,
    disabledLineType: 'dotted',

    title: null,
    characterRestriction: null,
    renderAccessory: null,

    prefix: null,
    suffix: null,

    multiline: false,
    style: {
        inputContainer: null,
        container: null,
        labelText: null,
        titleText: null,
        affixText: null,
        input: null,
    },
};

```
