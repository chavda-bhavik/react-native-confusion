import * as ActionTypes from './ActionTypes'

let initialState = []

export const favorites = (state = initialState , action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:
            if(state.some(el => el === action.payload))
                return state;
            else 
                return state.concat(action.payload);
        default:
            return state;
    }
}