import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider as MonetizeProvider } from '../MonetizeContext';
import useContent from '../useContent';

interface ProviderProps {
    children?: React.ReactNode;
    paymentPointer: string;
}

const TestComponent = () => {
    const { isLoading, isMonetized } = useContent();
    return (
        <>
            <span data-testid="isLoading">{JSON.stringify(isLoading)}</span>
            <span data-testid="isMonetized">{JSON.stringify(isMonetized)}</span>
        </>
    );
};

describe('Test useContent hook', () => {
    let props: ProviderProps;

    beforeEach(() => {
        props = {
            paymentPointer: 'myPaymentPointer',
        };
    });

    render(
        <MonetizeProvider {...props}>
            <TestComponent />
        </MonetizeProvider>,
    );

    test('passes the appropiate data', () => {
        const isLoading = screen.getByTestId('isLoading');
        const isMonetized = screen.getByTestId('isMonetized');
        expect(isLoading).toHaveTextContent('true');
        expect(isMonetized).toHaveTextContent('false');
    });
});
