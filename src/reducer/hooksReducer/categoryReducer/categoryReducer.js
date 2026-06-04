

import {
LIST_CATEGORIES
} from "../../actions/category/actionCategory";

const initialState = {

    arrayCategories: [],
};


export default function categoryReducer(state = initialState, action) {

    switch (action.type) {

        case LIST_CATEGORIES:
            return {
                ...state,
                arrayCategories: action.payload,
            };
       
        default:
            return state;
    }
}