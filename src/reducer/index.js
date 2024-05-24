import { bindActionCreators } from "redux";
import {
  ADD_TODO,
  GET_TURNOS,
  GET_CLIENTXNAME,
  GET_CLIENTS,
  GET_NAME_CLIENTS,
  GET_VENTAS,
  DELETE_CLIENT,
  DELETE_TURNO,
  UPDATE_CLIENT,
  UPDATE_TURNO,
  ORDER_TURNOS,
  ORDER_VENTAS,
  ASIGNED_VENTAS,
  GET_VENTAS_ID,
  GET_CLIENTS_ID,
  SEARCH_VTA_CLIENT,
  VTA_X_ANIO,
  ADD_DOG,
  VTAS_ANIO_MES_NOW,
  VTAS_MES_ANIO_PARAMS,
  DELETE_DOG,
  UPDATE_DOG,
  POST_BREAK,
  ADD_USER,
  ADD_COMPANY,
  GET_USER,
  VERIFICATION_COMPANY_EXISTS
} from "./actions";

const initialState = {
  allTurnos: [],
  allClients: [],
  allVentas: [],
  categoriesClients: [],
  clientBusc: [],
  ventaBusc: [],
  vtaxClient: [],
  vtasxAnio: [],
  vtasxAnioandMesNow: [],
  vtasxAnioandMesParam: [],
  arrayCompanies:[],
  user: null,
};

function rootReducer(state = initialState, action) {
console.log(action.payload,"reducer")
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

    case VTA_X_ANIO:
      return {
        ...state,
        vtasxAnio: action.payload,
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

    case SEARCH_VTA_CLIENT:
      return {
        ...state,
        vtaxClient: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
