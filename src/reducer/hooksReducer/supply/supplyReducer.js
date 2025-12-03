import { ADD_SUPPLY, ADD_BUY_SUPPLY, GET_LIST_SUPPLIES, ORDER_SUPPLIES, UPDATE_SUPPLY, GET_LIST_BUY_SUPPLIES, UPDATE_SUPPLY_By_LIST } from "../../actions/supply/actionsSupply";


const initialState = {
    listSupplies: [],
    listBuySupplies: []
};


export default function supplyReducer(state = initialState, action) {
    switch (action.type) {

        case GET_LIST_BUY_SUPPLIES:
            return {
                ...state,
                listBuySupplies: action.payload
            }
        case ADD_SUPPLY:
            return {
                ...state
            };

        case ADD_BUY_SUPPLY:
            return {
                ...state
            };

        case GET_LIST_SUPPLIES:
            return {
                ...state,
                listSupplies: action.payload
            }

        case UPDATE_SUPPLY:
            return {
                ...state,
                listSupplies: action.payload,
            };

        case UPDATE_SUPPLY_By_LIST:
            return {
                ...state, listSupplies: action.payload
            }
        case ORDER_SUPPLIES:
            const listOrder = state.listSupplies;
            const arrayOrder =
                action.payload === true
                    ? listOrder.sort(function (a, b) {
                        const aux1 = a.nameSupply.toLocaleLowerCase();
                        const aux2 = b.nameSupply.toLocaleLowerCase();
                        if (aux1 > aux2) {
                            return 1;
                        }
                        if (aux2 > aux1) {
                            return -1;
                        } else return 0;
                    })
                    : // descendente
                    listOrder.sort(function (a, b) {
                        const aux1a = a.nameSupply.toLocaleLowerCase();
                        const aux2b = b.nameSupply.toLocaleLowerCase();
                        if (aux1a > aux2b) {
                            return -1;
                        }
                        if (aux2b > aux1a) {
                            return 1;
                        } else return 0;
                    });

            return {
                ...state,
                listSupplies: arrayOrder,
            };

        default:
            return state;
    }
}