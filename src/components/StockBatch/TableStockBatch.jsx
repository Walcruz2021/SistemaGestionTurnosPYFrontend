
import React, { useEffect, useState } from "react";
import { getStockBatchByIdSupply } from "../../reducer/actions/actionsStockBatch"
import { useSelector, useDispatch } from "react-redux";
import convertNum from "../../functions/convertNum";
import convertDateReverse from "../../functions/convertDateReverse";
import convertDateFormat from "../../functions/convertDateFormat";

const TableStockBatch = ({ idSupply }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (idSupply) {
            dispatch(getStockBatchByIdSupply(idSupply));
        }
    }, [idSupply, dispatch]);

    const listStockBatches = useSelector((state) => state.stockBatch.listStockBatch);
 

    return (
        <div >
            <div className="titGral">
                <h1>Detalle Lotes</h1>
            </div>
            <table className="table table-bordered table-hover table-white">
                <thead className="thead-light table-secondary">
                    <tr>
                        <th className="instrument-serif-regular">Nombre Lote</th>
                        {/* este valor es la cantidad que existe del lote en particular */}
                        <th className="instrument-serif-regular">Cantidad</th>
                        <th className="instrument-serif-regular">Costo Unit</th>
                        <th className="instrument-serif-regular">Fecha Compra</th>
                    </tr>
                </thead>
                <tbody>
                    {listStockBatches ? listStockBatches.map((buy) => {
                        return (

                            <tr key={buy._id}>
                                <td

                                    className="instrument-serif-regular"
                                >{buy.nameLot ? buy.nameLot : "S/N"}</td>
                                <td

                                    className="instrument-serif-regular"
                                >{buy.quantity}</td>
                                <td>{convertNum(buy.unitCost)}</td>

                                <td>{convertDateReverse(convertDateFormat(buy.datePurchase))}</td>
                            </tr>
                        )
                    }) : <h2>no hay datos</h2>

                    }

                </tbody>

            </table>


        </div>
    )
}

export default TableStockBatch  