import type { HTMLAttributes, FC } from 'react';
import React, { useState, useEffect } from 'react';
import './Modal.css';

import Dialog from './components/Dialog';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Required ID for WCAG 2.0 compliance purposes */
    id: string;
    /** Requires descriptive label for WCAG 2.0 compliance purposes */
    label: string;
    /** Recommended description of modal */
    description?: string | JSX.Element;
    /** Determines whether it is an alert modal or a standard modal */
    alert?: boolean;
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
    open = false,
    style,
    toggleModal,
    ...props
}) => {
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

    return (
        <>
            {display ? (
                <div
                    style={getModalStyle(effect)}
                    className="apollo-component-library-modal-component-container"
                >
                    <div className="apollo-component-library-modal-component-backdrop">
                        {
                            <Dialog
                                {...props}
                                className={className}
                                open={open}
                                manual={manual}
                                toggleModal={toggleModal}
                            />
                        }
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
