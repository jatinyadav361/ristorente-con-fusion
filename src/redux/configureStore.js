import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { createStore, combineReducers } from 'redux';

// Configuring react store
export const configureStore = () => {
    const store = createStore(
        // We have splitted the reducer into multiple reducers that manage partial state, and then 
        // combined them together using combineReducers().
        combineReducers({
            dishes : Dishes,
            comments : Comments,
            leaders : Leaders,
            promotions : Promotions
        })
    );
    return store;
}