import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Helper from '.';

/* eslint-env jest */

const text = 'helper';

it('renders helper', () => {
  let helper = renderer
    .create(<Helper>{text}</Helper>)
    .toJSON();

  expect(helper)
    .toMatchSnapshot();
});
