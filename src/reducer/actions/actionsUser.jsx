import axios from "axios";
import host from "../../components/ruteBack/vbledeploy";
export const ADD_USER = "ADD_USER";
export const SEARCH_USER = "SEARCH_USER";
export const GET_USER = "GET_USER";
export const RESET_USER_SEARCH = "RESET_USER_SEARCH";

export const setUser = (user) => ({
  type: GET_USER,
  payload: user,
});

export function addUser(payload) {
  return async function (dispatch) {
    try {
      const newUser = await axios.post(
        //`http://localhost:3002/api/addPerro/${idClient}`,
        `${host}/api/addUser`,
        payload
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export const resetUserSearch = () => ({
    type: RESET_USER_SEARCH,
  });

export function searchUser(email) {
    return async function (dispatch) {
      try {
        const response = await axios.get(`${host}/api/searchUser/${email}`);
  
        dispatch({
          payload: response,
          type: SEARCH_USER,
        });
      } catch (error) {
        if (error.response) {
          // Si hay una respuesta con un código de error
  
          dispatch({
            type: SEARCH_USER,
            payload: error.response, // Enviamos la respuesta de error a Redux
          });
        } else {
          console.log("Error general:", error);
        }
      }
    };
  }