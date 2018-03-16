# Badge
<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/badge-2.png" width="320">

### Usage

```js
...
import { Badge, Icon, Avatar } from 'react-native-material-ui';
...
render() {
  <Badge text="3" >
    <Icon name="star" />
  </Badge>
  ...
  <Badge
    size={24}
    icon="star"
    style={{ container: { bottom: -8, right: -12 } }}
  >
    <Avatar text="BR" />
  </Badge>
}
```
### API
```js
const propTypes = {
    /**
    * The badge will be added relatively to this node
    */
    children: PropTypes.node,
    /**
    * This is the content rendered within the badge
    */
    text: PropTypes.string,
    /**
    * When the icon is set, the content will be <Icon name={icon} /> element
    */
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            name: PropTypes.string,
            color: PropTypes.string,
            size: PropTypes.number,
        }),
    ]),
    /**
    * Just sugar for style={{ container: { width: size, height: size, borderRadius: size / 2 }}}
    */
    size: PropTypes.number,
};
```
