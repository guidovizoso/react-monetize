import * as React from 'react';

import { ContextType, StateType } from '../types';
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
    setState: () => {},
});

const Provider: React.FC = ({ children, paymentPointer }: ProviderProps) => {
    const [state, setState] = React.useState<StateType>(initialState);

    const handleStart = (e) => {
        setState((prevState) => {
            return {
                ...prevState,
                isLoading: false,
                isMonetized: true,
                state: document.monetization.state,
            };
        });
    };

    const handlePending = (e) => {
        setState((prevState) => {
            return {
                ...prevState,
                isLoading: false,
                isMonetized: true,
                state: document.monetization.state,
            };
        });
    };

    const handleStop = (e) => {
        setState((prevState) => {
            return {
                ...prevState,
                isLoading: false,
                isMonetized: false,
                state: document.monetization.state,
            };
        });
    };

    const handleProgress = (e) => {
        const events = state.events;
        events.push(e);
        setState((prevState) => {
            return {
                ...prevState,
                isLoading: false,
                isMonetized: true,
                state: document.monetization.state,
                events,
            };
        });
    };

    React.useEffect(() => {
        if (typeof document !== 'undefined' && (document as any).monetization) {
            const pointer = document.createElement('meta');
            pointer.name = 'monetization';
            pointer.content = paymentPointer;
            document.head.appendChild(pointer);

            const { state } = (document as any).monetization;
            setState((prevState) => {
                return {
                    ...prevState,
                    isLoading: false,
                    isMonetized: true,
                    state,
                };
            });
        } else {
            setState((prevState) => {
                return {
                    ...prevState,
                    isLoading: false,
                };
            });
        }
    }, []);

    React.useEffect(() => {
        if (typeof document !== 'undefined' && (document as any).monetization) {
            addListeners([
                { name: 'monetizationstart', handler: (e) => handleStart(e) },
                { name: 'monetizationpending', handler: (e) => handlePending(e) },
                { name: 'monetizationstop', handler: (e) => handleStop(e) },
                { name: 'monetizationprogress', handler: (e) => handleProgress(e) },
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

    return <Context.Provider value={{ state, setState }}>{children}</Context.Provider>;
};

export { Context, Provider };
