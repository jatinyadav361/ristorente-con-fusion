import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (dishId,rating,author,comment) => ({
    type : ActionTypes.ADD_COMMENT,
    payload : {
        dishId : dishId,
        rating : rating,
        author : author,
        comment : comment
    }
});

//dishes

// This is a redux thunk which return a function
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
            .then(response => response.json())
            .then(dishes => dispatch(addDishes(dishes)));
}


// These are normal action creaters which returns action objects
export const dishesLoading = () => ({
    type : ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errMess) => ({
    type : ActionTypes.DISHES_FAILED,
    payload : errMess
});

export const addDishes = (dishes) => ({
    type : ActionTypes.ADD_DISHES,
    payload : dishes
});

//comments

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl+'comments')
                .then(response => response.json())
                .then(comments => dispatch(addComments(comments)));
}

export const addComments = (comments) => ({
    type : ActionTypes.ADD_COMMENTS,
    payload : comments
});

export const commentsFailed = (errMess) => ({
    type : ActionTypes.COMMENTS_FAILED,
    payload : errMess,
});

//promotions
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl+'promotions')
                .then(response => response.json())
                .then(promotions => dispatch(addPromos(promotions)));
}

export const promosLoading = () => ({
    type : ActionTypes.PROMOS_LOADING,
});

export const addPromos = (promos) => ({
    type : ActionTypes.ADD_PROMOS,
    payload : promos
});

export const promosFailed = (errMess) => ({
    type : ActionTypes.PROMOS_FAILED,
    payload : errMess
});