import axios from "axios";
import host from "../../components/ruteBack/vbledeploy";
export const DELETE_DOG = "DELETE_DOG";
export const UPDATE_DOG = "UPDATE_DOG";
export const ADD_DOG = "ADD_DOG";
export const SEARCH_VTA_HISTORY_PETS = "SEARCH_VTA_HISTORY_PETS";
export function addDog(payload, idClient) {
  console.log(payload, "action");
  return async function (dispatch) {
    try {
      const newDog = await axios.post(
        //`http://localhost:3002/api/addPerro/${idClient}`,
        `${host}/api/addPerro/${idClient}`,
        payload
      );
      return newDog;
    } catch (error) {
      console.log(error);
    }
  };
}

//funciona bien
export function deleteDog(idDog) {
  return async function (dispatch) {
    const response = await axios.put(
      //`http://localhost:3002/api/deleteDog/${idDog}`
      `${host}/api/deleteDog/${idDog}`
    );
    if (response.status === 200 || response.status === 204) {
      dispatch({ type: DELETE_DOG, payload: idDog });
    }
    return response;
  };
}

export function updateDog(payload, idDog) {
  return async function (dispatch) {
    await axios.put(
      //`http://localhost:3002/api/editDog/${idDog}`, payload
      `${host}/api/editDog/${idDog}`,
      payload
    );
    return dispatch({
      type: UPDATE_DOG,
    });
  };
}

export function searchHistorialDog(payload) {
  //console.log(payload)
  //628ae8c5d66d1f4760a023be del perro seleccionado
  return async function (dispatch) {
    const vtaxClient = await axios.get(
      //`http://localhost:3002/api/ventaCli/${payload}`
      `${host}/api/ventaCli/${payload}`
    );

    return dispatch({
      type: SEARCH_VTA_HISTORY_PETS,
      payload: vtaxClient,
    });
  };
}
