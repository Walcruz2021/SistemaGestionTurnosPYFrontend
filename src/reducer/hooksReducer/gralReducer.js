import { VERIFICATION_CONECTION } from "../actions/actions"
import { LIST_BRANDS } from "../actions/actionBrand"

const initialState = {
    conectionMongo: null,
    dataPrediction: "",
    listbrands: []
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


        default:
            return state;
    }
}