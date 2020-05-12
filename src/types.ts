declare global {
    interface Document {
        monetization: any;
    }
}

export type ContextType = {
    state: StateType;
    setState: (func: any) => void;
};

export type StateType = {
    isMonetized: boolean;
    isLoading: boolean;
    state: any;
    events: any[];
};
