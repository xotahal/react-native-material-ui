# [Subheader](https://material.io/guidelines/components/subheaders.html)

### Usage

```js
...
import { Subheader } from '../react-native-material-ui';
...
render() {
    <View>
      <Subheader text="Subheader text" />
    </View>
}
```
### API
```js
const propTypes = {
    text: PropTypes.string.isRequired,
    inset: PropTypes.bool,
    lines: PropTypes.number,
    style: PropTypes.shape({
        contaienr: View.propTypes.style,
        text: Text.propTypes.style,
    }),
};
```