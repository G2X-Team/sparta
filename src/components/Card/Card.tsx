import React, { HTMLAttributes, ReactNode } from 'react';
import { findAll, FoundChildren, FoundChild } from '../../util/findAll';
import './Card.css';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Accepts any kind of children */
    children?: ReactNode
}

/**
 * The card will be used as a general interface to provide general structure to a UI component. The 
 * structure will be as a minified page-like element header, footer, body.
 */
export const Card = ({children, ...props}: Props) => {
    /**
     * Renderes all components
     * 
     * @return html elements 
     */
    const renderAll = () => {
        // get all the children from the components
        const components: FoundChildren = findAll(children, [Header, Footer]);

        // check to see that we have one footer and one header MAX
        if (components.Header.length > 1) throw "Cannot have more than one header";
        if (components.Footer.length > 1) throw "Cannot have more than one footer";

        // get the header/footer if it exists and assign it into a variable
        const header: ReactNode = 
            components.Header.length > 0 ? (
                <Header 
                    {...components.Header[0].component.props} 
                    style={{marginBottom: 10, ...components.Header[0].component.props.style}}
                />
            ) : null;
        const footer: ReactNode = 
            components.Footer.length > 0 ? (
                <Footer 
                    {...components.Footer[0].component.props} 
                    style={{marginTop: 10, ...components.Footer[0].component.props.style}}
                />
            ) : null;

        // get other components
        const otherComponents: ReactNode[] = components.other.map((child: FoundChild) => child.component);

        // return the structured content
        return (
            <div {...props} className="apollo-component-library-card-component">
                { header }
                <div className="apollo-component-library-card-component-body">
                    { otherComponents }
                </div>
                { footer }
            </div>
        )
    }

    return renderAll();
}