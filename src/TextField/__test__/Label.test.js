import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ThemeProvider from '../../styles/ThemeProvider.react';

import Label from '../Label.react';

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
    const label = renderer
        .create(
            <ThemeProvider>
                <Label {...props}>{text}</Label>
            </ThemeProvider>);

    expect(label.toJSON())
        .toMatchSnapshot();
});

it('renders active label', () => {
    const label = renderer
        .create(
            <ThemeProvider>
                <Label active {...props}>{text}</Label>
            </ThemeProvider>);

    expect(label.toJSON())
        .toMatchSnapshot();
});

it('renders focused label', () => {
    const label = renderer
        .create(
            <ThemeProvider>
                <Label focused {...props}>{text}</Label>
            </ThemeProvider>);

    expect(label.toJSON())
        .toMatchSnapshot();
});

it('renders errored label', () => {
    const label = renderer
        .create(
            <ThemeProvider>
                <Label errored {...props}>{text}</Label>
            </ThemeProvider>);

    expect(label.toJSON())
        .toMatchSnapshot();
});

it('renders restricted label', () => {
    const label = renderer
        .create(
            <ThemeProvider>
                <Label restricted {...props}>{text}</Label>
            </ThemeProvider>);

    expect(label.toJSON())
        .toMatchSnapshot();
});
