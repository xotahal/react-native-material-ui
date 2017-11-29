
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

## Setting of vector icons
You can see [this repo](https://github.com/oblador/react-native-vector-icons) for much more information.

### React Native Link (recommended)
> Make sure you have atleast v0.31.0 react-native version.

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

To achieve the level of customizability, React Native Material UI is using a single JS object called uiTheme that is passed in via context. By default, this uiTheme object is based on the lightTheme that you can find [here](https://github.com/xotahal/react-native-material-ui/blob/master/src/styles/themes/light.js). So, you can change almost everything very easily.

The uiTheme object contains the following keys:

	spacing: {} // can be used to change the spacing of components.
	fontFamily: {} // can be used to change the default font family.
	palette: {  // can be used to change the color of components.
        primaryColor: blue500,
        accentColor: red500,
        ...
	}
	typography: {} // can be used to change the typography of components
	// you can change style of every each component
	avatar: {}
	button: {}
	toolbar: {}
	...


```js
import React, { Component } from 'react';
import { Navigator, NativeModules } from 'react-native';

import { COLOR, ThemeProvider } from '../react-native-material-ui';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

class Main extends Component {
    render() {
        return (
            <ThemeProvider uiTheme={uiTheme}>
                <App />
            </ThemeProvider>
        );
    }
}
```
**It means, if you want to change primary color of your application for example. You can just pass to ThemeProvider object with your own settings.** Your settings will be merged with default theme.

## What else?
Another great feature is, you can use the `uiTheme` everywhere. Even in your own components. So if you built your own implementation of `Button` for example, look how you can get the primary color.

```js
import ...

const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

class MyButton extends Component {
    render() {
	    // it's really easy to get primary color everywhere in your app
        const { primaryColor } = this.context.uiTheme.palette;

        return ...
    }
}

export ...
```

## Local changes
Of course, sometimes we need to change style of only one component. It means, all `buttons` have red background, but facebook login button that should have blue background. Every each component have `style` property. So you can very easily override whatever you want.

```js
<Button style={{ container: { backgroundColor: 'blue' }}} />
```
# Animations are included

<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/action-button-labels.gif" width="285">
<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/fab-to-toolbar-1.gif" width="285">
<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/bottom-navigation-anim.gif" width="285">

Note: You have to allow the animations for Android ([see React Native's documentation](http://facebook.github.io/react-native/releases/0.33/docs/animations.html#layoutanimation))
```js
UIManager.setLayoutAnimationEnabledExperimental && 
UIManager.setLayoutAnimationEnabledExperimental(true);
```
# Themes are supported


<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/buttons-2.png" width="285">
<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/buttons-3.png" width="285">
<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/buttons-4.png" width="285">

# Toolbar with search feature

<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/toolbars-search.gif" width="285">

# Examples

You can try our [Demo App](https://github.com/xotahal/react-native-material-ui-demo-app)!

<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/toolbars-1.png" width="280">
<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/toolbars-anim-1.gif" width="280">
<img src="https://raw.githubusercontent.com/xotahal/react-native-material-ui-demo-app/master/resources/bottom-navigation-1.gif" width="285">

![Example 1](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-1.jpg "Example 1")
![Example 2](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-2.jpg "Example 2")
![Example 3](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-3.jpg "Example 3")



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
- [Divider](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Drawer.md)
- [Drawer](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Divider.md)
- [Icon](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Icon.md)
- [Icon toggles](https://github.com/xotahal/react-native-material-ui/blob/master/docs/IconToggle.md)
- [List item](https://github.com/xotahal/react-native-material-ui/blob/master/docs/ListItem.md)
- [Radio button](https://github.com/xotahal/react-native-material-ui/blob/master/docs/RadioButton.md)
- [Subheader](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Subheader.md)
- [Toolbar](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Toolbar.md)
