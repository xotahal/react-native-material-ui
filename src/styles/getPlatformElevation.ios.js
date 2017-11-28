/* eslint-enable import/no-unresolved, import/extensions */
import { black, transparent } from './colors';
import { ELEVATION_ZINDEX } from './constants';

const getPlatformElevation = (elevation) => {
    if (elevation === 0) {
        return {
            shadowColor: transparent,
            zIndex: 0,
        };
    }

    return {
        shadowColor: black,
        shadowOpacity: 0.3,
        shadowRadius: elevation / 2,
        shadowOffset: {
            height: 1,
            width: 0,
        },
        // we need to have zIndex on iOS, otherwise the shadow is under components that
        // are rendered later
        zIndex: ELEVATION_ZINDEX,
    };
};

export default getPlatformElevation;
