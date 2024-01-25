import { HTMLAttributes, FC, CSSProperties, forwardRef, ForwardedRef } from 'react';
import React, { useState, useEffect } from 'react';
import './Avatar.css';

import type * as CSS from 'csstype';
import type { Sparta } from '../../interfaces/Sparta';
import { guardSpartaName } from '../../util/ErrorHandling';

import { Text } from '../Text/Text';
import { ComponentSize } from '../../interfaces/Properties';
import { useProgressiveImage } from '../../util/imageProcessing';
import { determineForeground } from '../../util/colorTheory';

export interface IAvatar extends HTMLAttributes<HTMLDivElement>, Sparta<'Avatar'> {
    /** Used to create a string in case there is no image */
    fallback: string;
    /** Color of the fallback */
    color?: CSS.Property.Color;
    /** Background color of fallback */
    backgroundColor?: CSS.Property.BackgroundColor;
    /** Picture to be used by the Avatar */
    picture?: string;
    /** impacts style for clickability */
    clickable?: boolean;
    /** callback to be executed on click */
    onClick?: () => void;
    /** Size of component */
    size?: ComponentSize;
    /** reference */
    ref?: ForwardedRef<HTMLDivElement>;
}

/**
 * The Avatar component is a simple component that displays an image or a fallback
 * image if the image is not available.
 *
 * @return Avatar component
 */
export const Avatar: FC<IAvatar> = forwardRef(function Icon(
    {
        clickable = false,
        size = 'medium',
        theme = 'primary',
        className = '',
        onClick,
        style,
        color,
        picture,
        fallback,
        ...props
    }: IAvatar,
    ref
) {
    guardSpartaName(props, 'Avatar');
    const loaded = useProgressiveImage(picture ?? '');
    const newStyle = getAvatarStyle(!!picture && !!loaded, style, color);

    // state
    const [avatarStyle, setAvatarStyle] = useState<CSSProperties>(newStyle);

    // determines whether the avatar is clickable or not
    const isClickable = onClick || clickable ? 'clickable' : '';

    // effect
    useEffect(() => {
        setAvatarStyle(newStyle);
    }, [loaded]);

    return (
        <div
            {...props}
            ref={ref}
            className={`sparta ${className} ${isClickable} ${size} ${theme}`}
            aria-label={`${fallback} avatar`}
            style={avatarStyle}
            role={onClick || clickable ? 'button' : undefined}
            tabIndex={onClick || clickable ? 0 : undefined}
            onClick={onClick}
            onKeyDown={(event) =>
                (event.key === 'Enter' || event.key === ' ') && onClick && onClick()
            }
        >
            {picture ? <img src={picture} alt={fallback} /> : null}
            {loaded === 'loading' ? (
                <Text upper ignoreTheme>
                    {getFallbackInitials(fallback)}
                </Text>
            ) : null}
        </div>
    );
});

Avatar.defaultProps = { 'data-sparta': 'Avatar' };

/**
 * The default fallback for the Avatar component
 *
 * @param name name of the user
 * @return initials of the user
 */
const getFallbackInitials = (name: string): string => {
    const nameSplit: string[] = name.split(' ');
    const [firstName] = nameSplit;
    const lastName = nameSplit.pop();

    return `${firstName[0]}${nameSplit.length > 0 && lastName ? lastName[0] : ''}`;
};

/**
 * Gets the style and color of the Avatar component
 *
 * @param loaded boolean determining whether the avatar is loaded or not
 * @param style avatar style
 * @param color color of the avatar
 * @return style and color of the avatar
 */
const getAvatarStyle = (
    loaded: boolean,
    style?: CSSProperties,
    color?: CSS.Property.Color
): CSSProperties => {
    if (loaded) return style ?? {};

    // generate colors
    const backgroundColor = color ?? style?.backgroundColor ?? '#EDEFF1';
    const foregroundColor = determineForeground(backgroundColor);

    return {
        ...style,
        backgroundColor,
        color: foregroundColor,
    };
};
