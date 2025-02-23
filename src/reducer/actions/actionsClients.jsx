import axios from "axios";
import host from "../../components/ruteBack/vbledeploy";

export const GET_CLIENTS = "GET_CLIENTS";
export const DELETE_CLIENT = "DELETE_CLIENT";
export const GET_NAME_CLIENTS = "GET_NAME_CLIENTS";
export const GET_CLIENTS_ID = "GET_CLIENTS_ID";
export const RESET_ALL_CLIENTS = "RESET_ALL_CLIENTS";
export const UPDATE_CLIENT= "UPDATE_CLIENT"

export function getNameClients(payload) {
  return {
    type: "GET_NAME_CLIENTS",
    payload,
  };
}

export const resetAllClients = () => ({
    type: RESET_ALL_CLIENTS,
  });
//funciona
export function addClient(payload) {

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

export function get_clients_id(id_cli) {
    // console.log(id_cli,"ID  a buscar")
    return async function (dispatch) {
      try {
        // const detail=await axios.get("/api/listVentas/"+id_vta)
        const cliBusc = await axios.get(`${host}/api/listClients/${id_cli}`);
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