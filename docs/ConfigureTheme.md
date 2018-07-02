# Usage

**If you want to use default theme, you can skip this step**

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

import {
  COLOR,
  ThemeContext,
  getTheme,
} from 'external/react-native-material-ui';

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
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <App />
      </ThemeContext.Provider>
    );
  }
}
```

**It means, if you want to change primary color of your application for example. You can just pass to ThemeContext.Provider object with your own settings.** Your settings will be merged with default theme.
