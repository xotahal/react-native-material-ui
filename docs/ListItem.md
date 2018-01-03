# [ListItem](https://material.io/guidelines/components/lists-controls.html#lists-controls-types-of-list-controls)

It can be embbeded in a `FlatList` or a `SectionList` (or a `ListView`, but it is deprecated)

### Usage

```js
...
import { ListItem } from '../react-native-material-ui';
...
render() {
    <View>
      <ListItem
        divider
        centerElement={{
          primaryText: 'Primary text',
        }}
        onPress={() => {}}
      />
    </View>
}
```
### API
```js
const propTypes = {
    // generally
    dense: PropTypes.bool,
    // should render divider after list item?
    divider: PropTypes.bool,
    onPress: PropTypes.func,
    onPressValue: PropTypes.any, // eslint-disable-line
    /**
    * Called when list item is long pressed.
    */
    onLongPress: PropTypes.func,
    numberOfLines: PropTypes.oneOf([1, 2, 3, 'dynamic']),
    style: PropTypes.shape({
        container: View.propTypes.style,
        contentViewContainer: View.propTypes.style,
        leftElementContainer: View.propTypes.style,
        centerElementContainer: View.propTypes.style,
        textViewContainer: View.propTypes.style,
        primaryText: Text.propTypes.style,
        firstLine: View.propTypes.style,
        primaryTextContainer: Text.propTypes.style,
        secondaryText: Text.propTypes.style,
        tertiaryText: Text.propTypes.style,
        rightElementContainer: View.propTypes.style,
        leftElement: View.propTypes.style,
        rightElement: View.propTypes.style,
    }),

    // left side
    leftElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
    onLeftElementPress: PropTypes.func,

    // center side
    centerElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.shape({
            primaryText: PropTypes.string.isRequired,
            secondaryText: PropTypes.string,
            tertiaryText: PropTypes.string,
        }),
    ]),

    // right side
    rightElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.shape({
            menu: PropTypes.shape({
                labels: PropTypes.array.isRequired,
            }),
        }),
    ]),
    onRightElementPress: PropTypes.func,
    /**
     * Children passed into the `ListItem`.
     */
    children: PropTypes.node,
};
```
