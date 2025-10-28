import {
    GTO_X_ANIO,
    ADD_GASTOS,
    RESET_GASTOSxANIOandPARAM,
    GTOS_MES_ANIO_PARAMS,
    GTOS_ANIO_MES_NOW,
    ORDER_GASTOS_MONTH_NOW,
    ORDER_GASTOS_MONTHANIO_PARAM,
} from "../actions/actionsGastos";

const initialState = {
    gtosxAnio: [],
    gastosXanioandMesNow: [],
    gastosXanioandMesParam: [],
};


export default function billsReducer(state = initialState, action) {
    switch (action.type) {

        case GTOS_ANIO_MES_NOW:
            return {
                ...state,
                gastosXanioandMesNow: action.payload,
            };

        case GTOS_MES_ANIO_PARAMS:
            return {
                ...state,
                gastosXanioandMesParam: action.payload,
            };

        case GTO_X_ANIO:
            return {
                ...state,
                gtosxAnio: action.payload,
            };


        case ORDER_GASTOS_MONTH_NOW:
            const listOrderG = state.gastosXanioandMesNow;

            const arrayOrderG =
                action.payload === true
                    ? listOrderG.sort(function (a, b) {
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
                    listOrderG.sort(function (a, b) {
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
                gastosXanioandMesNow: arrayOrderG,
            };

        case ADD_GASTOS:
            return {
                ...state,
            };

        case RESET_GASTOSxANIOandPARAM:
            return {
                ...state,
                gastosXanioandMesParam: null,
            };

        default:
            return state;
    }
}