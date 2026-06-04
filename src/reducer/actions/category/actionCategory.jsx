import axios from "axios";

import host from "../../../components/ruteBack/vbledeploy"


export const LIST_CATEGORIES = "LIST_CATEGORIES"


export function listCategories() {

  return async function (dispatch) {
    try {
      const listCategories = await axios.get(
        `${host}/api/getCategories`
      );

      return dispatch({
        type: LIST_CATEGORIES,
        payload: listCategories.data.categories,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
