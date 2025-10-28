import {VERIFICATION_CONECTION} from "../actions/actions"

const initialState = {
    conectionMongo: null,
    dataPrediction: ""
};


export default function gralReducer(state = initialState, action) {
    switch (action.type) {

        case VERIFICATION_CONECTION:
            return {
                ...state,
                conectionMongo: action.payload,
            };

      
   
       


        default:
            return state;
    }
}