export const VTA_X_ANIO = "VTA_X_ANIO";
export const VTAS_MES_ANIO_PARAMS = "VTAS_MES_ANIO_PARAMS";
export const VTAS_ANIO_MES_NOW = "VTAS_ANIO_MES_NOW";
export const GET_VENTAS_ID = "GET_VENTAS_ID";
export const GET_VENTAS = "GET_VENTAS";
export const ORDER_VENTAS = "ORDER_VENTAS";
export const DELETE_DOG = "DELETE_DOG";
export const ORDER_VENTAS_MONTH_NOW = "ORDER_VENTAS_MONTH_NOW"
export const ORDER_VENTAS_MONTHANIO_PARAM = "ORDER_VENTAS_MONTHANIO_PARAM"
export const RESET_VENTASxANIOandPARAM = "RESET_VENTASxANIOandPARAM";
export const DELETE_TURNO = "DELETE_TURNO";
export const PREDICTIONS_SALES_X_ANIO = "PREDICTIONS_SALES_X_ANIO"
export const PREDICTIONS_SALES_ByCLIENT_IN_CANT="PREDICTIONS_SALES_ByCLIENT_IN_CAN"
export const GET_RANKING_VTAS_CLIENT="GET_RANKING_VTAS_CLIENT"
export const GET_RANKING_VTAS_CLIENT_DETAILS="GET_RANKING_VTAS_CLIENT_DETAILS"
export const LAST_VALUES="LAST_VALUES"
import axios from "axios";
import host from "../../components/ruteBack/vbledeploy";

//no esta eliminando el turno al ingresar la venta
export function asignedVentas(payload, id_client) {
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
  //receta:xxx,
  // tratamiento:xxx,
  //vacunas:ccc,
  //peso:25
  return async function (dispatch) {
    try {
      const newVentas = await axios.post(
        // "http://localhost:3002/api/addVentas",
        //`http://localhost:3002/api/addVentas/${id_client}`,
        `${host}/api/addVentas/${id_client}`,
        payload
      );

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
        }
      }
    );

    return dispatch({
      type: VTAS_MES_ANIO_PARAMS,
      payload: vtas.data.vtas, // use vtas.data to get the actual response data
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

export function orderVentasMonthNow(payload) {
  return {
    type: ORDER_VENTAS_MONTH_NOW,
    payload,
  };
}

export function orderVentasMonthAnioXParam(payload) {
  return {
    type: ORDER_VENTAS_MONTHANIO_PARAM,
    payload,
  };
}

export const resetVentasXanioandMesParam = () => ({
  type: RESET_VENTASxANIOandPARAM,
});

export function lastValues(payload) {
  return {
    type: LAST_VALUES,
    payload,
  };
}


export function predictionsSalesxAnio(dataVtas) {

  return async function (dispatch) {
    try {

      const numberPrediction = await axios.get(
        //"http://localhost:3002/api/listVentas",
        `${host}/api/prediccionVtasMensual`,
        {
          params: {
            data: dataVtas,
          }
        }
      );

      return dispatch({
        type: PREDICTIONS_SALES_X_ANIO,
        payload: numberPrediction.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}


//[43600, 35000, 27000, 15000, 13000] recibe las ultimas 5 ventas
//retorna 5 predicciones en base al array de las ultimas 5 ventas mensuales del cliente
export function predictionsSalesByClientInCant(dataVtas) {

  return async function (dispatch) {
    try {

      const numberPrediction = await axios.get(
        //"http://localhost:3002/api/listVentas",
        `${host}/api/prediccionVtasMensualInCant`,
        {
          params: {
            data: dataVtas,
          }
        }
      );

      return dispatch({
        type: PREDICTIONS_SALES_ByCLIENT_IN_CANT,
        payload: numberPrediction.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}



export function rankingVentasByClient(idCompany) {
  return async function (dispatch) {
    const listVentas = await axios.get(
      //"http://localhost:3002/api/listVentas",
      `${host}/api/rankingVtasByClients/${idCompany}`,
      {}
    );

    return dispatch({
      type: GET_RANKING_VTAS_CLIENT,
      payload: listVentas.data.ranking,
    });
  };
}

export function rankingVentasByClientDetails(idCompany) {
  return async function (dispatch) {
    const listVentas = await axios.get(
      //"http://localhost:3002/api/listVentas",
      `${host}/api/rankingVtasDetailsByClients/${idCompany}`,
      {}
    );

    return dispatch({
      type: GET_RANKING_VTAS_CLIENT_DETAILS,
      payload: listVentas.data.ranking,
    });
  };
}