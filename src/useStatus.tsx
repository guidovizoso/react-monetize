import { useContext } from 'react';

import { Context } from './MonetizeContext';
import { ContextType } from './types';

function useStatus() {
    const { state, dispatch } = useContext<ContextType>(Context);

    return {
        state: state.state,
        events: state.events,
    };
}

export default useStatus;
