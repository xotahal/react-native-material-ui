# [Snackbar](https://material.io/design/components/snackbars.html)

### Usage

```js
...
import { Snackbar } from 'react-native-material-ui';
...
render() {
    const {isVisible} = this.state
    <View>
      <Snackbar visible={isVisible} message="hello World" onRequestClose={() => this.setState({ isVisible: false })} />
    </View>
}
```
### API
```js
const propTypes = {
  /**
   * The text message to display.
   */
  message: PropTypes.string.isRequired,
  /**
   * Whether or not the snackbar is visible.
   */
  visible: PropTypes.bool,
  /**
   * The amount of time in milliseconds to show the snackbar.
   */
  timeout: PropTypes.number,
  /**
   * Callback for when the timeout finishes.
   */
  onRequestClose: PropTypes.func.isRequired,
  /**
   * Whether or not there is a bottom navigation on the screen.
   */
  bottomNavigation: PropTypes.bool,
  /**
   * The function to execute when the action is clicked.
   */
  onActionPress: PropTypes.func,
  /**
   * The function to execute when the action is clicked.
   */
  actionText: PropTypes.string,
  /**
   * Take a look at the Button component for more details.
   */
  button: PropTypes.shape({
    ...Button.propTypes, 
    text: PropTypes.string,
  }),
  /**
   * Inline style of snackbar
   */
  style: PropTypes.shape({
    container: ViewPropTypes.style,
    message: ViewPropTypes.style,
  }),
  /**
   * The function to execute when the snackbar's height changes.
   */
  onHeightChange: PropTypes.func,
  /**
   * Callback for when the snackbar is pressed.
   */
  onPress: PropTypes.func,
  /**
   * Theme
   */
  theme: PropTypes.any, 
};
```
