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
    PREDICTIONS_SALES_ByCLIENT_IN_CANT,
    GET_RANKING_VTAS_CLIENT,
    SEARCH_VTA_CLIENT,
    GET_RANKING_VTAS_CLIENT_DETAILS,
    LAST_VALUES
} from "../actions/actionsVentas";

const initialState = {
    rankingVtasByClient: [],
    allVentas: [],
    ventaBusc: [],
    vtasxAnio: [],
    vtasxAnioandMesNow: [],
    vtasxAnioandMesParam: [],
    dataPrediction: [],
    dataPredictioninCant: [],
    rankingVtasByClientDetails: [],
    lastValues: null,
};


export default function salesReducer(state = initialState, action) {
    switch (action.type) {

        case GET_VENTAS:
            return {
                ...state,
                allVentas: action.payload,
            };

        case GET_VENTAS_ID:
            return {
                ...state,
                ventaBusc: action.payload,
            };

        case VTAS_ANIO_MES_NOW:
            return {
                ...state,
                vtasxAnioandMesNow: action.payload,
            };

        case VTAS_MES_ANIO_PARAMS:
            return {
                ...state,
                vtasxAnioandMesParam: action.payload,
            };

        case VTA_X_ANIO:
            return {
                ...state,
                vtasxAnio: action.payload,
            };



        case GET_RANKING_VTAS_CLIENT:
            return {
                ...state,
                rankingVtasByClient: action.payload,
            };



        case ORDER_VENTAS_MONTHANIO_PARAM:
            const listOrderVAP = state.vtasxAnioandMesParam;

            const arrayOrderVAP =
                action.payload === true
                    ? listOrderVAP.sort(function (a, b) {
                        const aux1 = a.date.toLocaleLowerCase();
                        const aux2 = b.date.toLocaleLowerCase();
                        if (aux1 > aux2) {
                            return 1;
                        }
                        if (aux2 > aux1) {
                            return -1;
                        } else return 0;
                    })
                    : // descendente
                    listOrderVAP.sort(function (a, b) {
                        const aux1a = a.date.toLocaleLowerCase();
                        const aux2b = b.date.toLocaleLowerCase();
                        if (aux1a > aux2b) {
                            return -1;
                        }
                        if (aux2b > aux1a) {
                            return 1;
                        } else return 0;
                    });

            return {
                ...state,
                vtasxAnioandMesParam: arrayOrderVAP,
            };


            const listOrderG2 = state.gastosXanioandMesParam;

            const arrayOrderG2 =
                action.payload === true
                    ? listOrderG2.sort(function (a, b) {
                        const aux1 = a.date.toLocaleLowerCase();
                        const aux2 = b.date.toLocaleLowerCase();
                        if (aux1 > aux2) {
                            return 1;
                        }
                        if (aux2 > aux1) {
                            return -1;
                        } else return 0;
                    })
                    : // descendente
                    listOrderG2.sort(function (a, b) {
                        const aux1a = a.date.toLocaleLowerCase();
                        const aux2b = b.date.toLocaleLowerCase();
                        if (aux1a > aux2b) {
                            return -1;
                        }
                        if (aux2b > aux1a) {
                            return 1;
                        } else return 0;
                    });

            return {
                ...state,
                gastosXanioandMesParam: arrayOrderG2,
            };

        case RESET_VENTASxANIOandPARAM:
            return {
                ...state,
                vtasxAnioandMesParam: null,
            };


        case ORDER_VENTAS_MONTH_NOW:
            const listOrderVMN = state.vtasxAnioandMesNow;
            //console.log(listOrderVMN)
            const arrayOrderVMN =
                action.payload === true
                    ? listOrderVMN.sort(function (a, b) {
                        const aux1 = a.date.toLocaleLowerCase();
                        const aux2 = b.date.toLocaleLowerCase();
                        if (aux1 > aux2) {
                            return 1;
                        }
                        if (aux2 > aux1) {
                            return -1;
                        } else return 0;
                    })
                    : // descendente
                    listOrderVMN.sort(function (a, b) {
                        const aux1a = a.date.toLocaleLowerCase();
                        const aux2b = b.date.toLocaleLowerCase();
                        if (aux1a > aux2b) {
                            return -1;
                        }
                        if (aux2b > aux1a) {
                            return 1;
                        } else return 0;
                    });

            return {
                ...state,
                vtasxAnioandMesNow: arrayOrderVMN,
            };

        case PREDICTIONS_SALES_X_ANIO:
            return {
                ...state,
                dataPrediction: action.payload.prediction,
            };

        case PREDICTIONS_SALES_ByCLIENT_IN_CANT:
            return {
                ...state,
                dataPredictioninCant: action.payload.prediction,
            };



        case GET_RANKING_VTAS_CLIENT:
            return {
                ...state,
                rankingVtasByClient: action.payload,
            };


        case GET_RANKING_VTAS_CLIENT_DETAILS:
            return {
                ...state,
                rankingVtasByClientDetails: action.payload,
            };


        case LAST_VALUES:

            return {
                ...state,
                lastValues: action.payload,
            };
        default:
            return state;
    }
}