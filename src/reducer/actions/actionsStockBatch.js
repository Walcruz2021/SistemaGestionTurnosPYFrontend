
import axios from "axios";
import host from "../../components/ruteBack/vbledeploy";
export const GETSTOCKBATCH_BY_IDSUPPLY = "GETSTOCKBATCH_BY_IDSUPPLY";


export function getStockBatchByIdSupply(idSupply) {

    return async function (dispatch) {
        const listStockBatch = await axios.get(
            `${host}/api/getStockBatchesByIdSupply/${idSupply}`,

            {}
        );

        return dispatch({
            type: GETSTOCKBATCH_BY_IDSUPPLY,
            payload: listStockBatch.data.listStockBatches,
        });
    };
}