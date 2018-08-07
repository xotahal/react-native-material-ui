import 'react-native';
import React from 'react';
import Button from '../index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Button', () => {
    it('primary, text', () => {
        const subheader = renderer.create(
            <Button primary text="Primary" />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('default color', () => {
        const subheader = renderer.create(
            <Button text="Default" />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('disabled', () => {
        const subheader = renderer.create(
            <Button disabled text="Disabled" />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('raised, primary, text', () => {
        const subheader = renderer.create(
            <Button raised primary text="Primary" />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('raised, accent, text', () => {
        const subheader = renderer.create(
            <Button raised accent text="Accent" />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('raised default', () => {
        const subheader = renderer.create(
            <Button raised text="Default" />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('raised, disabled, default', () => {
        const subheader = renderer.create(
            <Button raised disabled text="Disabled" />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('primary, text, icon', () => {
        const subheader = renderer.create(
            <Button primary text="Accept" icon="done" />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('accent, text, icon', () => {
        const subheader = renderer.create(
            <Button accent text="Dismiss" icon="clear" />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('raised, primary, text, icon', () => {
        const subheader = renderer.create(
            <Button raised primary text="Done" icon="done" />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('raised, accent, text, icon', () => {
        const subheader = renderer.create(
            <Button raised accent text="Clear" icon="clear" />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('onPress', () => {
        const subheader = renderer.create(
            <Button text="Clear" onPress={() => {}} />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
});
