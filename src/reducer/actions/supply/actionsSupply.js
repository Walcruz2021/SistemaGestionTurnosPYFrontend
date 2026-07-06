import axios from "axios";

import host from "../../../components/ruteBack/vbledeploy"

export const ADD_SUPPLY = "ADD_SUPPLY"
export const ADD_BUY_SUPPLY = "ADD_BUY_SUPPLY"
export const GET_LIST_SUPPLIES = "GET_LIST_SUPPLIES"
export const ORDER_SUPPLIES = "ORDER_SUPPLIES"
export const UPDATE_SUPPLY = "UPDATE_SUPPLY"
export const GET_LIST_BUY_SUPPLIES_BY_DATE_CURRENT = "GET_LIST_BUY_SUPPLIES_BY_DATE_CURRENT"
export const UPDATE_SUPPLY_By_LIST = "UPDATE_SUPPLY_By_LIST"
export const ADD_SALE_SUPPLY = "ADD_SALE_SUPPLY"
export const GET_BUYSUPPLY_BY_NINVOICE = "GET_BUYSUPPLY_BY_NINVOICE"
export const GET_LIST_SUPPLIES_GRAL = "GET_LIST_SUPPLIES_GRAL"
export const RESET_BUYSUPPLY_BY_NINVOICE="RESET_BUYSUPPLY_BY_NINVOICE"

/**
 * add supply gral
 * @param {*} nameSupply
 * @param {*} idBrand
 * @param {*} description 
 * @param {*} imgStore
 * @returns newSupply
 */

//MANEJAR ESSTE MODELO DE ACTION PARA TODOS
export function actionAddSupply(payload) {

  return async function (dispatch) {
    try {
      const newSupply = await axios.post(
        `${host}/api/addSupply`,
        payload
      );
      return newSupply;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };
}

export function actionAddBuySupply(payload) {


  return async function (dispatch) {
    try {
      const newBuySupply = await axios.post(
        `${host}/api/addBuySupply`,
        payload
      );
      return newBuySupply;
    } catch (error) {
      console.log(error);
    }
  };
}

export function actionEditSupply(payload, idSupply) {

  return async function (dispatch) {
    try {
      await axios.put(
        `${host}/api/editSupply/${idSupply}`,
        payload
      );
      return dispatch({
        type: UPDATE_SUPPLY,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function actionEditSupplyByList(payload) {

  return async function (dispatch) {
    try {
      await axios.put(
        `${host}/api/editSupplyByList`,
        payload
      );
      return dispatch({
        type: UPDATE_SUPPLY_By_LIST,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

/**
 * @module Supply
 * @endpoint GET /api/getListSupplies/:idCompany
 * @store supply.listSupplies
 * @usedBy SuppliesPage
 * @description Obtiene todos los insumos asociados a una empresa.
 */

export function getListSupplies(idCompany) {

  return async function (dispatch) {
    const listSupplies = await axios.get(
      //"http://localhost:3002/api/listClients",
      //`${host.development}/api/listClientsCompany/66465ac8c1212f4dc0088087`,
      `${host}/api/getListSupplies/${idCompany}`,
    );
    return dispatch({
      type: GET_LIST_SUPPLIES,
      payload: listSupplies.data,
    });
  };
}

export function getListSuppliesGral() {

  return async function (dispatch) {
    const listSuppliesGral = await axios.get(
      //"http://localhost:3002/api/listClients",
      //`${host.development}/api/listClientsCompany/66465ac8c1212f4dc0088087`,
      `${host}/api/getListSuppliesGral`,
      {}
    );
    return dispatch({
      type: GET_LIST_SUPPLIES_GRAL,
      payload: listSuppliesGral.data.listSuppliesGral,
    });
  };
}


export function actionsOrderSupplies(payload) {

  return {
    type: ORDER_SUPPLIES,
    payload,
  };
}

export function actionListBuySuppliesByDateCurrent(idCompany) {
  return async function (dispatch) {
    const listBuySupplies = await axios.get(
      `${host}/api/getListBuySuppliesByDateCurrent/${idCompany}`,
      {}
    );
    return dispatch({
      type: GET_LIST_BUY_SUPPLIES_BY_DATE_CURRENT,
      payload: listBuySupplies.data.listGetBuySupplies

    })
  }
}

export function actionListBuySupplyByNInvoice(idCompany, nInvoice) {
  return async function (dispatch) {
    const listBuySupplies = await axios.get(
      `${host}/api/getBuySupplyXNInvoice/${idCompany}`,
      {
        params: {
          NInvoice: nInvoice,

        }
      }
    );
    return dispatch({
      type: GET_BUYSUPPLY_BY_NINVOICE,
      payload: listBuySupplies.data.findSupply

    })
  }
}

export const resetGetSupplyByInvoice = () => {
  return {
    type: RESET_BUYSUPPLY_BY_NINVOICE
  }
}

export function actionAddSaleSupply(payload) {


  return async function (dispatch) {
    try {
      const newSaleSupply = await axios.post(
        `${host}/api/addSaleSupply`,
        payload
      );
      return newSaleSupply;
    } catch (error) {
      console.log(error);
    }
  };
}

export function actionAddImgSupply(image, idSupply) {
  return async function (dispatch) {
    try {

      const formData = new FormData();

      if (image) {
        formData.append("image", image);
      }
      // console.log(formData,"actions")
      const response = await axios.post(
        `${host}/api/addSupplyImage/${idSupply}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response;

    } catch (error) {
      console.log(error);
      return error.response;
    }
  };
}