import type { HTMLAttributes, FC } from 'react';
import React, { useState, useEffect } from 'react';
import './Modal.css';

import type { Sparta } from '../../interfaces/Sparta';
import { guardSpartaName } from '../../util/ErrorHandling';

import Dialog from './components/Dialog';

export interface IModal extends HTMLAttributes<HTMLDivElement>, Sparta<'Modal'> {
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
    /** Determines whether the label is visible */
    labelInvisible?: boolean;
}

/**
 * Popup that will appear based on the value of it's open prop. Also known as dialogue.
 *
 * @return Modal component
 */
export const Modal: FC<IModal> = ({
    className = '',
    labelInvisible = false,
    manual = false,
    open = false,
    style,
    alert,
    toggleModal,
    ...props
}) => {
    guardSpartaName(props, 'Modal');

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
                    className="sparta-component-library-modal-component-container"
                >
                    <div className="sparta-component-library-modal-component-backdrop">
                        {
                            <Dialog
                                {...props}
                                labelInvisible={labelInvisible}
                                className={className}
                                open={open}
                                manual={manual}
                                toggleModal={toggleModal}
                                alert={alert}
                            />
                        }
                    </div>
                </div>
            ) : null}
        </>
    );
};

Modal.defaultProps = { 'data-sparta': 'Modal' };

/**
 * Gets modal style object
 *
 * @param effect boolean determining when to change the opacity
 * @return modal style object
 */
const getModalStyle = (effect: boolean): React.CSSProperties => {
    return { opacity: effect ? 1 : 0 };
};
