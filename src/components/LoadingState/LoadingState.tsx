import React, { useState, useEffect, ReactNode, useRef, CSSProperties } from 'react';
import type { HTMLAttributes } from 'react';
import type { FC } from 'react';
import './LoadingState.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Determines status of the progressbar where
     * progressFilled={0.1} => 10% filled progressbar
     */
    progress?: number;
    /** Determines the size of LoadingState whether small , medium, or large */
    size?: 'small' | 'medium' | 'large';
    /** Determines the variant of LoadingState whether spinner or progress */
    type?: 'spinner' | 'progress';
    /** Determines whether the LoadingState is open or not */
    loading?: boolean;
}

/**
 * Loader that will appear based on the value of it's open prop. Also known as dialogue.
 *
 * @return LoadingState component
 */
export const LoadingState: FC<Props> = ({
    progress = 0,
    type = 'spinner',
    size = 'small',
    loading = false,
    className,
    children = undefined,
    style,
    ...props
}: Props): JSX.Element => {
    // ref
    const progressRef = useRef<HTMLHeadingElement>(null);

    // state variables
    const [width, setwidth] = useState(0);

    useEffect(() => {
        if (progressRef.current !== null) {
            setwidth(progressRef.current?.offsetWidth);
        }
    });

    useEffect(() => {
        if (progress > 1 || progress < 0) {
            throw Error('The range is not valid. Must be number from 0 to 1');
        }
    }, [progress]);

    /**
     * Renders the LoadingState and all of its children formatted as intended
     *
     * @return formatted LoadingState component
     */
    const renderLoadingState = (): ReactNode => {
        const containerName =
            type === 'spinner'
                ? 'apollo-component-library-loadingstate-component-spinner'
                : 'apollo-component-library-container';

        const loadingType =
            type === 'spinner'
                ? 'apollo-component-library-loadingstate-component'
                : 'apollo-component-library-loadingstate-component-progressbar';

        const loadingStyle: CSSProperties = {};

        // give appropriate aria-props
        const ariaProps: { [key: string]: string } = {};
        if (type === 'progress') {
            // assign width
            loadingStyle.width = width * progress;

            // assign aria props
            ariaProps.role = 'progressbar';
            ariaProps['aria-valuenow'] = `${progress * 100}`;
            ariaProps['aria-valuemax'] = '100';
            ariaProps['aria-valuemin'] = '0';
            ariaProps['aria-valuetext'] = 'Loading Process';
        } else {
            ariaProps['aria-busy'] = loading ? 'true' : 'false';
        }

        return (
            <div {...ariaProps} className={containerName} ref={progressRef}>
                <div
                    {...props}
                    style={loadingStyle}
                    className={`
                        ${loadingType}
                        ${size}
                    `}
                />
            </div>
        );
    };

    return (
        <>
            {loading ? (
                <div className="apollo-component-library-loadingstate-component-container">
                    {renderLoadingState()}
                </div>
            ) : null}
        </>
    );
};
