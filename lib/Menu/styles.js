import { Dimensions, StyleSheet } from 'react-native';

const window = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 2,
        elevation: 8,
        position: 'absolute',
        top: 0,
        left: 0
    },
    content: {
        paddingTop: 8,
        paddingBottom: 8
    }
});
