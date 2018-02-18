# [RadioButton](https://material.io/guidelines/components/selection-controls.html#selection-controls-radio-button)

### Usage

```js
...
import { RadioButton } from 'react-native-material-ui';
...
render() {
    <View>
      <RadioButton
          label="Unchecked"
          checked={this.state.checked}
          value="Value"
          onCheck={checked => this.setState({ checked })}
      />
      <RadioButton label="Checked by default" checked value="Value" />
      <RadioButton
          label="Custom icon"
          checked
          uncheckedIcon="star-border"
          checkedIcon="star"
          value="Value"
      />
      <RadioButton label="Disabled unchecked" disabled value="Value" />
      <RadioButton label="Disabled checked" checked disabled value="Value" />
    </View>
}
```
### API
```js
const propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    theme: PropTypes.string,
};
```
