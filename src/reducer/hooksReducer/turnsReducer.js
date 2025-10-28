import {
    GET_TURNOS,
    DELETE_TURNO,
    UPDATE_TURNO,
    ORDER_TURNOS,
} from "../actions/actionsTurnos";

const initialState = {
    allTurnos: [],
};


export default function turnsReducer(state = initialState, action) {
    switch (action.type) {

        case GET_TURNOS:
            return {
                ...state,
                allTurnos: action.payload,
                copyAllTurnos: action.payload,
            };

        case UPDATE_TURNO:
            return {
                ...state,
                allTurnos: action.payload,
            };


        case ORDER_TURNOS:
            const listOrder = state.turns.allTurnos;
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

        case DELETE_TURNO:
            return {
                ...state,
            };

        case "POST_TURNOS":
            return {
                ...state,
            };

        default:
            return state;
    }
}