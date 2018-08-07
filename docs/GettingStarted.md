# Getting Started

```bash
$ yarn add react-native-material-ui
```

** If you already use react-native-vector-icons in your project you are ready to go!**

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
