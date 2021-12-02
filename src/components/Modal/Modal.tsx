import React, { useState, useEffect, HTMLAttributes, ReactNode } from 'react';
import {
    findAll,
    FoundChildren,
    FoundChild,
    getComponents,
} from '../../util/findAll';
import './Modal.css';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Button } from '../Button/Button';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Determines whether the modal is open or not */
    open?: boolean;
    /** Toggles the model between open and closed */
    toggleModal?: () => any;
    /**
     * By default the modal closes on button click when clicked in the footer button group.
     * By adding this prop, the default behavior is nullified
     */
    manual?: boolean;
}

/**
 * Popup that will appear based on the value of it's open prop. Also known as dialogue.
 */
export const Modal = ({
    className,
    manual = false,
    children,
    style,
    open = false,
    toggleModal,
    ...props
}: Props) => {
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
     */
    const renderModal = (): ReactNode => {
        // find all specified components
        const components: FoundChildren = findAll(children, [Header, Footer]);
        const Headers: FoundChild[] = components.Header;
        const Footers: FoundChild[] = components.Footer;

        // check that the appropriate amount of headers is found
        if (Headers.length > 1)
            throw new Error('Modal can only have 1 Header component');
        if (Footers.length > 1)
            throw new Error('Modal can only have 1 Footer component');

        // if Header or Footer is found make sure to store them
        const header: ReactNode =
            Headers.length > 0 ? (
                <Header
                    {...components.Header[0].component.props}
                    style={{
                        marginBottom: 10,
                        ...components.Header[0].component.props.style,
                    }}
                />
            ) : null;

        const footer: ReactNode =
            Footers.length > 0 ? formatFooter(Footers[0]) : null;
        const others: ReactNode[] = components.other.map(
            (child: FoundChild) => child.component
        );

        return (
            <div
                {...props}
                className={`apollo-component-library-modal-component ${className}`}
            >
                {header}
                <div className="apollo-component-library-modal-component-body">
                    {others}
                </div>
                {footer}
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
    const formatFooter = (footer: FoundChild): ReactNode => {
        // abstract the footer
        const component: JSX.Element = footer.component;

        // find button groups in the footer props
        const footerComponents: FoundChildren = findAll(
            component.props.children,
            [ButtonGroup]
        );
        const ButtonGroups: FoundChild[] = footerComponents.ButtonGroup;

        // check that there is no more than one button group
        if (ButtonGroups.length > 1)
            throw new Error(
                'The Footer of the Modal can only have 1 ButtonGroup component'
            );
        const buttonGroup: ReactNode =
            ButtonGroups.length > 0 ? formatButtonGroup(ButtonGroups[0]) : null;

        // clean the button group components from the previous found children
        footerComponents.ButtonGroup = [];

        // get the rest of the children
        const other: ReactNode[] = getComponents(footerComponents);

        return (
            <Footer style={{ position: 'relative', ...component.props.style }}>
                {other}
                {buttonGroup}
            </Footer>
        );
    };

    /**
     * Formats the ButtonGroup to meet the modal standards
     *
     * @param buttonGroup button group FoundChild
     * @return Formatted ButtonGroup
     */
    const formatButtonGroup = (buttonGroup: FoundChild): ReactNode => {
        // abstract the button group comopnent
        const component: JSX.Element = buttonGroup.component;

        // find the buttons in the button group
        const buttonGroupComponents: FoundChildren = findAll(
            component.props.children,
            [Button]
        );
        const Buttons: FoundChild[] = buttonGroupComponents.Button;

        // change buttons to new format
        const buttons: ReactNode[] = Buttons.map((button: FoundChild) => {
            // retrieve the onClick method from props and extract the rest
            const { onClick, ...buttonProps } = button.component.props;

            /**
             * Will toggle the modal to close after executing original on click call back
             * if manual prop is set to false
             */
            const onButtonClick = () => {
                onClick && onClick();
                !manual && toggleModal && toggleModal();
            };

            return (
                <button
                    key={Math.random()}
                    {...buttonProps}
                    onClick={onButtonClick}
                    className={`apollo-component-library-modal-component-button-group-button ${buttonProps.variant}`}
                />
            );
        });

        return (
            <div className="apollo-component-library-modal-component-button-group">
                {buttons}
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
