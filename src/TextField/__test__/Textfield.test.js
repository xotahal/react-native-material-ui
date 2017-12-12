import { Image } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ThemeProvider from '../../styles/ThemeProvider.react';

import TextField from '../TextField.react';

const props = {
    label: 'test',
};

/* eslint-env jest */

it('renders', () => {
    const field = renderer
        .create(
            <ThemeProvider>
                <TextField {...props} />
            </ThemeProvider>)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders value', () => {
    const field = renderer
        .create(
            <ThemeProvider>
                <TextField {...props} value="text" />
            </ThemeProvider>)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders disabled value', () => {
    const field = renderer
        .create(
            <ThemeProvider>
                <TextField {...props} value="text" disabled />
            </ThemeProvider>)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders default value', () => {
    const field = renderer
        .create(
            <ThemeProvider>
                <TextField {...props} defaultValue="text" />
            </ThemeProvider>)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders multiline value', () => {
    const field = renderer
        .create(
            <ThemeProvider>
                <TextField {...props} value="text" multiline />
            </ThemeProvider>)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders title', () => {
    const field = renderer
        .create(
            <ThemeProvider>
                <TextField {...props} title="field" />
            </ThemeProvider>)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders error', () => {
    const field = renderer
        .create(
            <ThemeProvider>
                <TextField {...props} error="message" />
            </ThemeProvider>)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders counter', () => {
    const field = renderer
        .create(
            <ThemeProvider>
                <TextField {...props} value="text" characterRestriction={10} />
            </ThemeProvider>)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders restriction', () => {
    const field = renderer
        .create(
            <ThemeProvider>
                <TextField {...props} value="text" characterRestriction={2} />
            </ThemeProvider>)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders prefix', () => {
    const field = renderer
        .create(
            <ThemeProvider>
                <TextField {...props} value="text" prefix="$" />
            </ThemeProvider>)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders suffix', () => {
    const field = renderer
        .create(
            <ThemeProvider>
                <TextField {...props} value="text" suffix=".com" />
            </ThemeProvider>)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders accessory', () => {
    const render = () => <Image />;

    const field = renderer
        .create(
            <ThemeProvider>
                <TextField {...props} renderAccessory={render} />
            </ThemeProvider>)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});
