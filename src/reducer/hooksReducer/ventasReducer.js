import {
    VTA_X_ANIO,
    VTAS_MES_ANIO_PARAMS,
    VTAS_ANIO_MES_NOW,
    GET_VENTAS_ID,
    GET_VENTAS,
    ORDER_VENTAS,
    RESET_VENTASxANIOandPARAM,
    ORDER_VENTAS_MONTH_NOW,
    ORDER_VENTAS_MONTHANIO_PARAM,
    PREDICTIONS_SALES_X_ANIO,
    GET_RANKING_VTAS_CLIENT
} from "../actions/actionsVentas";

const initialState = {
    rankingVtasByClient: []
};


export default function ventasReducer(state = initialState, action) {
    switch (action.type) {

        case GET_RANKING_VTAS_CLIENT:
            return {
                ...state,
                rankingVtasByClient: action.payload,
            };

        default:
            return state;
    }
}