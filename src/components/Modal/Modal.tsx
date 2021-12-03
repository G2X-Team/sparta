import React, { useState, useEffect, HTMLAttributes, ReactNode } from 'react';
import FormattedChildren from '../../util/FormattedChildren';
import './Modal.css';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Button } from '../Button/Button';

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
export const Modal: React.FC<Props> = ({
    className,
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
     * Formats the header component
     *
     * @param header unformatted header
     * @return formatted header
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
        );
    };

    /**
     * Formats button components
     *
     * @param button unformatted button
     * @return formatted button
     */
    const formatButton = (button: JSX.Element): JSX.Element => {
        // retrieve the onClick method from props and extract the rest
        const { props: buttonProps } = button;
        const { onClick: buttonOnClick, variant: buttonVariant } = buttonProps;

        /**
         * Will toggle the modal to close after executing original on click call back
         * if manual prop is set to false
         */
        const onClick = (): void => {
            buttonOnClick && buttonOnClick();
            !manual && toggleModal && toggleModal();
        };

        return (
            <button
                key={Math.random()}
                {...buttonProps}
                onClick={onClick}
                className={`apollo-component-library-modal-component-button-group-button 
                    ${buttonVariant}`}
            />
        );
    };

    /**
     * Formats the ButtonGroup to meet the modal standards
     *
     * @param buttonGroup button group FoundChild
     * @return Formatted ButtonGroup
     */
    const formatButtonGroup = (buttonGroup: JSX.Element): JSX.Element => {
        // abstract the button group comopnent
        const { props: buttonGroupProps } = buttonGroup;
        const { children: buttonGroupChildren } = buttonGroupProps;

        // find the buttons in the button group
        const formattedButtonGroup = new FormattedChildren(buttonGroupChildren, [Button]);

        // check that there are only buttons in the button group
        if (formattedButtonGroup.getOther().length > 0)
            throw new Error('Only buttons are allowed in button groups');

        // format buttons in button group
        formattedButtonGroup.format(Button, formatButton);

        return (
            <div className="apollo-component-library-modal-component-button-group">
                {formattedButtonGroup.getAll()}
            </div>
        );
    };

    /**
     * Formats the footer in case there is a button group in it that needs to be
     * styled specifically
     *
     * @param footer footer FoundChild
     * @return Formatted Footer
     */
    const formatFooter = (footer: JSX.Element): JSX.Element => {
        // abstract the footer
        const { props } = footer;
        const { children: footerChildren, style: footerStyle } = props;

        // find button groups
        const formattedFooter = new FormattedChildren(footerChildren, [ButtonGroup]);

        // format and extract button groups
        formattedFooter.format(ButtonGroup, formatButtonGroup);
        const buttonGroups = formattedFooter.extract(ButtonGroup);

        // check that there is no more than one button group
        if (buttonGroups.length > 1)
            throw new Error('The Footer of the Modal can only have 1 ButtonGroup component');

        // get the button group
        const [buttonGroup] = buttonGroups;

        return (
            <Footer style={{ position: 'relative', ...footerStyle }}>
                {formattedFooter.getAll()}
                {buttonGroup}
            </Footer>
        );
    };

    /**
     * Renders the modal and all of its children formatted as intended
     *
     * @return formatted modal component
     */
    const renderModal = (): ReactNode => {
        // find all specified components
        const formatted = new FormattedChildren(children, [Header, Footer]);

        // format header and footer
        formatted.format(Header, formatHeader);
        formatted.format(Footer, formatFooter);

        // extract header and footer components
        const headers = formatted.extract(Header);
        const footers = formatted.extract(Footer);

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
        <React.Fragment>
            {display ? (
                <div
                    style={{ opacity: effect ? 1 : 0 }}
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
        </React.Fragment>
    );
};
