# [Divider](https://material.io/guidelines/components/divider.html)

### Usage

```js
...
import { Divider } from '../react-native-material-ui';
...
render() {
    <View>
      <Text>Hello world!</Text>
      <Divider/>
      <Text>
    </View>
}
```
### API
```js
const propTypes = {
    inset: PropTypes.bool,
    style: PropTypes.shape({
        container: View.propTypes.style,
    }),
};
```