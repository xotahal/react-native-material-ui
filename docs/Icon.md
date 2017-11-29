# [Icon](https://material.io/guidelines/style/icons.html)

### Usage

```js
...
import { Icon } from '../react-native-material-ui';
...
render() {
    <View>
      <Icon name="person"/>
    </View>
}
```
### API
```js
const propTypes = {
    name: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    size: PropTypes.number,
    color: PropTypes.string,
};
```
