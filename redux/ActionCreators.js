import * as ActionTypes from './ActionTypes'
import { baseUrl } from "../shared/baseUrl";
import { comments } from './comments';

// Comments
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl+'comments')
        .then(response => {
            if(response.ok) return response
            else {
                var error = new Error('Error '+response.status+':'+response.statusText);
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var error = new Error(error.message)
            throw error;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
}
export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
})
export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})
export const commentsLoading = () => ({
    type: ActionTypes.COMMENTS_LOADING
})

// Dishes
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading())
    return fetch(baseUrl+'dishes')
        .then(response => {
            if(response.ok) return response
            else {
                var error = new Error('Error '+response.status+':'+response.statusText);
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var error = new Error(error.message)
            throw error;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}
export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
})
export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

// Promotions
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading())
    return fetch(baseUrl+'promotions')
        .then(response => {
            if(response.ok) return response
            else {
                var error = new Error('Error '+response.status+':'+response.statusText);
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var error = new Error(error.message)
            throw error;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)))
}
export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
})
export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})
export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
})

// Leaders
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading())
    return fetch(baseUrl+'leaders')
        .then(response => {
            if(response.ok) return response
            else {
                var error = new Error('Error '+response.status+':'+response.statusText);
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var error = new Error(error.message)
            throw error;
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
}
export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
})
export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})
export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
})

// Add Favorites
export const postFavorites = (dishId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 500)
}
export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
})

// Add Comments
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    setTimeout(() => {
        dispatch(addComment(dishId, rating, author, comment));
    }, 500)
}
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId,
        rating,
        author,
        comment,
        date: new Date().toISOString()
    }
})