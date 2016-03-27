import { Platform } from 'react-native';
import { PRIMARY, COLOR } from './config';

/**
 * Detect whether a color is a hex code/rgba or a paper element style
 * @param string
 * @returns {*}
 */
export function getColor(string) {
    if (string) {
        if (string.indexOf('#') > -1 || string.indexOf('rgba') > -1) {
            return string;
        }

        if (COLOR[string]) {
            return COLOR[string].color;
        }

        if (COLOR[`${string}500`]) {
            return COLOR[`${string}500`].color;
        }
    }

    return COLOR[`${PRIMARY}500`].color;
}

/**
 * Detect whether a specific feature is compatible with the device
 * @param feature
 * @returns bool
 */
export function isCompatible(feature) {
    const version = Platform.Version;

    switch (feature) {
        case 'TouchableNativeFeedback':
            return version >= 21;
            break;
        case 'elevation':
            return version >= 21;
            break;
        default:
            return true;
            break;
    }
}
