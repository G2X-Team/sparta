import React, { useState, useEffect, HTMLAttributes, ReactNode } from 'react';
import './LoadingState.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Determines the type of LoadingState whether Absolute or Inline*/
    type?: 'absolute' | 'inline';
    /** Determines the size of LoadingState whether small , medium, or large */
    size?: 'small' | 'medium' | 'large';
    /** Determines the size of LoadingState whether small , medium, or large */
    variant?: 'static' | 'progress';
    /** Determines whether the LoadingState is open or not */
    open?: boolean;
    /** Toggles the LoadingState between open and closed */
    isLoading?: () => any;
    /** Starts the LoadingState Progress variant */
    move?: () => any;
}

/**
 * Loader that will appear based on the value of it's open prop. Also known as dialogue.
 *
 * @return LoadingState component
 */
export const LoadingState = ({
    className,
    type,
    size,
    variant,
    children,
    style,
    open = false,
    isLoading,
    move,
    ...props
}: Props): JSX.Element => {
    // usestate variables
    const [display, toggleDisplay] = useState(open);
    const [effect, toggleEffect] = useState(open);

    // Keeping track of open call
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

    /**
     * Renders the LoadingState and all of its children formatted as intended
     * @return formatted modal component
     */
    const renderLoadingState = (): ReactNode => {
        if (variant == 'progress') {
            return (
                <div
                    {...props}
                    className={`apollo-component-library-loadingstate-component-progressbar ${type}
                    ${move ? '' : 'progress'}`}
                ></div>
            );
        } else {
            return (
                <div
                    {...props}
                    className={`apollo-component-library-loadingstate-component ${type} ${size}`}
                ></div>
            );
        }
    };

    if (variant == 'progress') {
        return (
            <React.Fragment>
                {display ? (
                    <div
                        style={{ opacity: effect ? 1 : 0 }}
                        className="apollo-component-library-loadingstate-component-container"
                    >
                        <div>
                            {renderLoadingState()}
                            <div onClick={move} />
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        );
    } else {
        if (type == 'inline') {
            return (
                <React.Fragment>
                    {display ? (
                        <span style={{ display: 'inline-block' }}>{renderLoadingState()}</span>
                    ) : null}
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    {display ? (
                        <div
                            style={{ opacity: effect ? 1 : 0 }}
                            className="apollo-component-library-loadingstate-component-container"
                        >
                            <div>
                                {renderLoadingState()}
                                <div
                                    onClick={isLoading}
                                    className={`
                                    apollo-component-library-loadingstate-component-backdrop
                                ${type}`}
                                />
                            </div>
                        </div>
                    ) : null}
                </React.Fragment>
            );
        }
    }
};
