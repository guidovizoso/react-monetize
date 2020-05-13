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
    | { type: 'INITIAL_DECETED'; payload: { state: string } }
    | { type: 'INITIAL_NOT_DETECTED' }
    | { type: 'MONETIZATION_START'; payload: { state: string } }
    | { type: 'MONETIZATION_PENDING'; payload: { state: string } }
    | { type: 'MONETIZATION_STOP'; payload: { state: string } }
    | { type: 'MONETIZATION_PROGRESS'; payload: { state: string; event: object } };

export type Dispatch = (action: Action) => void;

export type StateType = {
    isMonetized: boolean;
    isLoading: boolean;
    state: any;
    events: any[];
};
