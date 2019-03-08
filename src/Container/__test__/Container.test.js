import { View } from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Container from '../index';

it('default props', () => {
  const subheader = renderer
    .create(
      <Container>
        <View />
      </Container>,
    )
    .toJSON();

  expect(subheader).toMatchSnapshot();
});
