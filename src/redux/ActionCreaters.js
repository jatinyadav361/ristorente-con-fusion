import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type : ActionTypes.ADD_COMMENT,
    payload : comment
});

export const postComment = (dishId,rating,author,comment) => (dispatch) => {
    const newComment = {
        dishId : dishId,
        rating : rating,
        author : author,
        comment : comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl+'comments',{
        method : 'POST',
        body : JSON.stringify(newComment),
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : "same-origin"
    }).then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error'+response.status+': '+response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var errMess = new Error('Error: '+ error.message);
            throw errMess;
        }
    )
    .then(response => response.json())
    .then(comment => dispatch(addComment(comment)))
    .catch(error => {
        console.log('post comments'+ error.message);
        alert("Your comment can not be posted\nError: "+error.message);
    });
}

//dishes
// This is a redux thunk which return a function
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
            .then(response => {
                if(response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error'+response.status+': '+response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errMess = new Error('Error: '+ error.message);
                    throw errMess;
                }
            )
            .then(response => response.json())
            .then(dishes => dispatch(addDishes(dishes)))
            .catch(error => dispatch(dishesFailed(error.message)));
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
                .then(response => {
                    if(response.ok) {
                        return response;
                    }
                    else {
                        var error = new Error('Error'+response.status+': '+response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                    error => {
                        var errMess = new Error('Error: '+ error.message);
                        throw errMess;
                    }
                )
                .then(response => response.json())
                .then(comments => dispatch(addComments(comments)))
                .catch(error => dispatch(commentsFailed(error.message)));
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
                .then(response => {
                    if(response.ok) {
                        return response;
                    }
                    else {
                        var error = new Error('Error'+response.status+': '+response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                    error => {
                        var errMess = new Error('Error: '+ error.message);
                        throw errMess;
                    }
                )
                .then(response => response.json())
                .then(promotions => dispatch(addPromos(promotions)))
                .catch(error => dispatch(promosFailed(error.message)));
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

//leaders
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));

    return fetch(baseUrl+'leaders')
                .then(response => {
                    if(response.ok) {
                        return response;
                    }
                    else {
                        var error = new Error('Error'+ response.status+ ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                }, error => {
                    var errMess = new Error('Error:' + error.message);
                    throw errMess;
                })
                .then(response => response.json())
                .then(leaders => dispatch(addLeaders(leaders)))
                .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type : ActionTypes.LEADERS_LOADING
});

export const addLeaders = (leaders) => ({
    type : ActionTypes.ADD_LEADERS,
    payload : leaders
});

export const leadersFailed = (errMess) => ({
    type : ActionTypes.LEADERS_FAILED,
    payload : errMess
});


// add feedback

export const postFeedback = (firstname,lastname,telnum,email,agree,contactType,message) => (dispatch) => {
    const newFeedback = {
        firstname : firstname,
        lastname : lastname,
        telnum : telnum,
        email : email,
        agree : agree,
        contactType : contactType,
        message : message
    }

    newFeedback.date = new Date().toISOString();
    
    return fetch(baseUrl+'feedback', {
        method : 'POST',
        body : JSON.stringify(newFeedback),
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : "same-origin"
    }).then(response => {
        console.log(response);
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error'+ response.status+ ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errMes = new Error('Error'+ error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(response => {
        console.log('Submitted Feedback: '+response);
        alert('Submitted Feedback: '+ JSON.stringify(response));
    }).catch((error) => alert("Your form cannot be submitted\nError: "+ error.message));
}