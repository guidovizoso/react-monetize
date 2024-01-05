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
        case 'MONETIZATION':
            const events = state.events;
            events.push(action.payload.state);
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
