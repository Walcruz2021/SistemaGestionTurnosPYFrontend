import { GET_LIST_SUPPLIES_VARIANT} from "../../actions/supply/actionsSupplyVariant";


const initialState = {
    listSuppliesVariant: []
};


export default function supplyReducer(state = initialState, action) {
    switch (action.type) {

        case GET_LIST_SUPPLIES_VARIANT:
            return {
                ...state,
                listSuppliesVariant: action.payload
            }

       
        default:
            return state;
    }
}