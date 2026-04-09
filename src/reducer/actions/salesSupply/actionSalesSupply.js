import axios from "axios";
import host from "../../../components/ruteBack/vbledeploy"

export const NOTECRED = "NOTE_CRED"


export function actionNoteCred({ date, arraySupplies, idSale, idCompany,reason }) {

    return async function (dispatch) {


        try {
            const returnSale = await axios.put(
              
                `${host}/api/returnSale/${idCompany}`,


                { date, arraySupplies, idSale,reason }
            );
            return returnSale


        } catch (error) {

        }
    }

}           