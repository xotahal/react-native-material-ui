/* eslint-disable import/no-unresolved, import/extensions */
import { Platform } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import { black } from './colors';

export const ELEVATION_ZINDEX = 1;

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
                zIndex: ELEVATION_ZINDEX,
            };
        }

        return { };
    }

    return { elevation };
};

export default getPlatformElevation;
