# Avatar

### Usage

```js
...
import { Avatar } from 'react-native-material-ui';
...
render() {
    <View>
        <Avatar text="A" />

        <Avatar icon="grade" />
        <Avatar icon="person" iconColor="blue" />
        <Avatar icon="history" iconSize={20} />
        <Avatar icon="mic" size={75} />
    </View>
}
```
### API
```js
const propTypes = {
    /**
    * If passed in, this component will render image.
    */
    image: PropTypes.shape({ type: PropTypes.oneOf([Image]) }),
    /**
    * If passed in, this component will render icon element inside avatar.
    */
    icon: PropTypes.string,
    /**
    * If passed in, this component will render an icon with this color.
    */
    iconColor: PropTypes.string,
    /**
    * If passed in, this component will render an icon with this size.
    */
    iconSize: PropTypes.number,
    /**
    * If passed in, this component will render text element inside avatar.
    */
    text: PropTypes.string,
    /**
    * It's just sugar for: style: { width: size, height: size, borderRadius: size / 2 }
    */
    size: PropTypes.number,
    /**
    * Inline style of avatar
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
        content: Text.propTypes.style,
    }),
};
```
