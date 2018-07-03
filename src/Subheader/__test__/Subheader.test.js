import 'react-native';
import React from 'react';
import ThemeProvider from '../../styles/ThemeProvider.react';
import Subheader from '../index';
import Container from '../../Container';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('default props', () => {
    const subheader = renderer.create(
        <ThemeProvider>
            <Subheader text="Test" />
        </ThemeProvider>
    ).toJSON();

    expect(subheader).toMatchSnapshot();
});
it('with inset', () => {
    const subheader = renderer.create(
        <ThemeProvider>
            <Subheader text="Test" inset={true} />
        </ThemeProvider>
    ).toJSON();

    expect(subheader).toMatchSnapshot();
});
