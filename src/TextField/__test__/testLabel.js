import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Label from '.';

/* eslint-env jest */

const text = 'test';
const props = {
  baseSize: 32,
  basePadding: 4,
  fontSize: 16,
  activeFontSize: 12,
  tintColor: 'blue',
  baseColor: 'black',
  errorColor: 'red',
  animationDuration: 225,
};

it('renders label', () => {
  let label = renderer
    .create(<Label {...props}>{text}</Label>);

  expect(label.toJSON())
    .toMatchSnapshot();
});

it('renders active label', () => {
  let label = renderer
    .create(<Label active {...props}>{text}</Label>);

  expect(label.toJSON())
    .toMatchSnapshot();
});

it('renders focused label', () => {
  let label = renderer
    .create(<Label focused {...props}>{text}</Label>);

  expect(label.toJSON())
    .toMatchSnapshot();
});

it('renders errored label', () => {
  let label = renderer
    .create(<Label errored {...props}>{text}</Label>);

  expect(label.toJSON())
    .toMatchSnapshot();
});

it('renders restricted label', () => {
  let label = renderer
    .create(<Label restricted {...props}>{text}</Label>);

  expect(label.toJSON())
    .toMatchSnapshot();
});
