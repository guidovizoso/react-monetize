import * as React from 'react';

import { ContextType, StateType } from '../types';
import reducers from './reducers';
import { addListenerToElement, removeListenerFromElement } from '../utils/events';

interface ProviderProps {
    children?: React.ReactNode;
    paymentPointer: string;
}

const initialState: StateType = {
    isMonetized: false,
    isLoading: true,
    state: undefined as any,
    events: [],
};

const Context = React.createContext<ContextType>({
    state: initialState,
    dispatch: () => {},
});

const addPaymentPointerToHead = (paymentPointer) => {
    const pointer = document.createElement('link');

    const isWebMonetizationSupported = pointer.relList.supports('monetization');

    if (typeof document !== 'undefined' && isWebMonetizationSupported) {
        pointer.rel = 'monetization';
        pointer.href = paymentPointer;
        document.head.appendChild(pointer);
        return pointer;
    }

    return null;
};

const Provider: React.FC = ({ children, paymentPointer }: ProviderProps) => {
    const [state, dispatch] = React.useReducer(reducers, initialState);

    React.useEffect(() => {
        const loadHandler = () => {
            const linkElement = addPaymentPointerToHead(paymentPointer);
            if (!linkElement) {
                dispatch({ type: 'INITIAL_NOT_DETECTED' });
                return;
            }
            const handler = (event) => dispatch({ type: 'MONETIZATION', payload: { state: event } });

            addListenerToElement(linkElement, {
                name: 'monetization',
                handler,
            });

            dispatch({ type: 'INITIAL_DETECTED' });

            return () => {
                removeListenerFromElement(linkElement, { name: 'monetization', handler });
            };
        };

        window.addEventListener('load', loadHandler);
        return () => {
            window.removeEventListener('load', loadHandler);
        };
    }, []);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export { Context, Provider };
