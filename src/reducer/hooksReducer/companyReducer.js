

import {
    ADD_COMPANY,
    VERIFICATION_COMPANY_EXISTS,
    FUNCTION_COMPANY_SELECTED,
    RESET_COMPANY_SELECTED,
    IS_CATEGORY_MEDICINE,
    IS_CATEGORY_INDUMENTARY,
    TYPE_PERSON_CATEGORY,
} from "../actions/actionsCompany";

import { GET_COMPANY_BY_SLUGCOMPANY } from "../actions/company/actionCompany"

const initialState = {

    arrayCompanies: [],
    companySelected: null,
    categoryMedicine: false,
    categoryIndumentary: false,
    typePerson: "Cliente",
    companySlugCompany: null
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
        case IS_CATEGORY_INDUMENTARY:
            return {
                ...state,
                categoryIndumentary: action.payload,
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


        case GET_COMPANY_BY_SLUGCOMPANY:
            return {
                ...state,
                companySlugCompany: action.payload,
            };

        default:
            return state;
    }
}