import 'react-native';
import React from 'react';
import Container from '../index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('default props', () => {
    const subheader = renderer.create(
        <Container />
    ).toJSON();

    expect(subheader).toMatchSnapshot();
});
