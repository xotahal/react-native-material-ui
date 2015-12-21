import { PRIMARY, COLOR } from './config';

/**
 * Detect whether a color is a hex code/rgba or a paper element style
 * @param string
 * @returns {*}
 */
export function getColor(string) {
    if (string) {
        if (string.contains('#') || string.contains('rgba')) {
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