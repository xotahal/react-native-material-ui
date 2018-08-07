# [Card](https://material.io/guidelines/components/cards.html)

### Usage

```js
...
import { Card } from '../react-native-material-ui';
...
render() {
    <View>
      <Card>
        <Text>Hello world!</Text>
      </Card>
    </View>
}
```
### API
```js
const propTypes = {
    /**
    * Called when card is pressed
    */
    onPress: PropTypes.func,
    /**
    * You can override any style for this card
    */
    style: PropTypes.object,
};
```
