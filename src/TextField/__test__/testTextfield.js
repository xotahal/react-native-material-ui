import { Image } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import TextField from '../TextField.react';

const props = {
    label: 'test',
};

/* eslint-env jest */

it('renders', () => {
    const field = renderer
        .create(<TextField {...props} />)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders value', () => {
    const field = renderer
        .create(<TextField {...props} value="text" />)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders disabled value', () => {
    const field = renderer
        .create(<TextField {...props} value="text" disabled />)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders default value', () => {
    const field = renderer
        .create(<TextField {...props} defaultValue="text" />)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders multiline value', () => {
    const field = renderer
        .create(<TextField {...props} value="text" multiline />)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders title', () => {
    const field = renderer
        .create(<TextField {...props} title="field" />)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders error', () => {
    const field = renderer
        .create(<TextField {...props} error="message" />)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders counter', () => {
    const field = renderer
        .create(<TextField {...props} value="text" characterRestriction={10} />)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders restriction', () => {
    const field = renderer
        .create(<TextField {...props} value="text" characterRestriction={2} />)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders prefix', () => {
    const field = renderer
        .create(<TextField {...props} value="text" prefix="$" />)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders suffix', () => {
    const field = renderer
        .create(<TextField {...props} value="text" suffix=".com" />)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});

it('renders accessory', () => {
    const render = () => <Image />;

    const field = renderer
        .create(<TextField {...props} renderAccessory={render} />)
        .toJSON();

    expect(field)
        .toMatchSnapshot();
});
