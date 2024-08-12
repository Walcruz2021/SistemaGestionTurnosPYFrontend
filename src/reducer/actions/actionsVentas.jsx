export const VTA_X_ANIO = "VTA_X_ANIO";
export const VTAS_MES_ANIO_PARAMS = "VTAS_MES_ANIO_PARAMS";
export const VTAS_ANIO_MES_NOW = "VTAS_ANIO_MES_NOW";
export const GET_VENTAS_ID = "GET_VENTAS_ID";
export const GET_VENTAS = "GET_VENTAS";
export const ORDER_VENTAS = "ORDER_VENTAS";
export const DELETE_DOG = "DELETE_DOG";
export const RESET_VENTASxANIOandPARAM="RESET_VENTASxANIOandPARAM"
import axios from 'axios';
import host from "../../components/ruteBack/vbledeploy";

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
  //Company:idCompany
  //idDog:"444444"
  // ----> id_client
  return async function (dispatch) {
    try {
      const newVentas = await axios.post(
        // "http://localhost:3002/api/addVentas",
        //`http://localhost:3002/api/addVentas/${id_client}`,
        `${host}/api/addVentas/${id_client}`,
        payload
      );
      await axios
        .delete(
          //`http://localhost:3002/api/deleteTurno/${payload.idTurno}`
          `${host}/api/deleteTurno/${payload.idTurno}`
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

export function vtasxA(idCompany, anio) {
  return async function (dispatch) {
    try {
      const detail = await axios.get(
        //`http://localhost:3002/api/ventasxAnio/${anio}`
        `${host}/api/ventasxAnio/${idCompany}`,
        {
          params: {
            anio: anio,
          },
        }
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

export function vtasMesandAnioxParam(idCompany, date) {
  return async function (dispatch) {
    const vtas = await axios.get(
      `${host}/api/vtasxAnioandMesParam/${idCompany}`,
      {
        params: {
          date: date,
        },
      }
    );
    return dispatch({
      type: VTAS_MES_ANIO_PARAMS,
      payload: vtas.data, // use vtas.data to get the actual response data
    });
  };
}

//funciona bien
export function vtasAnioMesNow(idCompany) {
  //console.log(idCompany);
  return async function (dispatch) {
    const vtas = await axios.get(
      //"http://localhost:3002/api/vtasxAnioandMesNow",
      `${host}/api/vtasxAnioandMesNow/${idCompany}`,
      {}
    );
    return dispatch({
      type: VTAS_ANIO_MES_NOW,
      payload: vtas.data.vtas,
    });
  };
}

export function get_ventas_id(id_vta) {
  return async function (dispatch) {
    try {
      // const detail=await axios.get("/api/listVentas/"+id_vta)
      const detail = await axios.get(
        //`http://localhost:3002/api/listVentas/${id_vta}`
        `${host}/api/listVentas/${id_vta}`
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

export function getVentas(payload) {
  return async function (dispatch) {
    const listVentas = await axios.get(
      //"http://localhost:3002/api/listVentas",
      `${host}/api/listVentas`,
      {}
    );
    return dispatch({
      type: GET_VENTAS,
      payload: listVentas.data.ventas,
    });
  };
}

export function orderVentas(payload) {
  return {
    type: ORDER_VENTAS,
    payload,
  };
}

export const resetVentasXanioandMesParam = () => ({
  type: RESET_VENTASxANIOandPARAM,
});
