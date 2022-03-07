import type { CSSProperties, FC } from 'react';
import React, { useEffect, useState } from 'react';

import FormatChildren from '../../../util/FormatChildren';

import type { Props } from '../Modal';
import Footer from '../overload/Footer';
import { Header } from '../../Header/Header';
import { Text } from '../../Text/Text';
import { Icon } from '../../Icon/Icon';

/**
 * Dialog containing the actual modal window
 *
 * @return Modal dialog element
 */
const Dialog: FC<Props> = ({
    className,
    manual,
    toggleModal,
    description,
    open,
    alert,
    label,
    id,
    children,
    ...props
}) => {
    const [formatted, setFormatted] = useState<FormatChildren | undefined>();

    useEffect(() => {
        setFormatted(getFormatted());
    }, []);

    useEffect(() => {
        /**
         * Closes modal when escape is pressed
         *
         * @param event event that occurs on keypress
         */
        const close = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                toggleModal && toggleModal();
            }
        };

        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    }, []);

    /**
     * Gets formatted chidlren
     *
     * @return formatted
     */
    const getFormatted = (): FormatChildren => {
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

        return formatted;
    };

    return (
        <div
            {...props}
            id={id}
            role={alert ? 'alertdialog' : 'dialog'}
            aria-modal="true"
            className={`apollo-component-library-modal-component ${className}`}
            aria-labelledby={`${id}-label`}
            aria-describedby={description ? `${id}-desc` : undefined}
        >
            <Text header={2} bold id={`${id}-label`} style={labelStyle}>
                {label}
                <Icon name="close" onClick={toggleModal} style={iconStyle} />
            </Text>
            {description ? <Text id={`${id}-desc`}>{description}</Text> : null}
            {formatted?.get(Header)[0]}
            <div className="apollo-component-library-modal-component-body">
                {formatted?.getOther()}
            </div>
            {formatted?.get(Footer)[0]}
        </div>
    );
};

const labelStyle: CSSProperties = {
    paddingBottom: 5,
    position: 'relative',
};

const iconStyle: CSSProperties = {
    position: 'absolute',
    right: -5,
    top: -5,
};

export default Dialog;
