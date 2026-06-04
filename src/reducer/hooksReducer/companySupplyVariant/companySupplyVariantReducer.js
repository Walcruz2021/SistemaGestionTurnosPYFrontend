import { GET_COMPANY_SUPPLY_VARIANTS } from "../../actions/companySupplyVariant/actionsCompanySupplyVariant";


const initialState = {
    listCompanySupplyVariant: [],
};


export default function supplyReducer(state = initialState, action) {
    switch (action.type) {



        case GET_COMPANY_SUPPLY_VARIANTS:
            return {
                ...state,
                listCompanySupplyVariant: action.payload,
            };



        default:
            return state;
    }
}