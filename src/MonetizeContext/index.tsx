import * as React from 'react';

import { ContextType, StateType } from '../types';
import reducers from './reducers';
import { addListenerToElement, removeListenerToElement } from '../utils/events';

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

const Provider: React.FC = ({ children, paymentPointer }: ProviderProps) => {
    const [state, dispatch] = React.useReducer(reducers, initialState);

    React.useEffect(() => {
        const pointer = document.createElement('link');

        const isWebMonetizationSupported = pointer.relList.supports('monetization');

        if (typeof document !== 'undefined' && isWebMonetizationSupported) {
            pointer.rel = 'monetization';
            pointer.href = paymentPointer;
            document.head.appendChild(pointer);

            const handler = (event) => dispatch({ type: 'MONETIZATION', payload: { state: event } });

            addListenerToElement(pointer, {
                name: 'monetization',
                handler,
            });

            dispatch({ type: 'INITIAL_DETECTED' });

            return () => {
                removeListenerToElement(pointer, { name: 'monetization', handler });
            };
        } else {
            dispatch({ type: 'INITIAL_NOT_DETECTED' });
        }
    }, []);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export { Context, Provider };
