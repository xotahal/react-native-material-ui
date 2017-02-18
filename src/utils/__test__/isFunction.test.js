import isFunction from '../isFunction';

describe('isFunction()', () => {
    it('isFunction', () => {
        expect(isFunction()).toBeFalsy();
        expect(isFunction('a')).toBeFalsy();
        expect(isFunction(() => {})).toBeTruthy();
    });
});
