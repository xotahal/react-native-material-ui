import getTheme from '../getTheme';

import { red500 } from '../colors';

const uiTheme = {
    palette: {
        primaryColor: '#fff',
    },
    actionButton: {
        container: {
            width: 100,
        },
    },
};


describe('getTheme', () => {
    it('objects exist', () => {
        const theme = getTheme(uiTheme);

        expect(!!theme.palette).toBeTruthy();
        expect(!!theme.fontFamily).toBeTruthy();
        expect(!!theme.spacing).toBeTruthy();
        expect(!!theme.typography).toBeTruthy();

        expect(!!theme.actionButton).toBeTruthy();
        expect(!!theme.actionButton.container).toBeTruthy();
        expect(!!theme.listItem).toBeTruthy();
    });
    it('merges properly', () => {
        const theme = getTheme(uiTheme);

        expect(theme.palette.primaryColor).toBe('#fff');
        expect(theme.actionButton.container.width).toBe(100);
    });
});
