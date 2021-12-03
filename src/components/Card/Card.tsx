import React, { HTMLAttributes, ReactNode } from 'react';
import FormattedChildren from '../../util/FormattedChildren';
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
     * Formats the header component
     * 
     * @param header unformatted header
     * @returns formatted header
     */
    const formatHeader = (header: JSX.Element): JSX.Element => {
        const { props: headerProps } = header;
        const { style: headerStyle } = headerProps;

        return (
            <Header
                {...headerProps}
                style={{
                    marginBottom: 10,
                    ...headerStyle,
                }}
            />
        )
    }

    /**
     * Formats the footer component
     * 
     * @param footer unformatted footer
     * @returns formatted footer
     */
    const formatFooter = (footer: JSX.Element): JSX.Element => {
        const { props: footerProps } = footer;
        const { style: footerStyle } = footerProps;

        return (
            <footer
                {...footerProps}
                style={{
                    marginTop: 10,
                    ...footerStyle,
                }}
            />
        )
    }
    
    /**
     * Renderes all components
     *
     * @return html elements
     */
    const renderAll = (): JSX.Element => {
        // get all the children from the components
        const formatted = new FormattedChildren(children, [Header, Footer]);

        // format header and footer
        formatted.format(Header, formatHeader);
        formatted.format(Footer, formatFooter);

        // extract header and footer
        const headers = formatted.extract(Header);
        const footers = formatted.extract(Footer);

        // check to see that we have one footer and one header MAX
        if (headers.length > 1) throw new Error('Cannot have more than one header');
        if (footers.length > 1) throw new Error('Cannot have more than one footer');

        // get the header and footer
        const [header] = headers;
        const [footer] = footers;

        // return the structured content
        return (
            <div {...props} className="apollo-component-library-card-component">
                {header}
                <div className="apollo-component-library-card-component-body">
                    {formatted.getAll()}
                </div>
                {footer}
            </div>
        );
    };

    return renderAll();
};
