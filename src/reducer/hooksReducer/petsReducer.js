import { DELETE_DOG, UPDATE_DOG, ADD_DOG, SEARCH_VTA_HISTORY_PETS } from "../actions/actionsDog";


const initialState = {
    vtaxClient: [],
};


export default function petsReducer(state = initialState, action) {
    switch (action.type) {

        case DELETE_DOG:
            return {
                ...state,
            };


        case ADD_DOG:
            return {
                ...state,
            };

        case SEARCH_VTA_HISTORY_PETS:
            return {
                ...state,
                vtaxClient: action.payload,
            };


        default:
            return state;
    }
}