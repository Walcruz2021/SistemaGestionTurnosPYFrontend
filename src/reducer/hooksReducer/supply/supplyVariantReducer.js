import { GET_LIST_SUPPLIES_VARIANT, ADD_SUPPLY_VARIANT,UPDATE_SUPPLY_VARIANT_ADDIMAGES} from "../../actions/supply/actionsSupplyVariant";


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

        case ADD_SUPPLY_VARIANT:
            return {
                ...state
            };



        default:
            return state;
    }
}