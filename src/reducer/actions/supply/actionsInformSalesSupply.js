
import axios from "axios";
import host from "../../../components/ruteBack/vbledeploy"
export const SALESSUPPLIESBYMONTHNOW = "SALESSUPPLIESBYMONTHNOW"
export const SALESSUPPLIESBYMONTH = "SALESSUPPLIESBYMONTH"
export const SALESSUPPLIESBYYEAR = "SALESSUPPLIESBYYEAR"
export const RESET_SALES_BYMONTH = "RESET_SALES_BYMONTH"

export function informSalesSupplyByMonthNow(idCompany) {

    return async function (dispatch) {

        const listSalesSupplyByMonth = await axios.get(
            `${host}/api/getSalesByMonthNow/${idCompany}`,
            {}
        )
        return dispatch({
            type: SALESSUPPLIESBYMONTHNOW,
            payload: listSalesSupplyByMonth.data
        })

    }
}

export function informSalesSupplyByMonth(idCompany, date) {

    return async function (dispatch) {

        const listSalesSupplyByMonth = await axios.get(
            `${host}/api/getSalesByMonth/${idCompany}`,
            {

                params: {
                    date: date,

                }
            }
        )
        return dispatch({
            type: SALESSUPPLIESBYMONTH,
            payload: listSalesSupplyByMonth.data
        })

    }
}

export function informSalesSupplyByYear(idCompany, date) {

    return async function (dispatch) {

        const listSalesSupplyByYear = await axios.get(
            `${host}/api/getSalesByYear/${idCompany}`,
            {

                params: {
                    date: date,

                }
            }
        )


        return dispatch({
            type: SALESSUPPLIESBYYEAR,
            payload: listSalesSupplyByYear.data
        })

    }
}

export const resetSalesByMonth = () => ({
    type: RESET_SALES_BYMONTH,
});