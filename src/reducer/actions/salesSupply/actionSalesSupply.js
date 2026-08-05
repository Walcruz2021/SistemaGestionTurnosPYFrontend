import axios from "axios";
import host from "../../../components/ruteBack/vbledeploy"
import hostNest from "../../../components/ruteBack/vbleDeployNest"
export const NOTECRED = "NOTE_CRED"
export const BEST_SELLING="BEST_SELLING"
export const LESS_SELLING="LESS_SELLING"
export const SALES_BY_PLATFORM="SALES_BY_PLATFORM"

// const API_URL = import.meta.env.VITE_ROUTE_DASHBOARD_BACKEND;

// console.log(API_URL)
export function actionNoteCred({ date, arraySupplies, idSale, idCompany, reason }) {

    return async function (dispatch) {


        try {
            const returnSale = await axios.put(

                `${host}/api/returnSale/${idCompany}`,


                { date, arraySupplies, idSale, reason }
            );
            return returnSale


        } catch (error) {

        }
    }

}

export function actionBestSelling(idCompany) {
   
    return async function (dispatch) {

        // console.log(API_URL)
        try {
            const bestSelling = await axios.get(

                `${hostNest}/api/nest/salesupplies/bestSelling/${idCompany}`
            );
            
            return dispatch({
                type: BEST_SELLING,
                payload:bestSelling.data
            })


        } catch (error) {
            console.log(error)
        }
    }
}

export function actionLessSelling(idCompany) {
   
    return async function (dispatch) {

        // console.log(API_URL)
        try {
            const lessSelling = await axios.get(

                `${hostNest}/api/nest/salesupplies/lessSelling/${idCompany}`
            );
            
            return dispatch({
                type: LESS_SELLING,
                payload:lessSelling.data
            })


        } catch (error) {
            console.log(error)
        }
    }
}

export function actionSalesByPlatform(idCompany) {
   
    return async function (dispatch) {

        // console.log(API_URL)
        try {
            const salesByPlatform = await axios.get(

                `${hostNest}/api/nest/salesupplies/byPlatform/${idCompany}`
            );
            
            return dispatch({
                type: SALES_BY_PLATFORM,
                payload:salesByPlatform.data
            })


        } catch (error) {
            console.log(error)
        }
    }
}