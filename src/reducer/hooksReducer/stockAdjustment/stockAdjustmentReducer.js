import { ADD_AJUSTMENT } from "../../actions/stockAdjustment/actionStockAdjustment";


const initialState = {
};


export default function supplyReducer(state = initialState, action) {
    switch (action.type) {

       
        case ADD_AJUSTMENT:
            return {
                ...state
            };

       

        default:
            return state;
    }
}