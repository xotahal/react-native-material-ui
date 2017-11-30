import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Line from '.';

/* eslint-env jest */

[{ type: 'solid', color: 'black' }, { type: 'dotted', color: 'grey' }]
  .forEach(({ type, color }) => {
    it(`renders ${type} ${color} line`, () => {
      let line = renderer
        .create(<Line type={type} color={color} />)
        .toJSON();

      expect(line)
        .toMatchSnapshot();
    });
  });

