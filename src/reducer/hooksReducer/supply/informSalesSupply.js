import { SALESSUPPLIESBYMONTHNOW, SALESSUPPLIESBYMONTH, SALESSUPPLIESBYYEAR, RESET_SALES_BYMONTH, RESET_SALES_PRODUCTS_BYYEAR } from "../../actions/supply/actionsInformSalesSupply";

import { BEST_SELLING, LESS_SELLING, SALES_BY_PLATFORM } from "../../actions/salesSupply/actionSalesSupply";

const initialState = {
    listSalesSuppliesByMonthNow: [],
    listSalesSuppliesByMonth: [],
    listSalesSuppliesByYear: [],
    listBestSelling: [],
    listLessSelling: [],
    listSalesByPlatform: []
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
        case BEST_SELLING:
            return {
                ...state,
                listBestSelling: action.payload
            }
        case LESS_SELLING:
            return {
                ...state,
                listLessSelling: action.payload
            }
        case SALES_BY_PLATFORM:
            return {
                ...state,
                listSalesByPlatform: action.payload
            }
        default:
            return state;
    }
}