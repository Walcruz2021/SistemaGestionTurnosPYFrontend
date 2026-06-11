import axios from "axios";

import host from "../../../components/ruteBack/vbledeploy"

export const GET_COMPANY_BY_SLUGCOMPANY = "GET_COMPANY_BY_SLUGCOMPANY"


export function getCompantBySlugCompany(slugCompany) {

    return async function (dispatch) {
        try {
            const findCompany = await axios.get(
                `${host}/api/getCompanyBySlugCompany/${slugCompany}`
            );
   
            return dispatch({
                type: GET_COMPANY_BY_SLUGCOMPANY,
                payload: findCompany.data.company,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function listSuppliesStore(idCompany) {

    return async function (dispatch) {
        try {
            const listSuppliesStore = await axios.get(
                `${host}/api/listSuppliesStore/${idCompany}`
            );

            return dispatch({
                type: LIST_SUPPLIES_STORE,
                payload: listSuppliesStore.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}


export const resetProductsStore = () => ({
    type: RESET_SUPPLIES_STORE,
});
