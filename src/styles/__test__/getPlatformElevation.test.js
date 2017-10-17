import { Platform } from 'react-native';

import getPlatformElevationIos from '../getPlatformElevation.ios';
import getPlatformElevationAndroid from '../getPlatformElevation.android';
import { black } from '../colors';

const elevation = 4;

const iOSResult = {
    shadowColor: black,
    shadowOpacity: 0.3,
    shadowRadius: elevation,
    shadowOffset: { height: 2, width: 0 },
    zIndex: 1,
};

describe('getPlatformElevation', () => {
    it('returns empty object if elevation is not legal', () => {
        // ////////////
        // ACT
        // ////////////
        const result = getPlatformElevationIos(0);
        // ////////////
        // ASSERTS
        // ////////////
        expect(result).toEqual({});
    });
    it('iOS', () => {
        // ////////////
        // ACT
        // ////////////
        const result = getPlatformElevationIos(elevation);
        // ////////////
        // ASSERTS
        // ////////////
        expect(result).toEqual(iOSResult);
    });
    it('android', () => {
        // ////////////
        // ACT
        // ////////////
        const result = getPlatformElevationAndroid(elevation);
        // ////////////
        // ASSERTS
        // ////////////
        expect(result.elevation).toBe(elevation);
    });
});
