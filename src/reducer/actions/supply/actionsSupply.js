import axios from "axios";

import host from "../../../components/ruteBack/vbledeploy"

export const ADD_SUPPLY = "ADD_SUPPLY"
export const ADD_BUY_SUPPLY="ADD_BUY_SUPPLY"
export const GET_LIST_SUPPLIES = "GET_LIST_SUPPLIES"
export const ORDER_SUPPLIES = "ORDER_SUPPLIES"
export const UPDATE_SUPPLY = "UPDATE_SUPPLY"
export const GET_LIST_BUY_SUPPLIES = "GET_LIST_BUY_SUPPLIES"
export const UPDATE_SUPPLY_By_LIST="UPDATE_SUPPLY_By_LIST"

export function actionAddSupply(payload) {
  console.log(payload)
  return async function (dispatch) {
    try {
      const newSupply = await axios.post(
        `${host}/api/addSupply`,
        payload
      );
      return newSupply;
    } catch (error) {
      console.log(error);
    }
  };
}

export function actionAddBuySupply(payload){

  console.log(payload,"action")
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


export function getListSupplies() {
  return async function (dispatch) {
    const listSupplies = await axios.get(
      //"http://localhost:3002/api/listClients",
      //`${host.development}/api/listClientsCompany/66465ac8c1212f4dc0088087`,
      `${host}/api/getListSupplies`,
      {}
    );
    return dispatch({
      type: GET_LIST_SUPPLIES,
      payload: listSupplies.data,
    });
  };
}

export function actionsOrderSupplies(payload) {

  return {
    type: ORDER_SUPPLIES,
    payload,
  };
}

export function actionListBuySupplies(idCompany) {
  return async function (dispatch) {
    const listBuySupplies = await axios.get(
      `${host}/api/getListBuySupplies/${idCompany}`,
      {}
    );
    return dispatch({
      type: GET_LIST_BUY_SUPPLIES,
      payload:listBuySupplies.data.listGetBuySupplies

    })
  }
}