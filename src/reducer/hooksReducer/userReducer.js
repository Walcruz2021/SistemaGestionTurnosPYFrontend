import {
    GET_USER,
    ADD_USER,
    RESET_USER_SEARCH,
    SEARCH_USER,
} from "../actions/actionsUser";

const initialState = {
    user: null,
    userEmailSearch: null,
};


export default function userReducer(state = initialState, action) {
    switch (action.type) {

        case GET_USER:
            return {
                ...state,
                user: action.payload,
            };

        case SEARCH_USER:
            return {
                ...state,
                userEmailSearch: action.payload,
            };

        case RESET_USER_SEARCH:
            return {
                ...state,
                userEmailSearch: null,
            };

        case ADD_USER:
            return {
                ...state,
            };

        default:
            return state;
    }
}