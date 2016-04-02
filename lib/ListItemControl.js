import React, {
    Component,
    StyleSheet,
    PropTypes,
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native';

import { TYPO } from './config';

const defaultStyles = StyleSheet.create({
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 56,
        paddingHorizontal: 16
    },

    contentViewContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },


    leftViewContainer: {
        flexDirection: 'column',
        width: 56
    },
    leftIcon: {
    },
    leftAvatar: {
        flex: 1,
    },

    textViewContainer: {
        flex: 1
    },
    primaryText: Object.assign({}, TYPO.paperFontSubhead, { lineHeight: 24 }),
    secondaryText: Object.assign({}, TYPO.paperFontBody1, {
        lineHeight: 22,
        fontSize: 14,
        color: 'rgba(0,0,0,.54)'
    }),
    firstLine: {
        flexDirection: 'row'
    },
    primaryTextContainer: {
        flex: 1
    },

    rightViewContainer: {
        flexDirection: 'column',
        paddingLeft: 16
    },
    rightActionsViewContainer: {
        flex: 1
    },
    rightIcon: {
        flex: 1,
    },
    rightAvatar: {
        width: 56
    },

    captionText: Object.assign({}, TYPO.paperFontCaption),
    captionTextContainer: {
        flex: 1
    },
    captionTextContainer2: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    }
});

export default class List extends Component {

    static propTypes = {
        primaryText: PropTypes.string.isRequired,
        leftElement: PropTypes.element,
        rightElement: PropTypes.element,
        styles: PropTypes.object,
    };

    static defaultProps = {
        lines: 1,
        primaryColor: 'rgba(0,0,0,.87)'
    };
    render() {
        const {
            primaryText,
            leftElement,
            rightElement,
            styles
        } = this.props;

        return (
            <TouchableNativeFeedback onPress={this._onListItemPressed}>
                <View style={[defaultStyles.listContainer, styles.listContainer]}>
                    <View style={[defaultStyles.contentViewContainer]}>
                        {
                            (leftElement) &&
                            <View
                              style={[defaultStyles.leftViewContainer]}
                            >
                                <View style={[defaultStyles.leftIcon]}>
                                    {leftElement}
                                </View>
                            </View>
                        }

                        <View style={defaultStyles.textViewContainer}>
                            <View style={defaultStyles.primaryTextContainer}>
                                <Text style={[defaultStyles.primaryText]} >
                                    {primaryText}
                                </Text>
                            </View>
                        </View>


                        <View style={[defaultStyles.rightViewContainer]}>
                            {rightElement &&
                                <View style={[defaultStyles.rightAvatar]} >
                                    {rightElement}
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
