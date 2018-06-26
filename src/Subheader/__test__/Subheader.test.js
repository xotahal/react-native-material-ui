import 'react-native';
import React from 'react';
import Subheader from '../index';
import Container from '../../Container';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('default props', () => {
    const subheader = renderer.create(
        <Subheader text="Test" />
    ).toJSON();

    expect(subheader).toMatchSnapshot();
});
it('with inset', () => {
    const subheader = renderer.create(
        <Subheader text="Test" inset={true} />
    ).toJSON();

    expect(subheader).toMatchSnapshot();
});
