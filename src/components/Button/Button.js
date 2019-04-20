// @flow
import * as React from 'react'
import { View, Text } from 'react-native'
import type { ViewStyleProp, TextStyleProp, Theme } from '../../types'
import { ThemeContext } from '../../theme'
import Icon from '../../Icon'
import RippleFeedback from '../../RippleFeedback'

type ButtonProps = {|
  testID?: string,
  /**
   * Text will be shown on button
   */
  text: string,
  /**
   * If true button will be disabled
   */
  disabled?: boolean,
  /**
   * If true button will be raised
   */
  raised?: boolean,
  outlined?: boolean,
  /**
   * Button text will be in uppercase letters
   */
  upperCase?: boolean,
  /**
   * If specified it'll be shown before text
   */
  icon?: string,
  /**
   * Name of Icon set that should be use. From react-native-vector-icons
   */
  iconSet?: string,
  primary?: boolean,
  accent?: boolean,
  /**
   * You can override any style for this button
   */
  style?: ViewStyleProp,
  textStyle?: TextStyleProp,
  onPressValue?: any,
  /**
   * Called when button is pressed. Text is passed as param
   */
  onPress?: any => any,
  /**
   * Called when button is long pressed. Text is passed as param
   */
  onLongPress?: any => any,
|}
type ButtonState = {
  isPressed: boolean,
}

class Button extends React.PureComponent<ButtonProps, ButtonState> {
  context: Theme

  static contextType = ThemeContext

  static defaultProps = {
    upperCase: true,
  }

  constructor(props: ButtonProps) {
    super(props)

    this.state = {
      isPressed: false,
    }
  }

  getStyles = () => {
    const {
      accent,
      primary,
      disabled,
      raised,
      outlined,
      style,
      textStyle,
    } = this.props
    const { isPressed } = this.state
    const { getButtonStyles } = this.context

    return getButtonStyles({
      isPressed,
      primary,
      accent,
      disabled,
      raised,
      outlined,
      style,
      textStyle,
    })
  }

  onPressed = () => {
    const { onPressValue, onPress } = this.props

    if (onPress) {
      onPress(onPressValue)
    }
  }

  onLongPressed = () => {
    const { onPressValue, onLongPress } = this.props

    if (onLongPress) {
      onLongPress(onPressValue)
    }
  }

  onInPressed = () => {
    this.setState({
      isPressed: true,
    })
  }

  onOutPressed = () => {
    this.setState({
      isPressed: false,
    })
  }

  renderIcon = () => {
    const { icon, iconSet } = this.props
    const styles = this.getStyles()

    if (!icon) {
      return null
    }

    let result

    if (React.isValidElement(icon)) {
      result = icon
    } else if (typeof icon === 'string') {
      result = (
        <Icon iconSet={iconSet} name={icon} iconStyle={styles.text} size={24} />
      )
    }

    return result
  }

  render() {
    const { text, disabled, raised, upperCase, testID } = this.props
    const styles = this.getStyles()

    const content = (
      <View style={styles.container} pointerEvents="box-only">
        {this.renderIcon()}
        <Text style={styles.text}>{upperCase ? text.toUpperCase() : text}</Text>
      </View>
    )

    if (disabled) {
      return content
    }

    return (
      <RippleFeedback
        testID={testID}
        onPress={!disabled ? this.onPressed : null}
        onLongPress={!disabled ? this.onLongPressed : null}
        onPressIn={raised ? this.onInPressed : null}
        onPressOut={raised ? this.onOutPressed : null}
        delayPressIn={50}
      >
        {content}
      </RippleFeedback>
    )
  }
}

export default Button
