/* eslint-enable import/no-unresolved, import/extensions */
import { black } from './colors';

const getPlatformElevation = (elevation) => {

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
    
};

export default getPlatformElevation;
