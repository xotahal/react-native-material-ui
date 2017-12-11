import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
    View,
    TextInput,
    Animated,
    StyleSheet,
    Platform,
    Text,
} from 'react-native';

import RN from 'react-native/package.json';

import Line from './Line.react';
import Label from './Label.react';
import Affix from './Affix.react';
import Helper from './Helper.react';
import Counter from './Counter.react';

const propTypes = {

    /**
    * Accepts all textinput propTypes
    */
    ...TextInput.propTypes,

    /**
    * Android specific propTypes for textInput
    */
    underlineColorAndroid: PropTypes.string,
    disableFullscreenUI: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    editable: PropTypes.bool,

    /**
    * Animation duration in ms
    */
    animationDuration: PropTypes.number,

    /**
    * Textfield label text
    */
    label: PropTypes.string.isRequired,
    /**
    * Textfield helper text, TODO: Change prop name
    */
    title: PropTypes.string,

    /**
    * Text field soft limit for character counter
    */
    characterRestriction: PropTypes.number,

    /**
    * Text field error text
    */
    error: PropTypes.string,

    /**
    * Boolean for disabling the textfield
    */
    disabled: PropTypes.bool,
    /**
    * Type of line if disabled, posible values: 'solid', 'dotted', 'dashed', 'none'
    */
    disabledLineType: Line.propTypes.type,

    /**
    * Render function in order to render an accessory view inside the textfield
    */
    renderAccessory: PropTypes.func,

    /**
    * Props for adding prefix and/or suffix in the textfield
    */
    prefix: PropTypes.string,
    suffix: PropTypes.string,

    /**
    * Boolean for enabling multiline
    */
    multiline: PropTypes.bool,

    /**
    * Override Styles
    */
    style: PropTypes.shape({
        inputContainer: View.propTypes.style,
        container: View.propTypes.style,
        labelText: Text.propTypes.style,
        titleText: Text.propTypes.style,
        affixText: Text.propTypes.style,
        input: TextInput.propTypes.style,
    }),

};

const defaultProps = {

    underlineColorAndroid: 'transparent',
    disableFullscreenUI: true,
    autoCapitalize: 'sentences',
    editable: true,

    animationDuration: 225,

    error: null,

    disabled: false,
    disabledLineType: 'dotted',

    title: null,
    characterRestriction: null,
    renderAccessory: null,

    prefix: null,
    suffix: null,

    multiline: false,
    style: {
        inputContainer: null,
        container: null,
        labelText: null,
        titleText: null,
        affixText: null,
        input: null,
    },
};

function getStyles(props, context, state) {
    const {
        textfield,
        erroredTextfield,
        focusedTextfield,
        palette,
    } = context.uiTheme;
    const {
        restricted,
        value,
        defaultValue,
        disabled,
        multiline,
        title,
        characterRestriction: limit,
    } = props;
    const { focus, receivedFocus } = state;
    let { height } = state;
    const { paddingBottom, fontSize } = StyleSheet.flatten(textfield.inputContainer);
    const labelHeight = StyleSheet.flatten(textfield.label).height;

    if (props.multiline && props.height) {
        /* Disable autogrow if height is passed as prop */
        [height] = props;
    }

    const borderBottomWidth = restricted ?
        2 :
        focus.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [2, StyleSheet.hairlineWidth, 2],
        });

    const textfieldState = {
        borderBottomColor: restricted ?
            StyleSheet.flatten(erroredTextfield.inputContainer).borderBottomColor :
            focus.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [
                    StyleSheet.flatten(erroredTextfield.inputContainer).borderBottomColor,
                    StyleSheet.flatten(textfield.inputContainer).borderBottomColor,
                    StyleSheet.flatten(focusedTextfield.inputContainer).borderBottomColor,
                ],
            }),
        paddingTop: labelHeight,
        paddingBottom,
        ...(disabled ?
            { overflow: 'hidden' } :
            { borderBottomWidth }),
        ...(multiline ?
            { height: labelHeight + paddingBottom + height } :
            { height: labelHeight + paddingBottom + (fontSize * 1.5) }),
    };


    const defaultVisible = !(receivedFocus || value != null || defaultValue == null);
    const styleTextInput = (disabled || defaultVisible) ?
        textfield.input :
        focusedTextfield.input;


    const inputContainerStyle = [textfield.inputContainer, textfieldState];

    const helperFontSize = StyleSheet.flatten(textfield.helperText).fontSize;
    const helperOuterContainer = {
        flexDirection: StyleSheet.flatten(textfield.helperOuterContainer).flexDirection,
        height: (title || limit) ?
            helperFontSize * 2 :
            focus.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [helperFontSize * 2, 8, 8],
            }),
    };

    const errorStyle = {
        opacity: focus.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [1, 0, 0],
        }),

        fontSize: title ?
            helperFontSize :
            focus.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [helperFontSize, 0, 0],
            }),
    };

    const titleStyle = {
        opacity: focus.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [0, 1, 1],
        }),

        fontSize: helperFontSize,
    };

    return {
        inputContainer: [
            inputContainerStyle,
        ],
        input: [
            textfield.input,
            styleTextInput,
        ],
        row: [
            textfield.row,
        ],
        flex: [
            textfield.flex,
        ],
        accessory: [
            textfield.accessory,
        ],
        errorStyle,
        titleStyle,
        helperOuterContainer,
        primaryColor: palette.primaryColor,
    };
}

const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

class TextField extends PureComponent {
    constructor(props) {
        super(props);

        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onPress = this.focus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onContentSizeChange = this.onContentSizeChange.bind(this);

        this.updateRef = this.updateRef.bind(this, 'input');

        const { value, error, fontSize } = this.props;

        this.mounted = false;
        this.state = {
            text: value,

            focus: new Animated.Value(error ? -1 : 0),
            focused: false,
            receivedFocus: false,

            error,
            errored: !!error,

            height: fontSize * 1.5,
        };
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillReceiveProps(props) {
        const { error } = this.state;

        if (props.value != null) {
            this.setState({ text: props.value });
        }

        if (props.error && props.error !== error) {
            this.setState({ error: props.error });
        }

        if (props.error !== this.props.error) {
            this.setState({ errored: !!props.error });
        }
    }

    componentWillUpdate(props, state) {
        const { error, animationDuration } = this.props;
        const { focus, focused } = this.state;

        if (props.error !== error || focused !== state.focused) {
            Animated
                .timing(focus, {
                    toValue: props.error ? -1 : (state.focused ? 1 : 0),
                    duration: animationDuration,
                })
                .start(() => {
                    if (this.mounted) {
                        this.setState((state, { error }) => ({ error }));
                    }
                });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    onContentSizeChange(event) {
        const { onContentSizeChange } = this.props;
        const { height } = event.nativeEvent.contentSize;

        const styles = getStyles(this.props, this.context, this.state);

        if (typeof onContentSizeChange === 'function') {
            onContentSizeChange(event);
        }

        this.setState({
            height: Math.max(
                styles.input.fontSize * 1.5,
                Math.ceil(height) + Platform.select({ ios: 5, android: 1 }),
            ),
        });
    }

    onChangeText(text) {
        const { onChangeText } = this.props;

        this.setState({ text });

        if (typeof onChangeText === 'function') {
            onChangeText(text);
        }
    }

    onFocus(event) {
        const { onFocus } = this.props;

        if (typeof onFocus === 'function') {
            onFocus(event);
        }

        this.setState({ focused: true, receivedFocus: true });
    }

    onBlur(event) {
        const { onBlur } = this.props;

        if (typeof onBlur === 'function') {
            onBlur(event);
        }

        this.setState({ focused: false });
    }

    onChange(event) {
        const { onChange, multiline } = this.props;

        if (typeof onChange === 'function') {
            onChange(event);
        }

        /* XXX: onContentSizeChange is not called on RN 0.44 and 0.45 */
        if (multiline && Platform.OS === 'android') {
            if (/^0\.4[45]\./.test(RN.version)) {
                this.onContentSizeChange(event);
            }
        }
    }

    isFocused() {
        return this.input.isFocused();
    }

    isRestricted() {
        const { characterRestriction } = this.props;
        const { text = '' } = this.state;

        return characterRestriction ? (characterRestriction < text.length) : false;
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    focus() {
        const { disabled, editable } = this.props;

        if (!disabled && editable) {
            this.input.focus();
        }
    }

    blur() {
        this.input.blur();
    }

    clear() {
        this.input.clear();

        /* onChangeText is not triggered by .clear() */
        this.onChangeText('');
    }

    value() {
        const { text, receivedFocus } = this.state;
        const { value, defaultValue } = this.props;

        return (receivedFocus || value != null || defaultValue == null) ?
            text :
            defaultValue;
    }

    renderAccessory() {
        const { renderAccessory } = this.props;
        const styles = getStyles(this.props, this.context, this.state);

        if (typeof renderAccessory !== 'function') {
            return null;
        }

        return (
            <View style={styles.accessory}>
                {renderAccessory()}
            </View>
        );
    }

    renderAffix(type, active, focused) {
        const {
            [type]: affix,
            animationDuration,
            affixTextStyle,
        } = this.props;

        if (affix == null) {
            return null;
        }

        const props = {
            type,
            active,
            focused,
            animationDuration,
        };

        return (
            <Affix style={affixTextStyle} {...props}>{affix}</Affix>
        );
    }

    renderHelper(children, style, errorType = false) {
        if (children) {
            return <Helper errorType={errorType} style={style}>{children}</Helper>;
        }
        return null;
    }

    render() {
        const styles = getStyles(this.props, this.context, this.state);

        const {
            receivedFocus,
            focused,
            error,
            errored,
            text = '',
        } = this.state;
        const {
            style,
            label,
            title,
            defaultValue,
            characterRestriction: limit,
            editable,
            disabled,
            disabledLineType,
            animationDuration,
            renderAccessory,
            ...props
        } = this.props;

        let { value } = this.props;
        let { height } = this.state;

        const defaultVisible = !(receivedFocus || value != null || defaultValue == null);

        value = defaultVisible ?
            defaultValue :
            text;

        const active = !!(value || props.placeholder);
        const count = value.length;
        const restricted = limit ? (limit < count) : false;
        if (props.multiline && props.height) {
            /* Disable autogrow if height is passed as prop */
            [height] = props;
        }

        const inputHeight = {
            ...(props.multiline ?
                {
                    height: (styles.input.fontSize * 1.5) + height,

                    ...Platform.select({
                        ios: { top: -1 },
                        android: { textAlignVertical: 'top' },
                    }),
                } :
                { height: styles.input.fontSize * 1.5 }),
        };

        const containerProps = {
            style: style.container,
            onStartShouldSetResponder: () => true,
            onResponderRelease: this.onPress,
            pointerEvents: !disabled && editable ?
                'auto' :
                'none',
        };

        const inputContainerProps = {
            style: [
                styles.inputContainer,
                StyleSheet.flatten(style.inputContainer),
            ],
        };

        const labelProps = {
            animationDuration,
            active,
            focused,
            errored,
            restricted,
            style: StyleSheet.flatten(style.labelText),
        };

        const counterProps = {
            count,
            limit,
            style: StyleSheet.flatten(style.titleText),
        };

        return (
            <View {...containerProps}>
                <Animated.View {...inputContainerProps}>
                    {disabled && <Line type={disabledLineType} />}

                    <Label {...labelProps}>{label}</Label>

                    <View style={styles.row}>
                        {this.renderAffix('prefix', active, focused)}

                        <TextInput
                            style={[styles.input, StyleSheet.flatten(style.input), inputHeight]}
                            selectionColor={styles.primaryColor}

                            {...props}

                            editable={!disabled && editable}
                            onChange={this.onChange}
                            onChangeText={this.onChangeText}
                            onContentSizeChange={this.onContentSizeChange}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            value={value}
                            ref={this.updateRef}
                        />

                        {this.renderAffix('suffix', active, focused)}
                        {this.renderAccessory()}
                    </View>
                </Animated.View>

                <Animated.View style={styles.helperOuterContainer}>
                    <View style={styles.flex}>
                        { this.renderHelper(error, [styles.errorStyle, StyleSheet.flatten(style.titleText)], true) }
                        { this.renderHelper(title, [styles.titleStyle, StyleSheet.flatten(style.titleText)]) }
                    </View>

                    <Counter {...counterProps} />
                </Animated.View>
            </View>
        );
    }
}

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;
TextField.contextTypes = contextTypes;

export default TextField;
