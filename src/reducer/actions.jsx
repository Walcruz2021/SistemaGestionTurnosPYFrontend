import axios from "axios";
import host from "../components/ruteBack/vbledeploy";
import { auth } from "../hooks/configFirebase";
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
export const ORDER_VENTAS = "ORDER_VENTAS";
export const ASIGNED_VENTAS = "ASIGNED_VENTAS";
export const GET_VENTAS = "GET_VENTAS";
export const GET_VENTAS_ID = "GET_VENTAS_ID";
export const GET_CLIENTS_ID = "GET_CLIENTS_ID";
export const ADD_DOG = "ADD_DOG";
export const SEARCH_VTA_CLIENT = "SEARCH_VTA_CLIENT";
export const VTA_X_ANIO = "VTA_X_ANIO";
export const VTAS_ANIO_MES_NOW = "VTAS_ANIO_MES_NOW";
export const VTAS_MES_ANIO_PARAMS = "VTAS_MES_ANIO_PARAMS";
export const DELETE_DOG = "DELETE_DOG";
export const UPDATE_DOG = "UPDATE_DOG";
export const POST_BREAK = "POST_BREAK";
export const ADD_USER = "ADD_USER";
export const ADD_COMPANY = "ADD_COMPANY";
export const GET_USER = "GET_USER";
export const VERIFICATION_COMPANY_EXISTS = "VERIFICATION_COMPANY_EXISTS";
export const FUNCTION_COMPANY_SELECTED="FUNCTION_COMPANY_SELECTED"


console.log(host.development, "action------------>");

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
        `${host.development}/api/turno`,
        payload
      );
      return newTurno;
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
        `${host.development}/api/addBreak`,
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
        `${host.development}/api/addPerro/${idClient}`,
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
        `${host.development}/api/addUser`,
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
        `${host.development}/api/addCompany`,
        payload
      );
      return newCompany;
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderTurnos(payload) {
  console.log(payload, "actions");
  return {
    type: ORDER_TURNOS,
    payload,
  };
}

export function orderVentas(payload) {
  return {
    type: ORDER_VENTAS,
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
        `${host.development}/api/client`,
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
      `${host.development}/api/getTurnos/${idCompany}`,
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
  console.log(idCompany,"action")
  return async function (dispatch) {
    const listCli = await axios.get(
      //"http://localhost:3002/api/listClients",
      //`${host.development}/api/listClientsCompany/66465ac8c1212f4dc0088087`,
      `${host.development}/api/listClientsCompany/${idCompany}`,
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

export function getVentas(payload) {
  return async function (dispatch) {
    const listVentas = await axios.get(
      //"http://localhost:3002/api/listVentas",
      `${host.development}/api/listVentas`,
      {}
    );
    return dispatch({
      type: GET_VENTAS,
      payload: listVentas.data.ventas,
    });
  };
}

export function verificationCompaniesExist(email) {
  console.log(email);
  return async function (dispatch) {
    const arrayCompanies = await axios.get(
      `${host.development}/api/validationCompanyExist/${email}`
    );

    return dispatch({
      type: VERIFICATION_COMPANY_EXISTS,
      payload: arrayCompanies,
    });
  };
}

export function get_ventas_id(id_vta) {
  return async function (dispatch) {
    try {
      // const detail=await axios.get("/api/listVentas/"+id_vta)
      const detail = await axios.get(
        //`http://localhost:3002/api/listVentas/${id_vta}`
        `${host.development}/api/listVentas/${id_vta}`
      );
      // console.log(detail,"resultado request en actions")
      return dispatch({
        type: GET_VENTAS_ID,
        payload: detail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//funciona bien
export function vtasAnioMesNow() {
  return async function (dispatch) {
    const vtas = await axios.get(
      //"http://localhost:3002/api/vtasxAnioandMesNow",
      `${host.development}/api/vtasxAnioandMesNow`,
      {}
    );
    return dispatch({
      type: VTAS_ANIO_MES_NOW,
      payload: vtas.data.vtas,
    });
  };
}

//funciona bien
export function vtasMesandAnioxParam(dateFormat) {
  //console.log(dateFormat) 20225
  return async function (dispatch) {
    const vtas = await axios.get(
      //`http://localhost:3002/api/vtasxAnioandMesParam/${dateFormat}`
      `${host.development}/api/vtasxAnioandMesParam/${dateFormat}`
    );
    return dispatch({
      type: VTAS_MES_ANIO_PARAMS,
      payload: vtas,
    });
  };
}

//no funciona
export function vtasxA(anio) {
  return async function (dispatch) {
    try {
      const detail = await axios.get(
        //`http://localhost:3002/api/ventasxAnio/${anio}`
        `${host.development}/api/ventasxAnio/${anio}`
      );
      // console.log(detail,"resultado request en actions")
      return dispatch({
        type: VTA_X_ANIO,
        payload: detail.data.ventas,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//funciona bien
export function searchHistorialDog(payload) {
  //console.log(payload)
  //628ae8c5d66d1f4760a023be del perro seleccionado
  return async function (dispatch) {
    const vtaxClient = await axios.get(
      //`http://localhost:3002/api/ventaCli/${payload}`
      `${host.development}/api/ventaCli/${payload}`
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
        `http://localhost:3002/api/listClients/${id_cli}`
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
      `${host.development}/api/deleteClient/${clientId}`
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
      `${host.development}/api/deleteDog/${idDog}`
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
      `${host.development}/api/deleteTurno/${turnoId}`
    );
    return dispatch({
      type: DELETE_TURNO,
    });
  };
}

//no esta eliminando el turno al ingresar la venta
export function asignedVentas(payload, id_client) {

  console.log(payload, "actions");
  // date: "2022-05-30"
  // mes:04
  // año:2022
  // idTurno: "6282929c4ef1e8473854f09b" (idTurno)
  // name: "omar cruz"
  // nameDog: "ramonsito"
  // notesTurn: "es grande y viejo"
  // tipoServ: "caminito"
  // valorServ: "231"
  // ----> id_client
  return async function (dispatch) {
    try {
      const newVentas = await axios.post(
        // "http://localhost:3002/api/addVentas",
        //`http://localhost:3002/api/addVentas/${id_client}`,
        `${host.development}/api/addVentas/${id_client}`,
        payload
      );
      await axios
        .delete(
          //`http://localhost:3002/api/deleteTurno/${payload.idTurno}`
          `${host.development}/api/deleteTurno/${payload.idTurno}`
        )
        .then((data) => {
          return dispatch({
            type: DELETE_TURNO,
          });
        });
      return newVentas;
    } catch (error) {
      console.log(error);
    }
  };
}

//funciona bien
export function updateClient(payload, idElement) {
  // console.log("action", payload)
  // console.log("action", idElement)
  return async function (dispatch) {
    await axios.put(
      //`http://localhost:3002/api/editClient/${idElement}`,
      `${host.development}/api/editClient/${idElement}`,
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
  console.log("action", payload);
  // console.log("action", idElement)id del turno
  return async function (dispatch) {
    await axios.put(
      //`http://localhost:3002/api/editTurno/${idElement}`,
      `${host.development}/api/editTurno/${idElement}`,
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
      `${host.development}/api/editDog/${idDog}`,
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
  console.log(payload,"actions")
  return {
    type:FUNCTION_COMPANY_SELECTED,
    payload
  };
}
