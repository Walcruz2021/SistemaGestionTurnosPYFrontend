import axios from "axios";

import host from "../../../components/ruteBack/vbledeploy"


export const GET_LIST_SUPPLIES_VARIANT = "GET_LIST_SUPPLIES_VARIANT"
export const ADD_SUPPLY_VARIANT = "ADD_SUPPLY_VARIANT"



export function getListSuppliesVariant() {

  return async function (dispatch) {
    const listSuppliesVariant = await axios.get(
      //"http://localhost:3002/api/listClients",

      `${host}/api/getListSupplyVariants/`,
      {}
    );

    return dispatch({
      type: GET_LIST_SUPPLIES_VARIANT,
      payload: listSuppliesVariant.data,
    });
  };
}

export function actionAddSupplyVariant(payload) {
  const name = [
    payload.peso,
    payload.unidad,
    payload.sabor,
    payload.talle,
    payload.color
  ]
    .filter(Boolean)
    .join(" ");

  payload = { ...payload, name: name }

  return async function (dispatch) {
    try {
      const newSupplyVariant = await axios.post(
        `${host}/api/addSupplyVariant`,
        payload
      );
      return newSupplyVariant;
    } catch (error) {
      return error.response;
      console.log(error);
    }
  };
}

export function actionAddImgSupplyVariant(formData, idSupplyVariant) {


  return async function (dispatch) {
    try {
      const newSupplyVariant = await axios.post(
        `${host}/api/addSupplyVariantImages/${idSupplyVariant}`,
        formData

      );
      return newSupplyVariant
    } catch (error) {
      return error.response;
      console.log(error);
    }
  };
}



