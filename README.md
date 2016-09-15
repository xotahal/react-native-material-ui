
# React Native Material UI
**Highly customizable material design components for React Native!**

[![npm](https://img.shields.io/npm/v/react-native-material-ui.svg)](https://www.npmjs.com/package/react-native-material-ui)
[![Dependency Status](https://david-dm.org/react-native-material-design/react-native-material-design.svg)](https://david-dm.org/react-native-material-design/react-native-material-design.svg)
[![GitHub issues](https://img.shields.io/github/issues/xotahal/react-native-material-ui.svg)](https://github.com/xotahal/react-native-material-ui/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/xotahal/react-native-material-ui/master/LICENSE)


# Getting Started

```bash
npm i react-native-material-ui --save
```

Copy the `MaterialIcons` font file from [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons#android) to your local working directory:

`./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf` -> `./android/app/src/main/assets/fonts`.

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
Another great feature is, you can use the uiTheme everywhere. Even in your own components. So if you built your own implementation of `Button` for example, look how you can get the primary color.

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
Of course, sometimes we need to change style of only one component. It means, all `buttons` have red background, but facebook login button that should have blue background. Every each component have `style` property. So you can very easily overide whatever you want.

```js
<Button style={{ container: { backgroundColor: 'blue' }}} />
```
# Examples

You can try our [Demo App](https://github.com/xotahal/react-native-material-ui-demo-app)!


![Example 1](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-1.jpg "Example 1")
![Example 2](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-2.jpg "Example 2")
![Example 3](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-3.jpg "Example 3")



# Components

Here is a list of all component included in this library. (I'm working on documentation for every each component. Be patient please :))

- [Action Button](https://github.com/xotahal/react-native-material-ui/blob/master/docs/ActionButton.md)
- Avatar
- [Button](https://github.com/xotahal/react-native-material-ui/blob/master/docs/Button.md)
- Card
- Checkbox
- Dialog
- Divider
- Drawer
- Icon
- Icon toggles
- List item
- Radio button
- Subheader
- Toolbar
