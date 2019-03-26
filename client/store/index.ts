import { routerReducer, RouterState } from 'react-router-redux';
import { load } from 'redux-localstorage-simple';

// The top-level state object
export interface ApplicationState {
    routing: RouterState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    routing: routerReducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (
        dispatch: (action: TAction) => void,
        getState: () => ApplicationState
    ): void;
}

export function getInitialState(): ApplicationState {
    const storedState = load();
    if (storedState) {
        return storedState as ApplicationState;
    }
    return {
        routing: routingInitialState(),
    };
}

export const routingInitialState = () => ({
    location: {
        hash: '',
        key: '',
        pathname: '',
        search: '',
        state: undefined
    }
});