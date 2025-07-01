import axios from "axios";
import host from "../../components/ruteBack/vbledeploy";

export const ADD_GASTOS = "ADD_GASTOS";
export const RESET_GASTOSxANIOandPARAM = "RESET_GASTOSxANIOandPARAM";
export const GTOS_MES_ANIO_PARAMS = "GTOS_MES_ANIO_PARAMS";
export const ORDER_GASTOS_MONTHANIO_PARAM = "ORDER_GASTOS_MONTHANIO_PARAM";
export const GTOS_ANIO_MES_NOW = "GTOS_ANIO_MES_NOW";
export const ORDER_GASTOS_MONTH_NOW = "ORDER_GASTOS_MONTH_NOW";
export const GTO_X_ANIO = "GTO_X_ANIO";

/**
 * Function Insert Direct Costs
 * @param {String} payload Object with date, category,value,.... etc
 * date: newStateInput.date,
     año,
    date,
    description,
    efectivo,
    transferencia,
    tarjeta,
    categoryGasto,
    value,
    mes,
    typeGasto,
    idCompany
 * @param {*} idCompany
 * @returns
 */

export function addGastos(payload) {
  return async function (dispatch) {
    await axios.post(`${host}/api/addGastos`, payload);
    return dispatch({
      type: ADD_GASTOS,
    });
  };
}

export function gtosXanio(idCompany, anio) {
  return async function (dispatch) {
    try {
      const detail = await axios.get(
        //`http://localhost:3002/api/ventasxAnio/${anio}`
        `${host}/api/gtosXanio/${idCompany}`,
        {
          params: {
            anio: anio,
          },
        }
      );
      // console.log(detail,"resultado request en actions")
      return dispatch({
        type: GTO_X_ANIO,
        payload: detail.data.gastos,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const resetGastosXanioandMesParam = () => ({
  type: RESET_GASTOSxANIOandPARAM,
});

/**
 *
 * @param {*} idCompany
 * @param {*} date
 * @returns expenses accodrding to seleted date
 */
export function gastosXanioandMesParam(idCompany, date) {

  return async function (dispatch) {
    const gtos = await axios.get(
      `${host}/api/gastosXanioandMesParam/${idCompany}`,
      {
        params: {
          date: date,
        },
      }
    );
    return dispatch({
      type: GTOS_MES_ANIO_PARAMS,
      payload: gtos.data.gtos, // use gtos.data to get the actual response data
    });
  };
}

export function gastosXanioandMesNow(idCompany) {

  return async function (dispatch) {
    const gtos = await axios.get(
      //"http://localhost:3002/api/vtasxAnioandMesNow",
      `${host}/api/gastosXanioandMesNow/${idCompany}`,
      {}
    );
    return dispatch({
      type: GTOS_ANIO_MES_NOW,
      payload: gtos.data.gastos,
    });
  };
}

export function orderGastosMonthNow(payload) {
  return {
    type: ORDER_GASTOS_MONTH_NOW,
    payload,
  };
}

export function orderGastosXanioandMesParam(payload) {
  return {
    type: ORDER_GASTOS_MONTHANIO_PARAM,
    payload,
  };
}