import getPlatformElevationIos from '../getPlatformElevation.ios';
import getPlatformElevationAndroid from '../getPlatformElevation.android';

const elevation = 4;

describe('getPlatformElevation', () => {
  it('returns empty object if elevation is not legal', () => {
    // ////////////
    // ACT
    // ////////////
    const result = getPlatformElevationIos(0);
    // ////////////
    // ASSERTS
    // ////////////
    expect(result).toMatchSnapshot();
  });
  it('iOS', () => {
    // ////////////
    // ACT
    // ////////////
    const result = getPlatformElevationIos(elevation);
    // ////////////
    // ASSERTS
    // ////////////
    expect(result).toMatchSnapshot();
  });
  it('android', () => {
    // ////////////
    // ACT
    // ////////////
    const result = getPlatformElevationAndroid(elevation);
    // ////////////
    // ASSERTS
    // ////////////
    expect(result).toMatchSnapshot();
  });
});
