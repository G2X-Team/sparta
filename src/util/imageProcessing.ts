import { useEffect, useState } from 'react';

/**
 * Determines when image is loaded
 *
 * @param src Image to check
 * @return True if image is loaded
 */
export const useProgressiveImage = (src: string): string => {
    const [sourceLoaded, setSourceLoaded] = useState('loading');

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setSourceLoaded(src);
    }, [src]);

    return sourceLoaded;
};
