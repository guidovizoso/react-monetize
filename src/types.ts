declare global {
    interface Document {
        monetization: any;
    }
}

export type ContextType = {
    state: StateType;
    dispatch: (func: any) => void;
};

export type Action =
    | { type: 'INITIAL_DETECTED' }
    | { type: 'INITIAL_NOT_DETECTED' }
    | { type: 'MONETIZATION'; payload: { state: any } };

export type Dispatch = (action: Action) => void;

export type StateType = {
    isMonetized: boolean;
    isLoading: boolean;
    state: any;
    events: any[];
};
