import { NOTECRED } from "../../actions/supply/actionsSupply";


const initialState = {
    listSupplies: [],
};


export default function supplyReducer(state = initialState, action) {
    switch (action.type) {



        case NOTECRED:
            return {
                ...state,
                listSupplies: action.payload,
            };



        default:
            return state;
    }
}