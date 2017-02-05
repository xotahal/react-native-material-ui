/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent, PropTypes } from 'react';
import { Animated, View, Easing, Platform, InteractionManager } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */

import IconToggle from '../IconToggle';

const propTypes = {
    name: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    size: PropTypes.number,
    color: PropTypes.string,
};
const defaultProps = { };
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

class SearchIcon extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.onPressed = this.onPressed.bind(this);
        this.animateBackground = this.animateBackground.bind(this);

        this.state = {
            backgroundScaleValue: new Animated.Value(0.01),
            // backgroundLeft: props.isSearchActive ? 0 : null,
            // backgroundRight: props.isSearchActive ? null : 0,
            // backgroundTop: 6,
            // backgroundSize: 0,
        };
    }
    onPressed() {
        // this.animateBackground();
        const { onPress } = this.props;
        if (onPress) {
            onPress();
        }
    }
    animateBackground() {
        const { onPress } = this.props;

        Animated.timing(this.state.backgroundScaleValue, {
            toValue: 1,
            duration: 325,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start(() => {
            if (onPress) {
                onPress();
            }
        });
    }
    render() {
        const { backgroundScaleValue } = this.state;
        const { toolbarSize, size } = this.props;

        const iconMiddle = 48 / 2;
        const diameter = toolbarSize * 2;

        return (
            <View>
                <IconToggle
                    key="searchIcon"
                    name="search"
                    onPress={this.onPressed}
                />
            </View>
        );
    }
}

SearchIcon.propTypes = propTypes;
SearchIcon.defaultProps = defaultProps;
SearchIcon.contextTypes = contextTypes;

export default SearchIcon;
