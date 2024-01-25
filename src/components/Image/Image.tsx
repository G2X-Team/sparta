import type { FC, HTMLAttributes } from 'react';
import React from 'react';
import './Image.css';

import type * as CSS from 'csstype';
import type { Sparta } from '../../interfaces/Sparta';
import { gaurdApolloName } from '../../util/ErrorHandling';
import { ComponentSize } from '../../interfaces/Properties';
import { useProgressiveImage } from '../../util/imageProcessing';

import { View } from '../View/View';
import { Spinner } from '../Spinner/Spinner';

export interface IImage extends HTMLAttributes<HTMLDivElement>, Sparta<'Image'> {
    /** source of image */
    src: string;
    /** alt text of image */
    alt: string;
    /** value that determines the height of image */
    height?: CSS.Property.Height;
    /** value that determines the width of image */
    width?: CSS.Property.Width;
    /** determines sizing of image */
    sizing?: CSS.Property.BackgroundSize;
    /** determines whether image is centered */
    center?: boolean;
    /** determines border radius */
    borderRadius?: CSS.Property.BorderRadius;
    /** determines size of loading spinner */
    spinnerSize?: ComponentSize;
    /** determines the loading behavior of the image */
    loading?: 'eager' | 'lazy';
}

/**
 * Image component used to display images
 *
 * @return Image component
 */
export const Image: FC<IImage> = ({
    className = '',
    borderRadius = 8,
    spinnerSize = 'medium',
    src,
    alt,
    height,
    width,
    sizing,
    center,
    children,
    ...props
}) => {
    gaurdApolloName(props, 'Image');

    // state
    const loaded = useProgressiveImage(src);

    return (
        <div
            {...props}
            className={`sparta ${className} ${
                loaded === 'loading' ? 'loading' : ''
            } ${spinnerSize}`}
            role="img"
            aria-label={alt}
            aria-busy={loaded === 'loading'}
            style={{
                backgroundImage: `url(${src})`,
                backgroundSize: sizing,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: center ? 'center' : '',
                height,
                width,
                borderRadius,
            }}
        >
            <View>{children}</View>
            <View
                aria-hidden={loaded === 'loading'}
                style={{ opacity: loaded === 'loading' ? 1 : 0 }}
            >
                <Spinner
                    loading={loaded === 'loading'}
                    innerColor="#eef1f2"
                    label={`loading ${alt} image`}
                />
            </View>
        </div>
    );
};

Image.defaultProps = { 'data-sparta': 'Image' };
