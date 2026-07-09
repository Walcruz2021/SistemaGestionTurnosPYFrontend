import { VERIFICATION_CONECTION } from "../actions/actions"
import { LIST_BRANDS } from "../actions/actionBrand"
import { LIST_CATEGORIES } from "../actions/category/actionCategory"

const initialState = {
    conectionMongo: null,
    dataPrediction: "",
    listBrands: [],
    listCategories: []
};


export default function gralReducer(state = initialState, action) {
    switch (action.type) {

        case VERIFICATION_CONECTION:
            return {
                ...state,
                conectionMongo: action.payload,
            };


        case LIST_BRANDS:
            return {
                ...state, listBrands: action.payload
            }

        case LIST_CATEGORIES:
            return {
                ...state, listCategories: action.payload
            }


        default:
            return state;
    }
}