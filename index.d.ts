// Type definitions for react-native-material-ui
// Project: https://github.com/xotahal/react-native-material-ui
// Definitions by: Kyle Roach <https://github.com/iRoachie>
// TypeScript Version: 2.3.3

import { Component } from 'react'
import { ViewStyle, TextStyle } from 'react-native'

interface IButtonStyle {
    container?: ViewStyle
    text?: TextStyle
}

interface IButton {
    disabled?: boolean
    text: string
    raised?: boolean
    uppercase?: boolean
    accent?: boolean
    icon?: string
    style?: IButtonStyle
    onPress(): void
}

interface IToolbarStyle {
    container?: ViewStyle
    leftElementContainer?: ViewStyle
    leftElement?: TextStyle
    centerElementContainer?: ViewStyle
    titleText?: TextStyle
    rightElementContainer?: ViewStyle
    rightElement?: TextStyle
}

interface IToolbar {
    leftElement?: JSX.Element | string
    rightElement?: JSX.Element | string | string[]
    centerElement?: JSX.Element | string
    style?: IToolbarStyle
    onLeftElementPress?(): void
    onRightElementPress?(): void
    searchable?: object
}

interface IThemeProvider {
    uiTheme: {}
}

interface IListItemCenterElement {
    primaryText: string
    secondaryText?: string
}

interface IListItem {
    numberOfLines?: number
    leftElement?: JSX.Element | string
    rightElement?: JSX.Element | string
    centerElement: JSX.Element | string | IListItemCenterElement
    style?: IToolbarStyle
    dense?: boolean
    onPress?(): void
    onRightElementPress?(): void
}

interface IActionButton {
    icon?: string
    onPress(): void
    style?: {
        container?: ViewStyle,
        icon?: any
    }
}

interface ICheckBox {
    label?: string
    value: string | number
    checked?: boolean
    disabled?: boolean
    uncheckedIcon?: string
    checkedIcon?: string
    style?: {
        icon?: ViewStyle,
        container?: ViewStyle,
        label?: TextStyle
    }
    onCheck?(checked: boolean): void
}

export class ActionButton extends Component<IActionButton, any> { }
export class Button extends Component<IButton, any> { }
export class Checkbox extends Component<ICheckBox, any> { }
export class ListItem extends Component<IListItem, any> { }
export class ThemeProvider extends Component<IThemeProvider, any> { }
export class Toolbar extends Component<IToolbar, any> { }
