import React from 'react';
import { screen, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Image } from '../src';

describe('Image', () => {
    it('should comply to WCAG 2.O', async () => {
        // given
        const { container: loadingImage } = render(<Image alt="Test" src="" />);
        const { container: loadedImage } = render(
            <Image
                alt="Test"
                // eslint-disable-next-line max-len
                src="https://i.picsum.photos/id/878/3000/3000.jpg?hmac=xb2kVI4JW-mdX6VW3xiTIeyZZrcGHHYrEpARD1Fcly0"
            />
        );

        // when
        const results = [];
        results.push(await axe(loadingImage));
        results.push(await axe(loadedImage));

        // then
        results.forEach((result) => {
            expect(result).toHaveNoViolations();
        });
    });

    it('should render correctly', () => {
        // given
        render(
            <Image
                // eslint-disable-next-line max-len
                src="https://i.picsum.photos/id/878/3000/3000.jpg?hmac=xb2kVI4JW-mdX6VW3xiTIeyZZrcGHHYrEpARD1Fcly0"
                alt="Test"
            />
        );

        // when then
        expect(screen.getByLabelText('Test')).toBeInTheDocument();
    });

    it('renders loading image correctly', () => {
        // given
        render(<Image alt="Test" src="" />);

        // when then
        expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    });
    it('renders the image immediately when loading prop is set to eager', () => {
        // given
        render(<Image alt="Test" src="image-url" loading="eager" />);

        // when then
        expect(screen.getByAltText('Test')).toBeInTheDocument();
    });

    it('renders the image lazily when loading prop is set to lazy', () => {
        // given
        render(<Image alt="Test" src="image-url" loading="lazy" />);

        // when then
        expect(screen.queryByAltText('Test')).toBeInTheDocument();
    });
});
