import { SALESSUPPLIESBYMONTHNOW, SALESSUPPLIESBYMONTH, SALESSUPPLIESBYYEAR, RESET_SALES_BYMONTH, RESET_SALES_PRODUCTS_BYYEAR } from "../../actions/supply/actionsInformSalesSupply";


const initialState = {
    listSalesSuppliesByMonthNow: [],
    listSalesSuppliesByMonth: [],
    listSalesSuppliesByYear: []
};


export default function informSalesSupply(state = initialState, action) {
    switch (action.type) {

        case SALESSUPPLIESBYMONTHNOW:
            return {
                ...state,
                listSalesSuppliesByMonthNow: action.payload
            }
        case SALESSUPPLIESBYMONTH:
            return {
                ...state,
                listSalesSuppliesByMonth: action.payload
            }

        case RESET_SALES_BYMONTH:
            return {
                ...state,
                listSalesSuppliesByMonth: []
            }

        case SALESSUPPLIESBYYEAR:
            return {
                ...state,
                listSalesSuppliesByYear: action.payload
            }
        case RESET_SALES_PRODUCTS_BYYEAR:
            return {
                ...state,
                listSalesSuppliesByYear: null
            }
        default:
            return state;
    }
}