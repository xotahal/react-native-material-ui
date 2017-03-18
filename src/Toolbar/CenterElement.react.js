/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent, PropTypes } from 'react';
import { Animated, TouchableWithoutFeedback, Text, TextInput, Easing, Platform } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */

const propTypes = {
    isSearchActive: PropTypes.bool.isRequired,
    searchValue: PropTypes.string.isRequired,
    searchable: PropTypes.object,
    style: PropTypes.object,
    centerElement: PropTypes.node,
    onPress: PropTypes.func,
    onSearchTextChange: PropTypes.func.isRequired,
};
const defaultProps = {
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context, state = {}) {
    const { toolbar, toolbarSearchActive } = context.uiTheme;
    const { isSearchActive } = state;

    return {
        centerElementContainer: [
            toolbar.centerElementContainer,
            isSearchActive && toolbarSearchActive.centerElementContainer,
            props.style.centerElementContainer,
        ],
        titleText: [
            toolbar.titleText,
            isSearchActive && toolbarSearchActive.titleText,
            props.style.titleText,
        ],
    };
}

class CenterElement extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isSearchActive: props.isSearchActive,
            opacityValue: new Animated.Value(1),
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.isSearchActive !== nextProps.isSearchActive) {
            this.animateElements(nextProps.isSearchActive);
        }
    }
    animateElements = (nextIsSearchActive) => {
        Animated.timing(this.state.opacityValue, {
            toValue: 0,
            duration: 112,
            easing: Easing.linear,
            useNativeDriver: Platform.OS === 'android',
        }).start(() => {
            this.setState({
                isSearchActive: nextIsSearchActive,
            });

            Animated.timing(this.state.opacityValue, {
                toValue: 1,
                duration: 112,
                easing: Easing.linear,
                useNativeDriver: Platform.OS === 'android',
            }).start();
        });
    }
    render() {
        const { searchable, centerElement, onPress, onSearchTextChange, searchValue } = this.props;
        const { opacityValue, isSearchActive } = this.state;
        const styles = getStyles(this.props, this.context, this.state);

        // there can be situastion like this:
        // 1. Given toolbar with title and searchable feature
        // 2. User presses search icon - isSearchActive === true
        // 3. User writes some search text and then select searched items in list (just example)
        // 4. Then you want to display to user he has 'n' selected items
        // 5. So you render toolbar with another props like centerElement==="n items selected" but
        //    you don't want user to be able search anymore (after he has selected something)
        // 6. So this.props.searchable===null and isSearchActive === true, if you pass searchable
        //    object again to this instance, search text and isSearchActive will be still set
        let content = null;

        if (isSearchActive) {
            content = (
                <TextInput
                    ref={(ref) => { this.searchFieldRef = ref; }}
                    autoFocus={searchable.autoFocus}
                    autoCapitalize={searchable.autoCapitalize}
                    autoCorrect={searchable.autoCorrect}
                    onChangeText={onSearchTextChange}
                    onSubmitEditing={searchable.onSubmitEditing}
                    placeholder={searchable.placeholder}
                    style={[styles.titleText, { marginLeft: 0 }]}
                    underlineColorAndroid="transparent"
                    value={searchValue}
                />
            );
        } else if (typeof centerElement === 'string') {
            content = (
                <Text numberOfLines={1} style={styles.titleText}>
                    {centerElement}
                </Text>
            );
        } else {
            content = centerElement;
        }

        return (
            <TouchableWithoutFeedback key="center" onPress={onPress}>
                <Animated.View
                    style={[
                        styles.centerElementContainer,
                        { opacity: opacityValue },
                    ]}
                >
                    {content}
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

CenterElement.propTypes = propTypes;
CenterElement.defaultProps = defaultProps;
CenterElement.contextTypes = contextTypes;

export default CenterElement;
