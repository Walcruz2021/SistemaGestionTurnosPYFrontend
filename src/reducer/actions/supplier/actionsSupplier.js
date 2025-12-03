import axios from "axios";

import host from "../../../components/ruteBack/vbledeploy"

export const ACTION_LIST_SUPPLIER = "ACTION_LIST_SUPPLIER";
export const ACTION_ADDSUPPLIER = "ACTION_ADDSUPPLIER";


export function actionListSupplier(idCompany) {

  return async function (dispatch) {
    const listSupplier=await axios.get(
      //`http://localhost:3002/api/editClient/${idElement}`,
      `${host}/api/listSupplier/${idCompany}`
     
    );

    return dispatch({
      type: ACTION_LIST_SUPPLIER,
      payload:listSupplier.data.listSupplier
    });
  };
}

export function actionAddSupplier(payload) {
  return async function (dispatch) {
    try {
      const newSupplier = await axios.post(
        `${host}/api/addSupplier`,
        payload
      );
      return newSupplier;
    } catch (error) {
      console.log(error);
    }
  };
}


