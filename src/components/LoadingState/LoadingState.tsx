import React, { useState, useEffect, HTMLAttributes, ReactNode } from 'react';
import './LoadingState.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Determines the type of LoadingState whether Absolute or Inline*/
    type?: 'absolute' | 'inline';
    /** Determines the size of LoadingState whether small , medium, or large */
    size?: 'small' | 'medium' | 'large';
    /** Determines the size of LoadingState whether small , medium, or large */
    progress?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    /** Determines whether the LoadingState is open or not */
    open?: boolean;
    /** Toggles the LoadingState between open and closed */
    isLoading?: () => any;
    /** Starts the LoadingState Progress variant */
    move?: () => any;
}

export const LoadingState = ({
    className,
    type,
    size,
    progress = 0,
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

    const getVariant = (): string => {
        // determine custom variant
        let customVariant = 'apollo-component-library-loadingstate-component ';

        // check if its a header or not
        if (progress == 0) customVariant == customVariant;
        if (progress == 1) customVariant += 'TenPercent-progress ';
        if (progress == 2) customVariant += 'TwentyPercent-progress ';
        if (progress == 3) customVariant += 'ThirtyPercent-progress ';
        if (progress == 4) customVariant += 'FourtyPercent-progress ';
        if (progress == 5) customVariant += 'FiftyPercent-progress ';
        if (progress == 6) customVariant += 'SixtyPercent-progress ';
        if (progress == 7) customVariant += 'SeventyPercent-progress ';
        if (progress == 8) customVariant += 'EightyPercent-progress ';
        if (progress == 9) customVariant += 'NightyPercent-progress ';
        if (progress == 10) customVariant += 'HundredPercent-progress ';

        return customVariant;
    };

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
        if (progress != 0) {
            return (
                <div
                    {...props}
                    className={`${getVariant()} ${type}
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

    if (progress != 0) {
        return (
            <React.Fragment>
                {display ? (
                    <div
                        style={{ opacity: effect ? 1 : 0 }}
                        className={`${getVariant()} ${type}
                        ${move ? '' : 'progress'}`}
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
                                className={`apollo-component-library-loadingstate-component-backdrop
                                ${type}`}
                            />
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        );
    }
};
