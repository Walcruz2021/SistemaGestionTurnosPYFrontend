import { ADD_INVENTORY } from "../../actions/inventory/actionsInventory";


const initialState = {

};


export default function inventoryReducer(state = initialState, action) {
    switch (action.type) {

        
        case ADD_INVENTORY:
            return {
                ...state
            };

        default:
            return state;
    }
}