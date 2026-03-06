import { SALESSUPPLIESBYMONTHNOW, SALESSUPPLIESBYMONTH,SALESSUPPLIESBYYEAR,RESET_SALES_BYMONTH } from "../../actions/supply/actionsInformSalesSupply";


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

        default:
            return state;
    }
}