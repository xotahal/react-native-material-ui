# [Card](https://material.io/guidelines/components/cards.html)
<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/dialogs-2.png" width="285">

### Usage

```js
...
import { Dialog, DialogDefaultActions } from '../react-native-material-ui';
...
render() {
    <View>
      <Dialog>
        <Dialog.Title><Text>Hello world</Text></Dialog.Title>
        <Dialog.Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <DialogDefaultActions
             actions={['Dismiss', 'Keep']}
             onActionPress={() => {}}
          />
        </Dialog.Actions>
      </Dialog>
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

const defaultProps = {
    style: {},
};
```


##### TODO
- [ ] Add API to doc
