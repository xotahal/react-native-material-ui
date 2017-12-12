import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ThemeProvider from '../../styles/ThemeProvider.react';

import Counter from '../Counter.react';

/* eslint-env jest */

const props = {
    baseColor: 'blue',
    errorColor: 'red',
    fontSize: 12,
};

it('renders null when limit is not set', () => {
    const counter = renderer
        .create(
            <ThemeProvider>
                <Counter count={1} {...props} />
            </ThemeProvider>)
        .toJSON();

    expect(counter)
        .toBeNull();
});

it('renders when limit is set', () => {
    const counter = renderer
        .create(
            <ThemeProvider>
                <Counter count={1} limit={1} {...props} />
            </ThemeProvider>)
        .toJSON();

    expect(counter)
        .toMatchSnapshot();
});

it('renders when limit is exceeded', () => {
    const counter = renderer
        .create(
            <ThemeProvider>
                <Counter count={2} limit={1} {...props} />
            </ThemeProvider>)
        .toJSON();

    expect(counter)
        .toMatchSnapshot();
});
