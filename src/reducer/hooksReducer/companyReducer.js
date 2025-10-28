

import {
    ADD_COMPANY,
    VERIFICATION_COMPANY_EXISTS,
    FUNCTION_COMPANY_SELECTED,
    RESET_COMPANY_SELECTED,
    IS_CATEGORY_MEDICINE,
    TYPE_PERSON_CATEGORY,
} from "../actions/actionsCompany";

const initialState = {

    arrayCompanies: [],
    companySelected: null,
    categoryMedicine: false,
    typePerson: "Cliente",
};


export default function companyReducer(state = initialState, action) {

    switch (action.type) {

        case VERIFICATION_COMPANY_EXISTS:
            return {
                ...state,
                arrayCompanies: action.payload,
            };
        case IS_CATEGORY_MEDICINE:
            return {
                ...state,
                categoryMedicine: action.payload,
            };

        case TYPE_PERSON_CATEGORY:
            return {
                ...state,
                typePerson: action.payload,
            };

        case ADD_COMPANY:
            return {
                ...state,
            };
        case FUNCTION_COMPANY_SELECTED:
            return {
                ...state,
                companySelected: action.payload,
            };

        case RESET_COMPANY_SELECTED:
            return {
                ...state,
                companySelected: null,
                arrayCompanies: [],
            };

        default:
            return state;
    }
}