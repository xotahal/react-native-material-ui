import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ThemeProvider from '../../styles/ThemeProvider.react';

import Line from '../Line.react';

/* eslint-env jest */

[{ type: 'solid', color: 'black' }, { type: 'dotted', color: 'grey' }]
    .forEach(({ type, color }) => {
        it(`renders ${type} ${color} line`, () => {
            const line = renderer
                .create(
                    <ThemeProvider>
                        <Line type={type} color={color} />
                    </ThemeProvider>)
                .toJSON();

            expect(line)
                .toMatchSnapshot();
        });
    });

