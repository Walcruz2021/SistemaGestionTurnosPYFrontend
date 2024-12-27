import axios from "axios";
import host from "../../components/ruteBack/vbledeploy";
import { auth } from "../../api/configFirebase";
export const ADD_TODO = "ADD_TODO";
export const ORDER_CONTACTS = "ORDER_CONTACTS";
export const GET_TURNOS = "GET_TURNOS";
export const GET_CLIENTS = "GET_CLIENTS";
export const GET_NAME_CLIENTS = "GET_NAME_CLIENTS";
export const DELETE_CLIENT = "DELETE_CLIENT";
export const DELETE_TURNO = "DELETE_TURNO";
export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const UPDATE_TURNO = "UPDATE_TURNO";
export const GET_CLIENTXNAME = "GET_CLIENTXNAME";
export const ORDER_TURNOS = "ORDER_TURNOS";
export const ASIGNED_VENTAS = "ASIGNED_VENTAS";
export const GET_CLIENTS_ID = "GET_CLIENTS_ID";
export const ADD_DOG = "ADD_DOG";
export const SEARCH_VTA_CLIENT = "SEARCH_VTA_CLIENT";
export const DELETE_DOG = "DELETE_DOG";
export const UPDATE_DOG = "UPDATE_DOG";
export const POST_BREAK = "POST_BREAK";
export const ADD_USER = "ADD_USER";
export const ADD_COMPANY = "ADD_COMPANY";
export const GET_USER = "GET_USER";
export const VERIFICATION_COMPANY_EXISTS = "VERIFICATION_COMPANY_EXISTS";
export const FUNCTION_COMPANY_SELECTED = "FUNCTION_COMPANY_SELECTED";
export const SEARCH_USER = "SEARCH_USER";
export const RESET_COMPANY_SELECTED = "RESET_COMPANY_SELECTED";
export const RESET_ALL_CLIENTS = "RESET_ALL_CLIENTS";


export const setUser = (user) => ({
  type: GET_USER,
  payload: user,
});


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

export function addTurnos(payload) {
  console.log(payload, "action");
  return async function (dispatch) {
    try {
      const newTurno = await axios.post(
        //"http://localhost:3002/api/turno",
        `${host}/api/turno`,
        payload
      );
      return newTurno;
    } catch (error) {
      console.log(error);
    }
  };
}

export const resetCompanySelected = () => ({

  type: RESET_COMPANY_SELECTED,
});

export const resetAllClients = () => ({
  
  type: RESET_ALL_CLIENTS,
});

export function searchUser(email) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${host}/api/searchUser/${email}`
      );
      dispatch({
        payload: response,
        type: SEARCH_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addBreak(payload) {
  console.log(payload, "action");
  return async function (dispatch) {
    try {
      const newBreak = await axios.post(
        `${host}/api/addBreak`,
        payload
      );
      return newBreak;
    } catch (error) {
      console.log(error);
    }
  };
}

//funciona
export function addDog(payload, idClient) {
  console.log(payload, "action");
  // console.log(id,"action")
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

export function addCompany(payload) {
  
  return async function (dispatch) {
    try {
      const newCompany = await axios.post(
        //`http://localhost:3002/api/addPerro/${idClient}`,
        `${host}/api/addCompany`,
        payload
      );
      return newCompany;
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderTurnos(payload) {
  //console.log(payload, "actions");
  return {
    type: ORDER_TURNOS,
    payload,
  };
}


//funciona
export function addClient(payload) {
  console.log("action", payload);
  return async function (dispatch) {
    try {
      const newClient = await axios.post(
        //"http://localhost:3002/api/client",
        `${host}/api/client`,
        payload
      );
      return newClient;
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderContacts(payload) {
  return {
    type: ORDER_CONTACTS,
    payload,
  };
}

//getTurnos trae el listado de turno
export function getTurnos(idCompany) {
  return async function (dispatch) {
    const listTurnos = await axios.get(
      `${host}/api/getTurnos/${idCompany}`,
      //`http://localhost:3002/api/getTurnos/${idCompany}`,
      //"http://localhost:3002/api/getTurnos",
      //"https://peluqueriapichichu.onrender.com/api/getTurnos",
      {}
    );
    // con esto me doy cuenta si el request desde el actions se esta ejecutando correctamente
    // console.log(listTurnos,"resultado listado turnos")
    return dispatch({
      type: GET_TURNOS,
      payload: listTurnos.data.turnos,
    });
  };
}

//funciona bien
export function getClients(idCompany) {

  return async function (dispatch) {
    const listCli = await axios.get(
      //"http://localhost:3002/api/listClients",
      //`${host.development}/api/listClientsCompany/66465ac8c1212f4dc0088087`,
      `${host}/api/listClientsCompany/${idCompany}`,
      {}
    );
    return dispatch({
      type: GET_CLIENTS,
      payload: listCli.data.clientes,
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
export function verificationCompaniesExist(email) {
  return async function (dispatch) {
    const arrayCompanies = await axios.get(
      `${host}/api/validationCompanyExist/${email}`
    );

    return dispatch({
      type: VERIFICATION_COMPANY_EXISTS,
      payload: arrayCompanies,
    });
  };
}




//funciona bien
export function searchHistorialDog(payload) {
  //console.log(payload)
  //628ae8c5d66d1f4760a023be del perro seleccionado
  return async function (dispatch) {
    const vtaxClient = await axios.get(
      //`http://localhost:3002/api/ventaCli/${payload}`
      `${host}/api/ventaCli/${payload}`
    );
    console.log(vtaxClient, "resultado");
    return dispatch({
      type: SEARCH_VTA_CLIENT,
      payload: vtaxClient,
    });
  };
}

export function get_clients_id(id_cli) {
  // console.log(id_cli,"ID  a buscar")
  return async function (dispatch) {
    try {
      // const detail=await axios.get("/api/listVentas/"+id_vta)
      const cliBusc = await axios.get(
        `${host}/api/listClients/${id_cli}`
      );
      // console.log(detail,"resultado request en actions")
      return dispatch({
        type: GET_CLIENTS_ID,
        payload: cliBusc.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//al eliminar cliente no se refresca la pagina
export function deleteClient(clientId) {
  // console.log(clientId,"actions")
  return async function (dispatch) {
    await axios.delete(
      //`http://localhost:3002/api/deleteClient/${clientId}`
      `${host}/api/deleteClient/${clientId}`
    );
    return dispatch({
      type: DELETE_CLIENT,
    });
  };
}

//funciona bien
export function deleteDog(idDog) {
  return async function (dispatch) {
    await axios.put(
      //`http://localhost:3002/api/deleteDog/${idDog}`
      `${host}/api/deleteDog/${idDog}`
    );
    return dispatch({
      type: DELETE_DOG,
    });
  };
}

//funciona bien pero no se refresca la pagina

export function deleteTurno(turnoId) {
  console.log(turnoId, "actions");
  return async function (dispatch) {
    await axios.delete(
      //`http://localhost:3002/api/deleteTurno/${turnoId}`
      `${host}/api/deleteTurno/${turnoId}`
    );
    return dispatch({
      type: DELETE_TURNO,
    });
  };
}



//funciona bien
export function updateClient(payload, idElement) {
  // console.log("action", payload)
  // console.log("action", idElement)
  return async function (dispatch) {
    await axios.put(
      //`http://localhost:3002/api/editClient/${idElement}`,
      `${host}/api/editClient/${idElement}`,
      payload
    );
    // await axios.get("http://localhost:3002/api/listClients").then((data) => {
    //   return dispatch({
    //     type:UPDATE_CLIENT,
    //     payload:data.data.payload
    //   });
    // });
    return dispatch({
      type: UPDATE_CLIENT,
    });
  };
}

export function updateTurno(payload, idElement) {

  console.log("action", payload)
  return async function (dispatch) {
    await axios.put(
      //`http://localhost:3002/api/editTurno/${idElement}`,
      `${host}/api/editTurno/${idElement}`,
      payload
    );
    // await axios.get("http://localhost:3002/api/listClients").then((data) => {
    //   return dispatch({
    //     type:UPDATE_CLIENT,
    //     payload:data.data.payload
    //   });
    // });
    return dispatch({
      type: UPDATE_TURNO,
    });
  };
}

//se edita pero no se guardan los cambios de select
export function updateDog(payload, idDog) {
  console.log("action", payload);
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

export function getNameClients(payload) {
  return {
    type: "GET_NAME_CLIENTS",
    payload,
  };
}

export function functionCompanySelected(payload) {

  return {
    type: FUNCTION_COMPANY_SELECTED,
    payload,
  };
}
