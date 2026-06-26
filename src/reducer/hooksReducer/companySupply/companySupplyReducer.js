import { LIST_SUPPLIES_STORE,RESET_SUPPLIES_STORE } from "../../actions/companySupply/actionCompanySupply";


const initialState = {
    listSuppliesStore: []
};


export default function supplyReducer(state = initialState, action) {
    switch (action.type) {


        case LIST_SUPPLIES_STORE:
            return {
                ...state,
                listSuppliesStore: action.payload
            };

        case RESET_SUPPLIES_STORE:
            return {
                ...state,
                listSuppliesStore: null
            };



        default:
            return state;
    }
}