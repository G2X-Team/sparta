import { SpartaCSS, SpartaTheme } from '../../src';

describe('SpartaCSS', () => {
    it('should return expected object when getCSS is called', () => {
        // given
        const spartaTheme = new SpartaCSS();
        const expected = {
            id: 'sparta-css',
            children: expect.anything(),
        };

        // when
        const css = spartaTheme.getCSS();

        // then
        expect(css).toMatchObject(expected);
    });

    // NOTE: This test should only fail if the Default Theme changes
    it('should correctly generate default theme', () => {
        // given
        const spartaTheme = new SpartaCSS();

        // when
        const css = spartaTheme.getCSS();

        // then
        expect(css).toMatchSnapshot();
    });

    // NOTE: This test should only fail if there are new default theme behaviors added
    it('should correctly generate all defaults for a different theme', () => {
        // given
        const theme: SpartaTheme = {
            something: {
                color: 'red',
            },
        };

        const spartaTheme = new SpartaCSS(theme);

        // when
        const css = spartaTheme.getCSS();

        // then
        expect(css).toMatchSnapshot();
    });

    it('should apply styles to components without default implementation when applicable', () => {
        // given
        const theme: SpartaTheme = {
            primary: {
                Spinner: {
                    background: 'yellow',
                    hover: {
                        background: 'red',
                    },
                    focus: {
                        background: 'blue',
                    },
                    active: {
                        background: 'green',
                    },
                    disabled: {
                        background: 'purple',
                    },
                },
            },
        };

        const spartaTheme = new SpartaCSS(theme);

        // when
        const css = spartaTheme.getCSS();

        // then
        expect(css.children).toContain(
            // default behavior
            '.sparta[data-sparta="Spinner"].primary {background: yellow;}'
        );
        expect(css.children).toContain(
            // hover behavior
            '.sparta[data-sparta="Spinner"].primary:hover {background: red;}'
        );
        expect(css.children).toContain(
            // focus behavior
            '.sparta[data-sparta="Spinner"].primary:focus {background: blue;}'
        );
        expect(css.children).toContain(
            // active behavior
            '.sparta[data-sparta="Spinner"].primary:active {background: green;}'
        );
        expect(css.children).toContain(
            // disabled behavior
            '.sparta[data-sparta="Spinner"].primary:disabled {background: purple;}'
        );
    });

    it('should apply styles to document style tags', () => {
        // given
        const spartaCSS = new SpartaCSS();

        // when
        spartaCSS.applyCSS(document);
        const css = spartaCSS.getCSS().children;

        // then
        expect(document.head).toMatchSnapshot();
        expect(css).toBe(document.getElementById('sparta-css')?.innerText);
    });
});
