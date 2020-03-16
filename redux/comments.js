import * as ActionTypes from './ActionTypes'

const initialState = {
    isLoading: true,
    errMess: null,
    comments: []
}

export const comments = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            console.log(action.payload);
            return {
                ...state,
                comments: state.comments.concat({
                    id: state.comments.length+1,
                    ...action.payload
                })
            }
        case ActionTypes.ADD_COMMENTS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                comments: action.payload
            }
        case ActionTypes.COMMENTS_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                comments: []
            }
        case ActionTypes.COMMENTS_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                comments: []
            }
        default:
            return state
    }
}