import axios from "axios";

import host from "../../../components/ruteBack/vbledeploy"

export const EDIT_SALE_SUPPLY = "EDIT_SALE_SUPPLY"


export function actionEditCompanySupply(payload, idCompany) {

  return async function (dispatch) {
    try {
      const editCompSupply=await axios.put(
        `${host}/api/editCompanySupply/${idCompany}`,
        payload
      );
      return editCompSupply
    } catch (error) {
      console.log(error);
    }
  };
}

