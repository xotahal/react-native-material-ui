## What else?

Another great feature is, you can use the `uiTheme` everywhere. Even in your own components. So if you built your own implementation of `Button` for example, look how you can get the primary color.

```js
import { withTheme } from 'react-native-material-ui'

class MyButton extends Component {
    render() {
	    // it's really easy to get primary color everywhere in your app
        const { primaryColor } = this.props.theme.palette;

        return ...
    }
}

export default withTheme(MyButton)
```

## Local changes

Of course, sometimes we need to change style of only one component. It means, all `buttons` have red background, but facebook login button that should have blue background. Every each component have `style` property. So you can very easily override whatever you want.

```js
<Button style={{ container: { backgroundColor: 'blue' } }} />
```
