import axios from "axios";
import host from "../../components/ruteBack/vbledeploy";
import { auth } from "../../api/configFirebase";
export const ADD_TODO = "ADD_TODO";
export const ORDER_CONTACTS = "ORDER_CONTACTS";
export const ASIGNED_VENTAS = "ASIGNED_VENTAS";
export const SEARCH_VTA_CLIENT = "SEARCH_VTA_CLIENT";
export const POST_BREAK = "POST_BREAK";
export const GET_USER = "GET_USER";
export const VERIFICATION_CONECTION="VERIFICATION_CONECTION"

export const setUser = (user) => ({
  type: GET_USER,
  payload: user,
});

export function verificationConection(){
  return async function (dispatch) {
    const conectionMongo = await axios.get(`${host}/api/health`, {});
    return dispatch({
      type: VERIFICATION_CONECTION,
      payload: conectionMongo.status,
    });
  };
};

export const listenToAuthChanges = () => (dispatch) => {
  auth.onAuthStateChanged((userCred) => {
    
    if (userCred) {
      const { email, emailVerified, displayName } = userCred;
      dispatch(setUser({ email, emailVerified, displayName }));
    } else {
      dispatch(setUser(null));
    }
  });
};

export function orderContacts(payload) {
  return {
    type: ORDER_CONTACTS,
    payload,
  };
}

//getTurnos trae el listado de turno

/**
 * 
 * @param {*} email 
 * @returns companies:{[
    {
        "_id": "66872b3a0945d93a4c124c05",
        "nameCompany": "Empresa Prueba 1a",
        "cuit": "21312321"
    },
    {
        "_id": "66872b500945d93a4c124c11",
        "nameCompany": "Empresa Prueba 1b",
        "cuit": "34234532432"
    }
]}
 */

//funciona bien pero no se refresca la pagina
