import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ThemeProvider from '../../styles/ThemeProvider.react';

import Helper from '../Helper.react';

/* eslint-env jest */

const text = 'helper';

it('renders helper', () => {
    const helper = renderer
        .create(
            <ThemeProvider>
                <Helper>{text}</Helper>
            </ThemeProvider>)
        .toJSON();

    expect(helper)
        .toMatchSnapshot();
});
