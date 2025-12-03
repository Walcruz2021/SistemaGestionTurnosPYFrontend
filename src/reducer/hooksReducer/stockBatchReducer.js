import { GETSTOCKBATCH_BY_IDSUPPLY } from "../actions/actionsStockBatch";


const initialState = {
    listStockBatch: [],
};


export default function petsReducer(state = initialState, action) {
    switch (action.type) {

        case GETSTOCKBATCH_BY_IDSUPPLY:
            return {
                ...state,listStockBatch: action.payload
            };


        default:
            return state;
    }
}