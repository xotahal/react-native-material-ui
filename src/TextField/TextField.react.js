import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
    View,
    TextInput,
    Animated,
    StyleSheet,
    Platform,
} from 'react-native';

import RN from 'react-native/package.json';

import Line from './Line.react';
import Label from './Label.react';
import Affix from './Affix.react';
import Helper from './Helper.react';
import Counter from './Counter.react';


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
    } = props;
    const { focus, receivedFocus } = state;

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
    };

    const defaultVisible = !(receivedFocus || value != null || defaultValue == null);
    const styleTextInput = (disabled || defaultVisible) ?
        textfield.input :
        focusedTextfield.input;

    const inputContainerStyle = [textfield.inputContainer, textfieldState];

    return {
        inputContainer: [
            inputContainerStyle,
            props.style.inputContainer,
        ],
        input: [
            textfield.input,
            styleTextInput,
            props.style.input,
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
        primaryColor: palette.primaryColor,
    };
}

const defaultProps = {

    underlineColorAndroid: 'transparent',
    disableFullscreenUI: true,
    autoCapitalize: 'sentences',
    editable: true,

    animationDuration: 225,

    fontSize: 16,
    titleFontSize: 12,
    labelFontSize: 12,
    labelHeight: 32,
    labelPadding: 4,
    inputContainerPadding: 8,

    error: null,

    disabled: false,
    disabledLineType: 'dotted',

    title: null,
    characterRestriction: null,
    renderAccessory: null,

    prefix: null,
    suffix: null,
};

const propTypes = {

    ...TextInput.propTypes,

    underlineColorAndroid: PropTypes.string,
    disableFullscreenUI: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    editable: PropTypes.bool,

    animationDuration: PropTypes.number,

    fontSize: PropTypes.number,
    titleFontSize: PropTypes.number,
    labelFontSize: PropTypes.number,
    labelHeight: PropTypes.number,
    labelPadding: PropTypes.number,
    inputContainerPadding: PropTypes.number,

    // labelTextStyle: Text.propTypes.style,
    // titleTextStyle: Text.propTypes.style,
    // affixTextStyle: Text.propTypes.style,

    label: PropTypes.string.isRequired,
    title: PropTypes.string,

    characterRestriction: PropTypes.number,

    error: PropTypes.string,

    disabled: PropTypes.bool,
    disabledLineType: Line.propTypes.type,

    renderAccessory: PropTypes.func,

    prefix: PropTypes.string,
    suffix: PropTypes.string,

    // containerStyle: (ViewPropTypes || View.propTypes).style,
    // inputContainerStyle: (ViewPropTypes || View.propTypes).style,
};

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
        const { onContentSizeChange, fontSize } = this.props;
        const { height } = event.nativeEvent.contentSize;

        if (typeof onContentSizeChange === 'function') {
            onContentSizeChange(event);
        }

        this.setState({
            height: Math.max(
                fontSize * 1.5,
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
            fontSize,
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
            fontSize,
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
            focus,
            focused,
            error,
            errored,
            text = '',
        } = this.state;
        const {
            style: inputStyleOverrides,
            label,
            title,
            defaultValue,
            characterRestriction: limit,
            editable,
            disabled,
            disabledLineType,
            animationDuration,
            fontSize,
            titleFontSize,
            labelFontSize,
            labelHeight,
            labelPadding,
            inputContainerPadding,
            labelTextStyle,
            titleTextStyle,
            containerStyle,
            inputContainerStyle: inputContainerStyleOverrides,
            renderAccessory,
            ...props
        } = this.props;


        let { value } = this.props;
        let { height } = this.state;


        if (props.multiline && props.height) {
            /* Disable autogrow if height is passed as prop */
            [height] = props;
        }

        const defaultVisible = !(receivedFocus || value != null || defaultValue == null);

        value = defaultVisible ?
            defaultValue :
            text;

        const active = !!(value || props.placeholder);
        const count = value.length;
        const restricted = limit ? (limit < count) : false;


        const borderBottomWidth = restricted ?
            2 :
            focus.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [2, StyleSheet.hairlineWidth, 2],
            });

        const inputContainerStyle = {
            paddingTop: labelHeight,
            paddingBottom: inputContainerPadding,

            ...(disabled ?
                { overflow: 'hidden' } :
                { borderBottomWidth }),

            ...(props.multiline ?
                { height: labelHeight + inputContainerPadding + height } :
                { height: labelHeight + inputContainerPadding + (fontSize * 1.5) }),
        };

        const inputStyle = {
            fontSize,

            ...(props.multiline ?
                {
                    height: (fontSize * 1.5) + height,

                    ...Platform.select({
                        ios: { top: -1 },
                        android: { textAlignVertical: 'top' },
                    }),
                } :
                { height: fontSize * 1.5 }),
        };

        const errorStyle = {
            opacity: focus.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [1, 0, 0],
            }),

            fontSize: title ?
                titleFontSize :
                focus.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [titleFontSize, 0, 0],
                }),
        };

        const titleStyle = {
            opacity: focus.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [0, 1, 1],
            }),

            fontSize: titleFontSize,
        };

        const helperContainerStyle = {
            flexDirection: 'row',
            height: (title || limit) ?
                titleFontSize * 2 :
                focus.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [titleFontSize * 2, 8, 8],
                }),
        };

        const containerProps = {
            style: containerStyle,
            onStartShouldSetResponder: () => true,
            onResponderRelease: this.onPress,
            pointerEvents: !disabled && editable ?
                'auto' :
                'none',
        };

        const inputContainerProps = {
            style: [
                styles.inputContainer,
                inputContainerStyle,
                inputContainerStyleOverrides,
            ],
        };

        const labelProps = {
            baseSize: labelHeight,
            basePadding: labelPadding,
            fontSize,
            activeFontSize: labelFontSize,
            animationDuration,
            active,
            focused,
            errored,
            restricted,
            style: labelTextStyle,
        };

        const counterProps = {
            count,
            limit,
            fontSize: titleFontSize,
            style: titleTextStyle,
        };

        return (
            <View {...containerProps}>
                <Animated.View {...inputContainerProps}>
                    {disabled && <Line type={disabledLineType} />}

                    <Label {...labelProps}>{label}</Label>

                    <View style={styles.row}>
                        {this.renderAffix('prefix', active, focused)}

                        <TextInput
                            style={[styles.input, inputStyle, inputStyleOverrides]}
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

                <Animated.View style={helperContainerStyle}>
                    <View style={styles.flex}>
                        { this.renderHelper(error, [errorStyle, titleTextStyle], true) }
                        { this.renderHelper(title, [titleStyle, titleTextStyle]) }
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
