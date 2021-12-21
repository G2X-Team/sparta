import React, { HTMLAttributes, ReactNode } from 'react';
import FormatChildren from '../../util/FormatChildren';
import './Card.css';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Accepts any kind of children */
    children?: ReactNode;
}

/**
 * The card will be used as a general interface to provide general structure to a UI component. The
 * structure will be as a minified page-like element header, footer, body.
 *
 * @return Card component
 */
export const Card: React.FC<Props> = ({ children, ...props }: Props): JSX.Element => {
    /**
     * Renderes all components
     *
     * @return html elements
     */
    const renderAll = (): JSX.Element => {
        // get all the children from the components
        const formatted = new FormatChildren({ children }, [Header, Footer]);

        // extract header and footer
        const headers = formatted.get(Header);
        const footers = formatted.get(Footer);

        // check to see that we have one footer and one header MAX
        if (headers.length > 1) throw new Error('Card cannot have more than one header.');
        if (footers.length > 1) throw new Error('Card cannot have more than one footer.');

        // get the header and footer
        const [header] = headers;
        const [footer] = footers;

        // return the structured content
        return (
            <div {...props} className="apollo-component-library-card-component">
                {header}
                <div className="apollo-component-library-card-component-body">
                    {formatted.getOther()}
                </div>
                {footer}
            </div>
        );
    };

    return renderAll();
};
