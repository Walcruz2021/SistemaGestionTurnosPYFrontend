
import {
    GET_CLIENTS,
    DELETE_CLIENT,
    GET_NAME_CLIENTS,
    GET_CLIENTS_ID,
    RESET_ALL_CLIENTS,
    UPDATE_CLIENT,
} from "../actions/actionsClients";

const initialState = {
    allClients: [],
    categoriesClients: [],
    clientBusc: [],
};


export default function clientReducer(state = initialState, action) {
    switch (action.type) {

        case GET_CLIENTS:
            return {
                ...state,
                allClients: action.payload,
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




        case "POST_CLIENT":
            return {
                ...state,
            };

        case UPDATE_CLIENT:
            return {
                ...state,
                allClients: action.payload,
            };


        case RESET_ALL_CLIENTS:
            return {
                ...state,
                allClients: null,
            };


        default:
            return state;
    }
}