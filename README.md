# React Native Material Design

[![npm](https://img.shields.io/npm/v/react-native-material-ui.svg)](https://www.npmjs.com/package/react-native-material-ui)
[![Dependency Status](https://david-dm.org/react-native-material-design/react-native-material-design.svg)](https://david-dm.org/react-native-material-design/react-native-material-design.svg)
[![GitHub issues](https://img.shields.io/github/issues/xotahal/react-native-material-ui.svg)](https://github.com/xotahal/react-native-material-ui/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/xotahal/react-native-material-ui/master/LICENSE)

React Native components which implement [Material Design](https://www.google.com/design/spec/material-design/introduction.html).

This repository has been forked from the [react-native-material-design](https://github.com/react-native-material-design/react-native-material-design) project started by **@Ehesp**.

Supported is [React Native](https://github.com/facebook/react-native) 0.16+

- [Getting Started](#getting-started)
- [Examples](#examples)
- [Components](#components)


# Getting Started

```
npm i react-native-material-ui --save
```

Copy the `MaterialIcons` font file from [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons#android) to your local working directory:

`./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf` -> `./android/app/src/main/assets/fonts`.

## Usage

Import any required components into your project, for example:

```js
import React from 'react-native';
import { Button } from 'react-native-material-ui';

class ReactNativeComponent extends React.Component {
  render() {
    return <Button text="Submit" />
  }
}
```

> You may need to restart your packager in order for the icons to render.


## Examples

![Example 1](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-1.jpg "Example 1")
![Example 2](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-2.jpg "Example 2")
![Example 3](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-3.jpg "Example 3")



# Components

This library needs better documentation of components. For now, in this section are some gifs and pictures.

- [Avatar] (#avatar)
- [Button] (#button)
- [Checkbox] (#checkbox)
- [Icon] (#icon)
- [List item] (#list-item)
- [Radio button] (#radio-button)
- [Card] (#card)
- [Drawer](#drawer)
- [Dropdown menu](#dropdown-menu)
- [Toolbar](#toolbar)

## Toolbar

Toolbar has the search feature!

```js
<Toolbar
  searchable={{
    onChangeText: () => { },
    placeholder: 'Search'
  }}
/>
```

![Toolbar] (https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/toolbar/searchable.gif "Searchable toolbar")

## Dropdown menu

You can use dropdown menu on Toolbar and ListItem. You just have to define menuActions. The `onPress` function returns result (either 'itemPressed' or 'dismissed') and index of item in list (0 for 'First', 1 for 'Second' in these examples).

```js
<Toolbar
  menuActions={{
    labels: ['First', 'Second'],
    onPress: (result, index) => { }
  }}
/>
```
```js
<ListItem
  menuActions={{
    labels: ['First', 'Second'],
    onPress: (result, index) => { }
  }}
/>
```

![Dropdown] (https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/dropdown/dropdown.gif)

## Drawer with [account style](https://www.google.com/design/spec/patterns/navigation-drawer.html#navigation-drawer-specs) header

![Drawer] (https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/drawer/drawer.gif)


