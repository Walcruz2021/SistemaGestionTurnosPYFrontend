import axios from "axios";

import host from "../../../components/ruteBack/vbledeploy"


export const GET_LIST_SUPPLIES_VARIANT="GET_LIST_SUPPLIES_VARIANT"




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

