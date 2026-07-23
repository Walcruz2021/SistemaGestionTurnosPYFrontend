import axios from "axios";
import host from "../../../components/ruteBack/vbledeploy"
export const NOTECRED = "NOTE_CRED"
export const BEST_SELLING="BEST_SELLING"


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
    console.log(idCompany)
    return async function (dispatch) {

        // console.log(API_URL)
        try {
            const bestSelling = await axios.get(

                `https://backend-nest-informes.vercel.app/api/nest/salesupplies/bestSelling/${idCompany}`
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