import React, { useState, useEffect, ReactNode } from 'react';
import type { HTMLAttributes } from 'react';
import type { FC } from 'react';
import FormatChildren from '../../util/FormatChildren';
import './Modal.css';

import { Header } from '../Header/Header';
import Footer from './overload/Footer';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Determines whether the modal is open or not */
    open?: boolean;
    /** Toggles the model between open and closed */
    toggleModal?: () => void;
    /**
     * By default the modal closes on button click when clicked in the footer button group.
     * By adding this prop, the default behavior is nullified
     */
    manual?: boolean;
}

/**
 * Popup that will appear based on the value of it's open prop. Also known as dialogue.
 *
 * @return Modal component
 */
export const Modal: FC<Props> = ({
    className = '',
    manual = false,
    children,
    style,
    open = false,
    toggleModal,
    ...props
}: Props): JSX.Element => {
    // state variables
    const [display, toggleDisplay] = useState(open);
    const [effect, toggleEffect] = useState(open);

    // effect hook that keeps track of open
    useEffect(() => {
        if (open !== display) {
            if (display) {
                toggleEffect(false);
                setTimeout(() => toggleDisplay(false), 300);
            } else {
                toggleDisplay(true);
                setTimeout(() => toggleEffect(true), 100);
            }
        }
    }, [open]);

    /**
     * Renders the modal and all of its children formatted as intended
     *
     * @return formatted modal component
     */
    const renderModal = (): ReactNode => {
        const parentProps = { children, manual, toggleModal, open };

        // find all specified components
        const formatted = new FormatChildren(parentProps, {
            Header,
            Footer,
        });

        // extract header and footer components
        const headers = formatted.get(Header);
        const footers = formatted.get(Footer);

        // check that the appropriate amount of headers is found
        if (headers.length > 1) throw new Error('Modal can only have 1 Header component');
        if (footers.length > 1) throw new Error('Modal can only have 1 Footer component');

        // get the header and footer
        const [header] = headers;
        const [footer] = footers;

        return (
            <div {...props} className={`apollo-component-library-modal-component ${className}`}>
                {header}
                <div className="apollo-component-library-modal-component-body">
                    {formatted.getOther()}
                </div>
                {footer}
            </div>
        );
    };

    return (
        <>
            {display ? (
                <div
                    style={getModalStyle(effect)}
                    className="apollo-component-library-modal-component-container"
                >
                    <div>
                        {renderModal()}
                        <div
                            onClick={toggleModal}
                            className="apollo-component-library-modal-component-backdrop"
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
};

/**
 * Gets modal style object
 *
 * @param effect boolean determining when to change the opacity
 * @return modal style object
 */
const getModalStyle = (effect: boolean): React.CSSProperties => {
    return { opacity: effect ? 1 : 0 };
};
