import { bindActionCreators } from "redux";
import {
  ADD_TODO,
  GET_TURNOS,
  GET_CLIENTXNAME,
  GET_CLIENTS,
  GET_NAME_CLIENTS,
  DELETE_CLIENT,
  DELETE_TURNO,
  UPDATE_CLIENT,
  UPDATE_TURNO,
  ORDER_TURNOS,
  ASIGNED_VENTAS,
  GET_CLIENTS_ID,
  SEARCH_VTA_CLIENT,
  ADD_DOG,
  DELETE_DOG,
  UPDATE_DOG,
  POST_BREAK,
  ADD_USER,
  ADD_COMPANY,
  GET_USER,
  VERIFICATION_COMPANY_EXISTS,
  FUNCTION_COMPANY_SELECTED,
  SEARCH_USER,
  RESET_COMPANY_SELECTED,
  RESET_ALL_CLIENTS,
} from "./actions/actions";

import {
  GTO_X_ANIO,
  ADD_GASTOS,
  RESET_GASTOSxANIOandPARAM,
  GTOS_MES_ANIO_PARAMS,
  GTOS_ANIO_MES_NOW,
  ORDER_GASTOS,
} from "./actions/actionsGastos";

import {
  VTA_X_ANIO,
  VTAS_MES_ANIO_PARAMS,
  VTAS_ANIO_MES_NOW,
  GET_VENTAS_ID,
  GET_VENTAS,
  ORDER_VENTAS,
  RESET_VENTASxANIOandPARAM,
} from "./actions/actionsVentas";

const initialState = {
  allTurnos: [],
  allClients: [],
  allVentas: [],
  allGastos: [],
  categoriesClients: [],
  clientBusc: [],
  ventaBusc: [],
  vtaxClient: [],
  vtasxAnio: [],
  gtosxAnio: [],
  vtasxAnioandMesNow: [],
  vtasxAnioandMesParam: [],
  gastosXanioandMesNow: [],
  gastosXanioandMesParam: [],
  arrayCompanies: [],
  user: null,
  companySelected: null,
  userEmailSearch: null,
};

function rootReducer(state = initialState, action) {
  // el action  es la respuesta que llega del archivo actions
  // si trae valos quiere decir que actions realizo la request como corresponde
  //console.log(action.payload, "reducer (valores del actions)");
  // imprmiira esto de abajao,dependiendo de la accion que se haya elegido
  // Object { type: "GET_RECIPE", payload: (13) […] }
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SEARCH_USER:
      return {
        ...state,
        userEmailSearch: action.payload,
      };
  
    case GET_TURNOS:
      return {
        ...state,
        allTurnos: action.payload,
        copyAllTurnos: action.payload,
      };

    case GET_CLIENTS:
      return {
        ...state,
        allClients: action.payload,
      };

    case GET_VENTAS:
      return {
        ...state,
        allVentas: action.payload,
      };

    case VERIFICATION_COMPANY_EXISTS:
      return {
        ...state,
        arrayCompanies: action.payload,
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

    case VTA_X_ANIO:
      return {
        ...state,
        vtasxAnio: action.payload,
      };

    case GTO_X_ANIO:
      return {
        ...state,
        gtosxAnio: action.payload,
      };

    case GET_CLIENTS_ID:
      return {
        ...state,
        clientBusc: action.payload,
      };

    case DELETE_CLIENT:
      return {
        ...state,
      };

    case DELETE_DOG:
      return {
        ...state,
      };

    case DELETE_TURNO:
      return {
        ...state,
      };

    case "POST_TURNOS":
      return {
        ...state,
      };

    case POST_BREAK:
      return {
        ...state,
      };

    case ADD_DOG:
      return {
        ...state,
      };

    case ADD_USER:
      return {
        ...state,
      };

    case ADD_COMPANY:
      return {
        ...state,
      };

    case "POST_CLIENT":
      return {
        ...state,
      };

    case ASIGNED_VENTAS:
      return {
        ...state,
      };

    case UPDATE_CLIENT:
      return {
        ...state,
        allClients: action.payload,
      };

    case UPDATE_TURNO:
      return {
        ...state,
        allTurnos: action.payload,
      };

    case UPDATE_DOG:
      return {
        ...state,
        allClients: action.payload,
      };

    case ORDER_TURNOS:
      const listOrder = state.allTurnos;
      const arrayOrder =
        action.payload === true
          ? listOrder.sort(function (a, b) {
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
            listOrder.sort(function (a, b) {
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
        allTurnos: arrayOrder,
      };

    case ORDER_VENTAS:
      const listOrderV = state.allVentas;
      const arrayOrderV =
        action.payload === true
          ? listOrderV.sort(function (a, b) {
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
            listOrderV.sort(function (a, b) {
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
        allVentas: arrayOrderV,
      };

    case ORDER_GASTOS:
      const listOrderG = state.allGastos;
      const arrayOrderG =
        action.payload === true
          ? listOrderV.sort(function (a, b) {
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
        allGastos: arrayOrderG,
      };

    case SEARCH_VTA_CLIENT:
      return {
        ...state,
        vtaxClient: action.payload,
      };

    case FUNCTION_COMPANY_SELECTED:
      return {
        ...state,
        companySelected: action.payload,
      };

    case ADD_GASTOS:
      return {
        ...state,
      };

    case RESET_COMPANY_SELECTED:
      
      return {
        ...state,
        companySelected: null,
        arrayCompanies:[]
      };

    case RESET_ALL_CLIENTS:
      return {
        ...state,
        allClients: null,
      };

    case RESET_GASTOSxANIOandPARAM:
      return {
        ...state,
        gastosXanioandMesParam: null,
      };

    case RESET_VENTASxANIOandPARAM:
      return {
        ...state,
        vtasxAnioandMesParam: null,
      };
    default:
      return state;
  }
}

export default rootReducer;
