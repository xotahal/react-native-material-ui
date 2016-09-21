import { Platform } from 'react-native';
import { black } from './colors';

const getPlatformElevation = (elevation) => {
    if (Platform.OS === 'ios') {
        if (elevation !== 0) {
            return {
                shadowColor: black,
                shadowOpacity: 0.3,
                shadowRadius: elevation,
                shadowOffset: {
                    height: 2,
                    width: 0,
                },
                // we need to have zIndex on iOS, otherwise the shadow is under components that
                // are rendered later
                zIndex: 1,
            };
        }

        return { };
    }

    return { elevation };
};

export default getPlatformElevation;
