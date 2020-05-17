import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider as MonetizeProvider } from '../MonetizeContext';
import useStatus from '../useStatus';

interface ProviderProps {
    children?: React.ReactNode;
    paymentPointer: string;
}

const TestComponent = () => {
    const { state, events } = useStatus();
    return (
        <>
            <span data-testid="state">{state}</span>
            <span data-testid="events">{JSON.stringify(events)}</span>
        </>
    );
};

describe('Test useStatus hook', () => {
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
        const state = screen.getByTestId('state');
        const events = screen.getByTestId('events');
        expect(state).toHaveTextContent('');
        expect(events).toHaveTextContent('[]');
    });
});
