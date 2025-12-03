import { ACTION_LIST_SUPPLIER, ACTION_ADDSUPPLIER } from "../../actions/supplier/actionsSupplier";


const initialState = {
    listSupplier: []
};


export default function supplierReducer(state = initialState, action) {
    switch (action.type) {

        case ACTION_LIST_SUPPLIER:
            return {
                ...state,
                listSupplier: action.payload
            };

        case ACTION_ADDSUPPLIER:
            return {
                ...state
            };

        default:
            return state;
    }
}