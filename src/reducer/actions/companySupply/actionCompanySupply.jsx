import axios from "axios";

import host from "../../../components/ruteBack/vbledeploy"

export const EDIT_SALE_SUPPLY = "EDIT_SALE_SUPPLY"
export const LIST_SUPPLIES_STORE = "LIST_SUPPLIES_STORE"
export const RESET_SUPPLIES_STORE = "RESET_SUPPLIES_STORE"


export function actionEditCompanySupply(payload, idCompany) {

  return async function (dispatch) {
    try {
      const editCompSupply = await axios.put(
        `${host}/api/editCompanySupply/${idCompany}`,
        payload
      );
      return editCompSupply
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


export const resetProductsStore = () => {


    return {
        type: RESET_SUPPLIES_STORE
    };
};