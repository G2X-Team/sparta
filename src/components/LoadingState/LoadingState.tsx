import React, { useState, useEffect, HTMLAttributes, ReactNode } from 'react';
import './LoadingState.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Determines status of the progressbar where
     * progressFilled={0.1} => 10% filled progressbar
     */
    progressFilled?: number;
    /** Determines the type of LoadingState whether Absolute or Inline*/
    type?: 'absolute' | 'inline';
    /** Determines the size of LoadingState whether small , medium, or large */
    size?: 'small' | 'medium' | 'large';
    /** Determines the variant of LoadingState whether static or progress */
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
    progressFilled = 0,
    className,
    type = 'absolute',
    size = 'medium',
    variant = 'static',
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
     * Renders the LoadingState and all of its children formatted as intended
     *
     * @return formatted LoadingState component
     */
    const getVariant = (): string => {
        // determine custom variant
        let customVariant = '';
        // check how much a progressbar is filled where 0 is 0% and 1 is 100%
        if (progressFilled == 0) customVariant += 'zero-progressFilled ';
        if (progressFilled == 0.1) customVariant += 'ten-progressFilled ';
        if (progressFilled == 0.2) customVariant += 'twenty-progressFilled ';
        if (progressFilled == 0.3) customVariant += 'thirty-progressFilled ';
        if (progressFilled == 0.4) customVariant += 'fourty-progressFilled ';
        if (progressFilled == 0.5) customVariant += 'fifty-progressFilled ';
        if (progressFilled == 0.6) customVariant += 'sixty-progressFilled ';
        if (progressFilled == 0.7) customVariant += 'seventy-progressFilled ';
        if (progressFilled == 0.8) customVariant += 'eighty-progressFilled ';
        if (progressFilled == 0.9) customVariant += 'ninty-progressFilled ';
        if (progressFilled == 1) customVariant += 'filled-progressFilled ';
        return customVariant;
    };
    /**
     * Renders the LoadingState and all of its children formatted as intended
     * @return formatted LoadingState component
     */
    const renderLoadingState = (): ReactNode => {
        if (variant == 'progress') {
            return (
                <div
                    {...props}
                    className={`apollo-component-library-loadingstate-component-progressbar
                    ${type}
                    ${getVariant()}
                    ${move ? '' : 'progress'}`}
                ></div>
            );
        } else {
            return (
                <div
                    {...props}
                    className={`apollo-component-library-loadingstate-component ${type} ${size}
                    ${getVariant()}`}
                ></div>
            );
        }
    };
    return (
        <>
            {display ? (
                {variant == 'progress'}
                    <div
                        style={{ opacity: effect ? 1 : 0 }}
                        className="apollo-component-library-loadingstate-component-container"
                    >
                        <div>
                            {renderLoadingState()}
                            {variant == 'progress' ? (
                                <div onClick={move} />
                            ) : (
                                <div
                                    onClick={isLoading}
                                    className={`
                                apollo-component-library-loadingstate-component-backdrop
                            ${type}`}
                                />
                            )}
                        </div>
                    </div>
                )
            ) : (
                <span style={{ display: 'inline-block' }}>{renderLoadingState()}</span>
            )}
        </>
    );
};
