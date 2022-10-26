import React, { FC, ReactNode } from 'react';
import { screen, render } from '@testing-library/react';

import DeepFormat from '../src/util/DeepFormat/index';
import { OverloadHandler, Overloader } from '../src';
import { Overload, RenderAll } from '../src/interfaces/Overload';
import { Button, IButton } from '../src/components/Button/Button';

/**
 * Interface for test overload component
 */
interface ITestOverload extends Overload<IButton> {
    parentProps: { test: string };
}

/**
 * Test Overload
 *
 * @return test overload component
 */
const TestOverload: FC<ITestOverload> = ({ parentProps: { test }, children, ...props }) => {
    return <button {...props}>{test}</button>;
};

/**
 * Interface for test component
 */
interface ITestComponent {
    test: string;
    children: ReactNode;
}

/**
 * Test component
 *
 * @return test component
 */
export const TestComponent: FC<ITestComponent> = ({ children, test }) => {
    /**
     * Function that simulates standard renderAll function
     *
     * @return formatted children
     */
    const renderAll: RenderAll = () => {
        // define all necessary params
        const parentProps = { test };
        const componentMap = { Button: TestOverload };

        // get deep format
        const deepFormat = new DeepFormat(children, componentMap, parentProps);

        // return formatted children
        return deepFormat.getAll();
    };

    return <div>{renderAll()}</div>;
};

interface IWrappedTarget extends Overloader {
    children: ReactNode;
}

/**
 * Wraps the target component
 *
 * @return wrapped target to be replaced
 */
export const WrappedTarget: FC<IWrappedTarget> = ({ children, apolloRef }) => {
    return (
        <OverloadHandler apolloRef={apolloRef}>
            <div>
                {children}
                <Button>Something else</Button>
            </div>
        </OverloadHandler>
    );
};

describe('DeepFormat', () => {
    it('should render all non-apollo children normally', () => {
        // given
        render(
            <TestComponent test="test">
                <div>Hello</div>
                <button>World</button>
                <span>
                    <span>This is amazing</span>
                </span>
            </TestComponent>
        );

        // when then
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('World')).toBeInTheDocument();
        expect(screen.getByText('This is amazing')).toBeInTheDocument();
    });

    it('should replace apollo components without impacting adjacent children', () => {
        // given
        render(
            <TestComponent test="test">
                <Button>Hello</Button>
                <button>World</button>
            </TestComponent>
        );

        // when then
        expect(screen.getByText('World')).toBeInTheDocument();
        expect(screen.getByText('test')).toBeInTheDocument();
        expect(screen.queryByText('Hello')).not.toBeInTheDocument();
    });

    it('should replace apollo components that are deeply nested', () => {
        // given
        render(
            <TestComponent test="test">
                <div>
                    <div>
                        <div>
                            <Button>Hello</Button>
                        </div>
                    </div>
                </div>
            </TestComponent>
        );

        // when then
        expect(screen.getByText('test')).toBeInTheDocument();
        expect(screen.queryByText('Hello')).not.toBeInTheDocument();
    });

    it('should replace apollo components that are deeply nested and have adjacent children', () => {
        // given
        render(
            <TestComponent test="test">
                <div>
                    <div>
                        <div>
                            <Button>Hello</Button>
                            <div>World</div>
                        </div>
                    </div>
                </div>
            </TestComponent>
        );

        // when then
        expect(screen.getByText('test')).toBeInTheDocument();
        expect(screen.getByText('World')).toBeInTheDocument();
        expect(screen.queryByText('Hello')).not.toBeInTheDocument();
    });

    it('should replace children with different depths without impacting adjacents', () => {
        // given
        render(
            <TestComponent test="test">
                <Button>Button 1</Button>
                <div>
                    <div>Hello</div>
                    <Button>Button 2</Button>
                    <div>
                        <div>World</div>
                        <Button>Button 3</Button>
                    </div>
                </div>
            </TestComponent>
        );

        // when then
        expect(screen.queryAllByText('test')).toHaveLength(3);
        expect(screen.getByText('World')).toBeInTheDocument();
        expect(screen.queryByText('Hello')).toBeInTheDocument();
    });

    it('should replace children that are wrapped by another component', () => {
        // given
        render(
            <TestComponent test="test">
                <WrappedTarget apollo-overload>
                    <p>This is pretty cool</p>
                </WrappedTarget>
            </TestComponent>
        );

        // when then
        expect(screen.queryAllByText('test')).toHaveLength(1);
        expect(screen.getByText('This is pretty cool')).toBeInTheDocument();
    });

    it('should replace all children indescriminately', () => {
        // given
        render(
            <TestComponent test="test">
                <WrappedTarget apollo-overload>
                    <p>This is pretty cool</p>
                </WrappedTarget>
                <Button>This is cool</Button>
            </TestComponent>
        );

        // when then
        expect(screen.queryAllByText('test')).toHaveLength(2);
        expect(screen.getByText('This is pretty cool')).toBeInTheDocument();
    });
});
