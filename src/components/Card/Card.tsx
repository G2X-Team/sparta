import type { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';
import './Card.css';

import type { Sparta } from '../../interfaces/Sparta';
import FormatChildren from '../../util/formatting/FormatChildren';
import { gaurdApolloName } from '../../util/ErrorHandling';
import type { RenderAll } from '../../interfaces/Overload';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export interface ICard extends HTMLAttributes<HTMLDivElement>, Sparta<'Card'> {
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
    const renderAll: RenderAll = () => {
        // get all the children from the components
        const formatted = new FormatChildren(children, { Header, Footer });

        // extract header and footer
        const [header, ...otherHeaders] = formatted.get('Header');
        const [footer, ...otherFooters] = formatted.get('Footer');

        // check to see that we have one footer and one header MAX
        if (otherHeaders.length > 1) throw new Error('Card cannot have more than one header.');
        if (otherFooters.length > 1) throw new Error('Card cannot have more than one footer.');

        // return the structured content
        return (
            <>
                {header}
                <div className="sparta-component-library-card-component-body">
                    {formatted.getOther()}
                </div>
                {footer}
            </>
        );
    };

    return (
        <div {...props} className={`sparta-component-library-card-component ${className}`}>
            {renderAll()}
        </div>
    );
};

Card.defaultProps = { 'data-sparta': 'Card' };
