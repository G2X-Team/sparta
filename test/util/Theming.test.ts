import { ApolloCSS, ApolloTheme } from '../../src';

describe('ApolloCSS', () => {
    it('should return expected object when getCSS is called', () => {
        // given
        const apolloTheme = new ApolloCSS();
        const expected = {
            id: 'apollo-css',
            children: expect.anything(),
        };

        // when
        const css = apolloTheme.getCSS();

        // then
        expect(css).toMatchObject(expected);
    });

    // NOTE: This test should only fail if the Default Theme changes
    it('should correctly generate default theme', () => {
        // given
        const apolloTheme = new ApolloCSS();

        // when
        const css = apolloTheme.getCSS();

        // then
        expect(css).toMatchSnapshot();
    });

    // NOTE: This test should only fail if there are new default theme behaviors added
    it('should correctly generate all defaults for a different theme', () => {
        // given
        const theme: ApolloTheme = {
            something: {
                color: 'red',
            },
        };

        const apolloTheme = new ApolloCSS(theme);

        // when
        const css = apolloTheme.getCSS();

        // then
        expect(css).toMatchSnapshot();
    });

    it('should apply styles to components without default implementation when applicable', () => {
        // given
        const theme: ApolloTheme = {
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

        const apolloTheme = new ApolloCSS(theme);

        // when
        const css = apolloTheme.getCSS();

        // then
        expect(css.children).toContain(
            // default behavior
            '.apollo[data-apollo="Spinner"].primary {background: yellow;}'
        );
        expect(css.children).toContain(
            // hover behavior
            '.apollo[data-apollo="Spinner"].primary:hover {background: red;}'
        );
        expect(css.children).toContain(
            // focus behavior
            '.apollo[data-apollo="Spinner"].primary:focus {background: blue;}'
        );
        expect(css.children).toContain(
            // active behavior
            '.apollo[data-apollo="Spinner"].primary:active {background: green;}'
        );
        expect(css.children).toContain(
            // disabled behavior
            '.apollo[data-apollo="Spinner"].primary:disabled {background: purple;}'
        );
    });

    it('should apply styles to document style tags', () => {
        // given
        const apolloCSS = new ApolloCSS();

        // when
        apolloCSS.applyCSS(document);
        const css = apolloCSS.getCSS().children;

        // then
        expect(document.head).toMatchSnapshot();
        expect(css).toBe(document.getElementById('apollo-css')?.innerText);
    });
});
