# React Native Material UI (iOS and Android supported)

**Highly customizable material design components for React Native!**

[![npm](https://img.shields.io/npm/v/react-native-material-ui.svg)](https://www.npmjs.com/package/react-native-material-ui)
[![codecov](https://codecov.io/gh/xotahal/react-native-material-ui/branch/master/graph/badge.svg)](https://codecov.io/gh/xotahal/react-native-material-ui)
[![npm](https://img.shields.io/npm/dm/react-native-material-ui.svg)](https://img.shields.io/npm/dm/react-native-material-ui.svg)
[![GitHub issues](https://img.shields.io/github/issues/xotahal/react-native-material-ui.svg)](https://github.com/xotahal/react-native-material-ui/issues)
[![Dependencies](https://david-dm.org/xotahal/react-native-material-ui.svg)](https://david-dm.org/xotahal/react-native-material-ui.svg)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/xotahal/react-native-material-ui/master/LICENSE)

# Getting Started

```bash
$ npm i react-native-material-ui --save
```

or

```bash
$ yarn add react-native-material-ui
```

## Setting of vector icons

You can see [this repo](https://github.com/oblador/react-native-vector-icons) for much more information.

### React Native Link (recommended)

> Make sure you have at least v0.31.0 react-native version.

```bash
$ react-native link react-native-vector-icons
```

### Manual Installation

#### Android (see [original](https://github.com/oblador/react-native-vector-icons#android))

Copy the `MaterialIcons` font file from [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons#android) to your local working directory:

`./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf` -> `./android/app/src/main/assets/fonts`.

#### iOS (see [original](https://github.com/oblador/react-native-vector-icons#ios))

## Adding Roboto Font

This project uses Roboto as the main font for text. Make sure to add Roboto to your project, as it will give the following error on iOS.
`Unrecognized font family Roboto`.

You can obtain Roboto free from [here](https://fonts.google.com/specimen/Roboto).

Here is a great tutorial which shows [how to add custom fonts](https://medium.com/@danielskripnik/how-to-add-and-remove-custom-fonts-in-react-native-b2830084b0e4).

# Usage

To achieve a high level of customizability, React Native Material UI uses the new react context functionality. By default, the theme context object is based on the lightTheme that you can find [here](https://github.com/xotahal/react-native-material-ui/blob/master/src/styles/themes/light.js). You can change almost anything very easily.

The theme object contains the following keys *in addition to more component specific keys*:

```json
{
  "spacing": {
    "actionButtonSize": 56,
    "iconSize": 24,
    "avatarSize": 40
  },
  "fontFamily": "Roboto",
  "typography": {
    "fontWeight": {
      "light": "300",
      "normal": "400",
      "medium": "500"
    },
    "appBar": {
      "fontWeight": "500",
      "fontSize": 20
    },
    "buttons": {
      "fontWeight": "500",
      "fontSize": 14
    },
    "subheading": {
      "fontWeight": "400",
      "fontSize": 16,
      "lineHeight": 24
    },
    "body2": {
      "fontWeight": "500",
      "fontSize": 14,
      "lineHeight": 24
    },
    "body1": {
      "fontWeight": "400",
      "fontSize": 14,
      "lineHeight": 20
    }
  },
  "palette": {
    "primaryColor": "#2196f3",
    "accentColor": "#f44336",
    "primaryTextColor": "rgba(0, 0, 0, 0.87)",
    "secondaryTextColor": "rgba(0, 0, 0, 0.54)",
    "alternateTextColor": "#ffffff",
    "canvasColor": "#ffffff",
    "borderColor": "rgba(0, 0, 0, 0.12)",
    "disabledColor": "rgba(0, 0, 0, 0.38)",
    "disabledTextColor": "rgba(0, 0, 0, 0.26)",
    "activeIcon": "rgba(0, 0, 0, 0.54)",
    "inactiveIcon": "rgba(0, 0, 0, 0.38)"
  },
  "avatar": {
    "container": {},
    "content": {}
  },
  "button": {
    "container": {},
    "text": {},
    "icon": {}
  },
  "toolbar": {
    "container": {},
    "leftElementContainer": {},
    "leftElement": {},
    "centerElementContainer": {},
    "titleText": {},
    "rightElementContainer": {},
    "rightElement": {}
  },
}
```

You can customize most components by adding them into the theme object, *see `toolbar` below*.


```js

    import React, { Component } from 'react';

    import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

    // you can set your style right here, it'll be propagated to application
    const theme = {
      palette: {
        primaryColor: COLOR.green500,
      },
      toolbar: {
        container: {
          height: 50,
        },
      },
    };

    export default class Main extends Component {
      render() {
        return (
          <ThemeContext.Provider value={getTheme(theme)}>
            <App />
          </ThemeContext.Provider>
        );
      }
    }
```

**If you want to change primary color of your application for example. You can just pass to ThemeContext.Provider object with your the key palette.primaryColor set to your chosen color.** Your settings will be merged with default theme.

## What else?

Another great feature is, you can use the `theme` context everywhere. Even in your own components. So if you built your own implementation of `Button` for example, look how you can get the primary color.

```js
import { withTheme } from 'react-native-material-ui';

class MyButton extends Component {
    render() {
	    // it's really easy to get primary color everywhere in your app
        const { primaryColor } = this.props.theme.palette;

        return ...
    }
}

export default withTheme(MyButton);
```

## Local changes

Of course, sometimes we need to change style of only one component. It means, all `buttons` have red background, but facebook login button that should have blue background. Every each component have `style` property. So you can very easily override whatever you want.

```js
<Button style={{ container: { backgroundColor: 'blue' } }} />
```

# Animations are included

<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/action-button-labels.gif" width="285"> <img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/fab-to-toolbar-1.gif" width="285"> <img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/bottom-navigation-anim.gif" width="285">

Note: You have to allow the animations for Android ([see React Native's documentation](https://facebook.github.io/react-native/docs/layoutanimation.html))

```js
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
```

# Themes are supported

<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/buttons-2.png" width="285"> <img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/buttons-3.png" width="285"> <img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/buttons-4.png" width="285">

# Toolbar with search feature

<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/toolbars-search.gif" width="285">

# Examples

You can try our [Demo App](https://github.com/xotahal/react-native-material-ui-demo-app)!

<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/toolbars-1.png" width="280"> <img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/toolbars-anim-1.gif" width="280">
<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/bottom-navigation-1.gif" width="285">

![Example 1](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-1.jpg 'Example 1')
![Example 2](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-2.jpg 'Example 2')
![Example 3](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-3.jpg 'Example 3')

# Components

Here is a list of all component included in this library. (I'm working on documentation for every each component. Be patient please :))

- [Action Button](https://github.com/xotahal/react-native-material-ui/blob/master/docs/ActionButton.md)
- [Avatar](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Avatar.md)
- [Badge](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Badge.md)
- [Bottom Navigation](https://github.com/xotahal/react-native-material-ui/blob/master/docs/BottomNavigation.md)
- [Bottom Navigation Action](https://github.com/xotahal/react-native-material-ui/blob/master/docs/BottomNavigationAction.md)
- [Button](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Button.md)
- [Card](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Card.md)
- [Checkbox](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Checkbox.md)
- [Dialog](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Dialog.md)
- [Drawer](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Drawer.md)
- [Divider](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Divider.md)
- [Icon](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Icon.md)
- [Icon toggles](https://github.com/xotahal/react-native-material-ui/blob/master/docs/IconToggle.md)
- [List item](https://github.com/xotahal/react-native-material-ui/blob/master/docs/ListItem.md)
- [Radio button](https://github.com/xotahal/react-native-material-ui/blob/master/docs/RadioButton.md)
- [Subheader](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Subheader.md)
- [Toolbar](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Toolbar.md)
