import type { HTMLAttributes, FC } from 'react';
import React, { useState, useEffect, ReactNode, useRef, CSSProperties } from 'react';
import './LoadingState.css';

import type { Sparta } from '../../interfaces/Sparta';
import { gaurdApolloName } from '../../util/ErrorHandling';

import { Text } from '../Text/Text';

export interface ILoadingState extends HTMLAttributes<HTMLDivElement>, Sparta<'LoadingState'> {
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
    /** Required aia-label for WCAG 2.0 authentication purposes */
    label: string;
}

/**
 * Loader that will appear based on the value of it's open prop. Also known as dialogue.
 *
 * @return LoadingState component
 */
export const LoadingState: FC<ILoadingState> = ({
    progress = 0,
    type = 'spinner',
    size = 'small',
    loading = false,
    className,
    children = undefined,
    style,
    label,
    ...props
}) => {
    gaurdApolloName(props, 'LoadingState');

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

            // assign names & labels
            if (label) ariaProps['aria-labelledby'] = label;
        } else {
            ariaProps['aria-busy'] = loading ? 'true' : 'false';
            ariaProps['aria-labelledby'] = 'apollo-loading-state-description-text';
        }

        return (
            <div {...ariaProps} className={containerName} aria-label={label} ref={progressRef}>
                {type === 'spinner' ? (
                    <Text inline id="apollo-loading-state-description-text">
                        {label}
                    </Text>
                ) : null}
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
                <div
                    className="apollo-component-library-loadingstate-component-container"
                    tabIndex={0}
                >
                    {renderLoadingState()}
                </div>
            ) : null}
        </>
    );
};

LoadingState.defaultProps = { 'data-apollo': 'LoadingState' };
