import { NOTECRED, BEST_SELLING } from "../../actions/supply/actionsSupply";


const initialState = {
    listSupplies: [],
    listBestSelling: []
};


export default function supplyReducer(state = initialState, action) {
    switch (action.type) {



        case NOTECRED:
            return {
                ...state,
                listSupplies: action.payload,
            };

        case BEST_SELLING:
            return {
                ...state,
                listBestSelling: action.payload
            }

        default:
            return state;
    }
}