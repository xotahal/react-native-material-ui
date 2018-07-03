import 'react-native';
import React from 'react';
import ThemeProvider from '../../styles/ThemeProvider.react';
import Button from '../index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Button', () => {
    it('primary, text', () => {
        const subheader = renderer.create(
            <ThemeProvider>
                <Button primary text="Primary" />
            </ThemeProvider>
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('default color', () => {
        const subheader = renderer.create(
            <ThemeProvider>
                <Button text="Default" />
            </ThemeProvider>
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('disabled', () => {
        const subheader = renderer.create(
            <ThemeProvider>
                <Button disabled text="Disabled" />
            </ThemeProvider>
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('raised, primary, text', () => {
        const subheader = renderer.create(
            <ThemeProvider>
                <Button raised primary text="Primary" />
            </ThemeProvider>
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('raised, accent, text', () => {
        const subheader = renderer.create(
            <ThemeProvider>
                <Button raised accent text="Accent" />
            </ThemeProvider>
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('raised default', () => {
        const subheader = renderer.create(
            <ThemeProvider>
                <Button raised text="Default" />
            </ThemeProvider>
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('raised, disabled, default', () => {
        const subheader = renderer.create(
            <ThemeProvider>
                <Button raised disabled text="Disabled" />
            </ThemeProvider>
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('primary, text, icon', () => {
        const subheader = renderer.create(
            <ThemeProvider>
                <Button primary text="Accept" icon="done" />
            </ThemeProvider>
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('accent, text, icon', () => {
        const subheader = renderer.create(
            <ThemeProvider>
                <Button accent text="Dismiss" icon="clear" />
            </ThemeProvider>
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('raised, primary, text, icon', () => {
        const subheader = renderer.create(
            <ThemeProvider>
                <Button raised primary text="Done" icon="done" />
            </ThemeProvider>
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('raised, accent, text, icon', () => {
        const subheader = renderer.create(
            <ThemeProvider>
                <Button raised accent text="Clear" icon="clear" />
            </ThemeProvider>
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('onPress', () => {
        const subheader = renderer.create(
            <ThemeProvider>
                <Button text="Clear" onPress={() => {}} />
            </ThemeProvider>
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
});
