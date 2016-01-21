# React Native Material Design

[![npm](https://img.shields.io/npm/v/react-native-material-design.svg)](https://www.npmjs.com/package/react-native-material-design)
[![Dependency Status](https://david-dm.org/react-native-material-design/react-native-material-design.svg)](https://david-dm.org/react-native-material-design/react-native-material-design.svg)
[![GitHub issues](https://img.shields.io/github/issues/react-native-material-design/react-native-material-design.svg)](https://github.com/react-native-material-design/react-native-material-design/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/react-native-material-design/react-native-material-design/master/LICENSE)
[![Join the chat at https://gitter.im/react-native-material-design/react-native-material-design](https://badges.gitter.im/react-native-material-design/react-native-material-design.svg)](https://gitter.im/react-native-material-design/react-native-material-design?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

React Native components which implement [Material Design](https://www.google.com/design/spec/material-design/introduction.html).

This repository has been heavily developed on top of the [mrn](https://github.com/binggg/mrn) project started by **@binggg**. Improvements include support for the latest React Native versions,
many bug fixes, extra components, backward compatibility to Android SDK API 16 and more.

> Please keep in mind this is still a work in progress. The master branch is subject to breaking changes.

Looking for a demo app? [Check out the repo](https://github.com/react-native-material-design/demo-app).

Or view it online [here](https://appetize.io/app/hyp1m20y515c16cj5yw2karcjg)! (Credits to Appetize for free hosting).

## Installation

```
npm i react-native-material-design --save
```

Copy the `MaterialIcons` font file from [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons#android) to your local working directory:

`./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf` -> `./android/app/src/main/assets/fonts`.

Import any required components into your project, for example:

```
import { Button, Card } from 'react-native-material-design';
```

> You may need to restart your packager in order for the icons to render.

## Documentation

Documentation & full installation instructions are available at http://react-native-material-design.github.io

## React Native 0.16+

This library only works with React Native 0.16+ due to the breaking changes with Babel and font loading it introduced.

## Examples

![Example 1](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-1.jpg "Example 1")
![Example 2](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-2.jpg "Example 2")
![Example 3](https://raw.githubusercontent.com/react-native-material-design/demo-app/master/resources/examples-3.jpg "Example 3")

## Contributing

Full contributing guidelines are to be written, however please ensure you follow the points when sending in PRs:

- Ensure no lint warns occur via `npm run lint`.
- Follow the Material Design [guidelines](https://www.google.com/design/spec/layout/metrics-keylines.html#metrics-keylines-baseline-grids).
