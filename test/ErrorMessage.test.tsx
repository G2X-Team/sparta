import React from 'react';
import { screen, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { ErrorMessage, Card, Text, Divider, Button } from '../src';

describe('ErrorMessage', () => {
    it('should comply with WCAG 2.0', async () => {
        // given
        const { container: hiddenErrorMessage } = render(
            <ErrorMessage id="error">Message</ErrorMessage>
        );
        const { container: visibleErrorMessage } = render(
            <ErrorMessage id="error" active>
                Message
            </ErrorMessage>
        );
        const { container: hiddenErrorMessageUse } = render(
            <Card>
                <Text header={3}>Something will happen if you click the button!</Text>
                <Divider />
                <Text>Click it</Text>
                <br />
                <Button aria-errorMessage="click-error">Click me :)</Button>
                <ErrorMessage id="click-error">Nothing Happened :/</ErrorMessage>
            </Card>
        );
        const { container: visibleErrorMessageUse } = render(
            <Card>
                <Text header={3}>Something will happen if you click the button!</Text>
                <Divider />
                <Text>Click it</Text>
                <br />
                <Button aria-errorMessage="click-error">Click me :)</Button>
                <ErrorMessage id="click-error" active>
                    Nothing Happened :/
                </ErrorMessage>
            </Card>
        );

        // when
        const results = [];
        results.push(await axe(hiddenErrorMessage));
        results.push(await axe(visibleErrorMessage));
        results.push(await axe(hiddenErrorMessageUse));
        results.push(await axe(visibleErrorMessageUse));

        // then
        results.forEach((result: any) => {
            expect(result).toHaveNoViolations();
        });
    });

    it('should render when active', () => {
        // given
        render(
            <ErrorMessage id="error" active>
                Not hidden
            </ErrorMessage>
        );

        // when then
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should render correctly', () => {
        // given
        render(
            <ErrorMessage id="error" active>
                Not hidden
            </ErrorMessage>
        );

        // when then
        expect(screen.getByText(/not hidden/i)).toBeInTheDocument();
    });

    it('should not render when inactive', () => {
        // given
        render(<ErrorMessage id="error">Not hidden</ErrorMessage>);

        // when then
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
});
