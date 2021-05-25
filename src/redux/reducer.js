import {DISHES} from '../shared/dishes';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import {COMMENTS} from '../shared/comments';

export const initialState = {
    dishes : DISHES,
    comments : COMMENTS,
    leaders : LEADERS,
    promotions : PROMOTIONS
}

// state will be equal to initialState if state is null, otherwise will be equal to previous state
// all the changes in the state are made through reducer functions
export const Reducer = (state = initialState,event) => {
    return state;
}