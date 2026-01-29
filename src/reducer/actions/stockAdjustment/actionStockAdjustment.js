
import axios from "axios";

import host from "../../../components/ruteBack/vbledeploy"

export const ADD_AJUSTMENT = "ADD_AJUSTMENT"

export function addStockAdjustment(payload) {
console.log(payload)
  return async function (dispatch) {
    try {
      const newStockAdjustment = await axios.post(
        `${host}/api/addStockAdjustment`,
        payload
      );
      return newStockAdjustment;
    } catch (error) {
      console.log(error);
    }
  };
}