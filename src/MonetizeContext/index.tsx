import * as React from 'react';

import { ContextType, StateType } from '../types';
import reducers from './reducers';
import { addListeners, removeListeners } from '../utils/events';

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
        if (typeof document !== 'undefined' && document.monetization) {
            const pointer = document.createElement('meta');
            pointer.name = 'monetization';
            pointer.content = paymentPointer;
            document.head.appendChild(pointer);

            dispatch({ type: 'INITIAL_DECETED', payload: { state: document.monetization.state } });
        } else {
            dispatch({ type: 'INITIAL_NOT_DECETED' });
        }
    }, []);

    React.useEffect(() => {
        if (typeof document !== 'undefined' && document.monetization) {
            addListeners([
                {
                    name: 'monetizationstart',
                    handler: () =>
                        dispatch({ type: 'MONETIZATION_START', payload: { state: document.monetization.state } }),
                },
                {
                    name: 'monetizationpending',
                    handler: () =>
                        dispatch({ type: 'MONETIZATION_PENDING', payload: { state: document.monetization.state } }),
                },
                {
                    name: 'monetizationstop',
                    handler: () =>
                        dispatch({ type: 'MONETIZATION_STOP', payload: { state: document.monetization.state } }),
                },
                {
                    name: 'monetizationprogress',
                    handler: (e) =>
                        dispatch({
                            type: 'MONETIZATION_PROGRESS',
                            payload: { state: document.monetization.state, event: e },
                        }),
                },
            ]);
            return () => {
                removeListeners([
                    'monetizationstart',
                    'monetizationpending',
                    'monetizationstop',
                    'monetizationprogress',
                ]);
            };
        }
    }, []);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export { Context, Provider };
