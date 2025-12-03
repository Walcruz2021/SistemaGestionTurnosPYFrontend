import axios from "axios";
import host from "../../components/ruteBack/vbledeploy";
export const ADD_BRAND = "ADD_BRAND"
export const LIST_BRANDS="LIST_BRANDS"


export function addBrand(payload) {
  return async function (dispatch) {
    try {
      const newUser = await axios.post(
        //`http://localhost:3002/api/addPerro/${idClient}`,
        `${host}/api/addBrand`,
        payload
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function getBrands() {
  return async function (dispatch) {
    const listBrands = await axios.get(

      `${host}/api/listBrands`,
      {}
    );
    return dispatch({
      type: LIST_BRANDS,
      payload: listBrands.data.brands,
    });
    // axios
    //   .get("/api/listClients")
    //   .then((data) => {
    //     return dispatch({ type: "GET_CLIENTS", payload: data.data.payload });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
}