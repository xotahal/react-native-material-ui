import 'react-native';
import React from 'react';
import Toolbar from '../index';
import Button from '../../Button';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Searchable', () => {
    it('searchable object', () => {
        const subheader = renderer.create(
            <Toolbar
                leftElement="menu"
                centerElement="Searchable"
                searchable={{
                    autoFocus: true,
                    placeholder: 'Search',
                }}
            />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('searchable active', () => {
        const subheader = renderer.create(
            <Toolbar
                leftElement="menu"
                centerElement="Searchable"
                isSearchActive
                searchable={{
                    autoFocus: true,
                    placeholder: 'Search',
                }}
            />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
});
describe('Left element', () => {
    it('left element only', () => {
        const subheader = renderer.create(
            <Toolbar leftElement="menu" centerElement="Test" />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
});
describe('Center element', () => {
    it('center element only', () => {
        const subheader = renderer.create(
            <Toolbar centerElement="Test" />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
});
describe('Right element', () => {
    it('right element only', () => {
        const subheader = renderer.create(
            <Toolbar centerElement="Test" rightElement="menu" />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('right element - actions, menu', () => {
        const subheader = renderer.create(
            <Toolbar
                centerElement="Test"
                rightElement={{
                    actions: ['edit'],
                    menu: { labels: ['Item 1', 'Item 2'] },
                }}
            />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
    it('right element - custom element', () => {
        const subheader = renderer.create(
            <Toolbar
                centerElement="Test"
                rightElement={
                    <Button
                        text="Save"
                        style={{ text: { color: 'white' } }}
                    />
                }
            />
        ).toJSON();

        expect(subheader).toMatchSnapshot();
    });
});
