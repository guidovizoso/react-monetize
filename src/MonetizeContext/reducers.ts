const reducers = (state, action) => {
    switch (action.type) {
        case 'INITIAL_DETECTED':
            return {
                ...state,
                isLoading: false,
                isMonetized: true,
                state: action.payload.state,
            };
        case 'INITIAL_NOT_DETECTED':
            return {
                ...state,
                isLoading: false,
                isMonetized: false,
            };
        case 'MONETIZATION_START':
            return {
                ...state,
                isLoading: false,
                isMonetized: true,
                state: action.payload.state,
            };
        case 'MONETIZATION_PENDING':
            return {
                ...state,
                isLoading: true,
                isMonetized: false,
                state: action.payload.state,
            };
        case 'MONETIZATION_STOP':
            return {
                ...state,
                isLoading: false,
                isMonetized: false,
                state: action.payload.state,
            };
        case 'MONETIZATION_PROGRESS':
            const events = state.events;
            events.push(action.payload.event);
            return {
                ...state,
                isLoading: false,
                isMonetized: true,
                state: action.payload.state,
                events,
            };
        default:
            return state;
    }
};

export default reducers;
