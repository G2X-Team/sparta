import type { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';
import './Card.css';

import type { Apollo } from '../../interfaces/Apollo';
import FormatChildren from '../../util/FormatChildren';
import { gaurdApolloName } from '../../util/ErrorHandling';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export interface ICard extends HTMLAttributes<HTMLDivElement>, Apollo<'Card'> {
    /** Accepts any kind of children */
    children?: ReactNode;
}

/**
 * The card will be used as a general interface to provide general structure to a UI component. The
 * structure will be as a minified page-like element header, footer, body.
 *
 * @return Card component
 */
export const Card: FC<ICard> = ({ children, className, ...props }) => {
    gaurdApolloName(props, 'Card');

    /**
     * Renderes all components
     *
     * @return html elements
     */
    const renderAll = (): JSX.Element => {
        // get all the children from the components
        const formatted = new FormatChildren({ children }, { Header, Footer });

        // extract header and footer
        const headers = formatted.get('Header');
        const footers = formatted.get('Footer');

        // check to see that we have one footer and one header MAX
        if (headers.length > 1) throw new Error('Card cannot have more than one header.');
        if (footers.length > 1) throw new Error('Card cannot have more than one footer.');

        // get the header and footer
        const [header] = headers;
        const [footer] = footers;

        // return the structured content
        return (
            <>
                {header}
                <div className="apollo-component-library-card-component-body">
                    {formatted.getOther()}
                </div>
                {footer}
            </>
        );
    };

    return (
        <div {...props} className={`apollo-component-library-card-component ${className}`}>
            {renderAll()}
        </div>
    );
};

Card.defaultProps = { 'data-apollo': 'Card' };
