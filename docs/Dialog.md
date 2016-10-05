# [Dialog](https://material.google.com/components/dialogs.html#dialogs-behavior)
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
...
```

##### TODO
- [ ] Add API to doc
