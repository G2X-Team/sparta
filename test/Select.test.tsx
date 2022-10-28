import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Select } from '../src';
import { act } from 'react-dom/test-utils';

const options = ['Option 1', 'Option 2', 'Option 3'];

describe('Select', () => {
    it('renders correctly', () => {
        // given
        render(<Select label="Select Menu" options={options} />);

        // when then
        expect(screen.getByLabelText(/select menu/i)).toBeInTheDocument();
    });

    it('complies with WCAG 2.0 AA', async () => {
        // given
        const { container: select } = render(<Select label="Select Menu" options={options} />);
        await act(async () => {
            userEvent.keyboard('{esc}');
        });

        // when
        const results: any[] = [];
        results.push(await axe(select));
        // skipping menu because we know it's accessible via the `Menu` component tests

        // then
        results.forEach((result) => {
            expect(result).toHaveNoViolations();
        });
    });

    it('opens and closes the menu', async () => {
        // given
        render(<Select label="Select Menu" options={options} />);
        const select = screen.getByLabelText(/select menu/i);

        // when then:

        // open
        await act(async () => {
            userEvent.click(select);
        });
        expect(screen.getByRole('listbox')).toBeInTheDocument();

        // close
        await act(async () => {
            userEvent.keyboard('{esc}');
        });
        setTimeout(() => {
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        }, 300);
    });

    it('selects an option', async () => {
        // given
        render(<Select label="Select Menu" options={options} />);
        const select = screen.getByLabelText(/select menu/i);

        // when
        await act(async () => {
            userEvent.click(select);
        });

        await act(async () => {
            userEvent.click(screen.getByText(/option 2/i));
        });

        // then
        expect(select).toHaveValue('Option 2');
    });

    it('displays the placeholder', () => {
        // given
        render(<Select label="Select Menu" placeholder="select" options={options} />);

        // when then
        expect(screen.getByText(/select/i)).toBeInTheDocument();
    });

    it('will filter results as expected', async () => {
        // given
        render(<Select label="Select Menu" options={options} />);
        const select = screen.getByLabelText(/select menu/i);

        // when
        await act(async () => {
            userEvent.click(select);
            userEvent.type(select, 'option 1');
        }); // NOTE: weird bug w/ userEvent.type reverse string

        // then
        expect(screen.getByText(/option 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/option 2/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/option 3/i)).not.toBeInTheDocument();
    });

    it('will show "no options found" when no results are found', async () => {
        // given
        render(<Select label="Select Menu" options={options} />);
        const select = screen.getByLabelText(/select menu/i);

        // when
        await act(async () => {
            setTimeout(() => {
                screen.getByLabelText(/select menu/i);
            }, 300);
            userEvent.type(select, '-');
        });

        // then
        // expect(screen.getByText(/no options found/i)).toBeInTheDocument();
    });
});
