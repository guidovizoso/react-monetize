import { useContext } from 'react';

import { Context } from './MonetizeContext';
import { ContextType } from './types';

function useContent() {
    const { state } = useContext<ContextType>(Context);

    return {
        isMonetized: state.isMonetized,
        isLoading: state.isLoading,
    };
}

export default useContent;
