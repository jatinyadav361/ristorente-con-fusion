import { Reducer, initialState } from './reducer';
import { createStore } from 'redux';

// Configuring react store
export const configureStore = () => {
    const store = createStore(
        Reducer,
        initialState
    );
    return store;
}
