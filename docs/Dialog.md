# [Dialog](https://material.google.com/components/dialogs.html#dialogs-behavior)
<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/dialogs-2.png" width="285">

### Usage

```js
...
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';
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
             actions={['cancel', 'ok']}
             /**
             * this will disable the button for "ok"
             */
             options={{ ok: { disabled: true } }}
             onActionPress={() => {}}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
}
```
### API

### DialogDefaultActions/DialogStackedActions props
```js
const propTypes = {
    actions: PropTypes.arrayOf(PropTypes.string).isRequired,
    options: PropTypes.shape({
      actionName: { disabled: PropTypes.bool }
    }),
    onActionPress: PropTypes.func.isRequired,
    style: PropTypes.shape({
        defaultActionsContainer: ViewPropTypes.style,
    }),
};
```

##### TODO
- [X] Add API to doc
