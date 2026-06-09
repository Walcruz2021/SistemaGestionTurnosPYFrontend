import axios from "axios";

import host from "../../../components/ruteBack/vbledeploy"


export const ADD_INVENTORY = "ADD_INVENTORY"

export function addInventory(payload, idCompany) {

    return async function (dispatch) {
        try {

            const newInventory = await axios.post(
                //"http://localhost:3002/api/listClients",

                `${host}/api/addInventory/${idCompany}`,
                payload
            );
            return newInventory;
        } catch (error) {
            console.log(error)
        }
    };
}

