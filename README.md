# React Native Material Design

React Native components which implement [Material Design](https://www.google.com/design/spec/material-design/introduction.html).

Credits to **@binggg** for the original [mrn](https://github.com/binggg/mrn) repository.

## Installation

```
npm i react-native-material-design --save
```

Copy the `MaterialIcons` font file from [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons#android) to your local working directory:

`./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf` -> `./android/app/src/main/assets/fonts`.

Import any required components into your project:

```
import { Button, Card } from 'react-native-material-design';
```

> You may need to restart your packager in order for the icons to render.

## React Native 0.16

This library only works with React Native 0.16 due to the breaking changes with Babel and font loading it introduced.

## Documentation

Coming soon.

## Contributing

Full contributing guidelines are to be written, however please ensure you follow the points when sending in PRs:

- Ensure no lint warns occur via `npm run lint`.
- Follow the Material Design [guidelines](https://www.google.com/design/spec/layout/metrics-keylines.html#metrics-keylines-baseline-grids).