import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Line from '../Line.react';

/* eslint-env jest */

[{ type: 'solid', color: 'black' }, { type: 'dotted', color: 'grey' }]
    .forEach(({ type, color }) => {
        it(`renders ${type} ${color} line`, () => {
            const line = renderer
                .create(<Line type={type} color={color} />)
                .toJSON();

            expect(line)
                .toMatchSnapshot();
        });
    });

