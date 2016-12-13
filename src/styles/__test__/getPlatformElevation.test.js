import { Platform } from 'react-native';

import getPlatformElevation from '../getPlatformElevation';
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
        const result = getPlatformElevation(0);
        // ////////////
        // ASSERTS
        // ////////////
        expect(result).toEqual({});
    });
    it('iOS', () => {
        // ////////////
        // ACT
        // ////////////
        const result = getPlatformElevation(elevation);
        // ////////////
        // ASSERTS
        // ////////////
        expect(result).toEqual(iOSResult);
    });
    it('android', () => {
        Platform.OS = 'android';
        // ////////////
        // ACT
        // ////////////
        const result = getPlatformElevation(elevation);
        // ////////////
        // ASSERTS
        // ////////////
        expect(result.elevation).toBe(elevation);
    });
});
