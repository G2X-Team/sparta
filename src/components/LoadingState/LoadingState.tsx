import React, { useState, useEffect, HTMLAttributes, ReactNode, useRef } from 'react';
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
    // ref
    const circleRef = useRef<HTMLDivElement>(null);
    console.log({ circleRef });
    // usestate variables
    const [display, toggleDisplay] = useState(open);
    const [effect, toggleEffect] = useState(open);
    const [offset, setOffset] = useState(0);

    // make a useEffect to determine what transition will be used, acts as on init
    useEffect(() => {
        const progressOffset = (100 * progressFilled) / 100;
        setOffset(progressOffset);
    }, [setOffset, progressFilled, offset]);

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
     * @return formatted LoadingState component
     */
    const renderLoadingState = (): ReactNode => {
        return (
            <>
                {display ? (
                    variant != 'static' ? (
                        <div className={`apollo-component-library-container`}>
                            <div
                                {...props}
                                ref={circleRef}
                                className={`apollo-component-library-loadingstate-component-progressbar
                                ${type}
                                ${move ? '' : 'progress'}`}
                                style={{ width: `${offset * progressFilled}%` }}
                            ></div>
                        </div>
                    ) : (
                        <div
                            {...props}
                            className={`apollo-component-library-loadingstate-component
                            ${type} ${size}
                    `}
                        ></div>
                    )
                ) : null}
            </>
        );
    };
    return (
        <>
            {display ? (
                variant != 'static' ? (
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
                                    style={{ width: `${offset * progressFilled}%` }}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={isLoading}
                        className={`
                                    apollo-component-library-loadingstate-component-backdrop
                                ${type}`}
                    >
                        {renderLoadingState()}
                    </div>
                )
            ) : null}
        </>
    );
};
