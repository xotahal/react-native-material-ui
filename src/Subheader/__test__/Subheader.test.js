import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Subheader from '../index';

it('default props', () => {
  const subheader = renderer.create(<Subheader text="Test" />).toJSON();

  expect(subheader).toMatchSnapshot();
});
it('with inset', () => {
  const subheader = renderer.create(<Subheader text="Test" inset />).toJSON();

  expect(subheader).toMatchSnapshot();
});
