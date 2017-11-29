# [Drawer](https://material.io/guidelines/patterns/navigation-drawer.html)

### Usage

```js
...
import { Drawer } from '../react-native-material-ui';
...
render() {
    <View>
      <Drawer>
        <Drawer.Header >
            <Drawer.Header.Account
                avatar={<Avatar text="A" />}
                accounts={[
                    { avatar: <Avatar text="B" /> },
                    { avatar: <Avatar text="C" /> },
                ]}
                footer={{
                    dense: true,
                    centerElement: {
                        primaryText: 'Reservio',
                        secondaryText: 'business@email.com',
                    },
                    rightElement: 'arrow-drop-down',
                }}
            />
        </Drawer.Header>
        <Drawer.Section
            divider
            items={[
                { icon: 'bookmark-border', value: 'Notifications' },
                { icon: 'today', value: 'Calendar', active: true },
                { icon: 'people', value: 'Clients' },
            ]}
        />
        <Drawer.Section
            title="Personal"
            items={[
                { icon: 'info', value: 'Info' },
                { icon: 'settings', value: 'Settings' },
            ]}
        />
      </Drawer>
    </View>
}
```
### API
```js
const propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.shape({
        container: ScrollView.propTypes.style,
    }),
};
```
It might contain as children Headers, HeaderAcounts and Section. These elements have the following APIs.

### Header API
```js
const propTypes = {
    image: PropTypes.shape({ type: PropTypes.oneOf([Image]) }),
    backgroundColor: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.shape({
        contentContainer: View.propTypes.style,
        container: View.propTypes.style,
    }),
};
```

### HeaderAccount API
```js
const propTypes = {
    avatar: PropTypes.element,
    accounts: PropTypes.arrayOf(PropTypes.shape({
        avatar: PropTypes.element,
        onPress: PropTypes.func,
    })),
    footer: ListItem.propTypes,
    style: PropTypes.shape({
        container: View.propTypes.style,
        accountContainer: View.propTypes.style,
        topContainer: View.propTypes.style,
        avatarsContainer: View.propTypes.style,
        activeAvatarContainer: View.propTypes.style,
        inactiveAvatarContainer: View.propTypes.style,
    }),
};
```

### Section API
```js
const propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
        label: PropTypes.string,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
    })),
    divider: PropTypes.bool,
    style: PropTypes.shape({
        container: View.propTypes.style,
        item: View.propTypes.style,
        subheader: View.propTypes.style,
        icon: Text.propTypes.style,
        value: Text.propTypes.style,
        label: Text.propTypes.style,
    }),
};
```