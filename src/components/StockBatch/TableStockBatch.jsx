
import React, { useEffect, useState } from "react";
import { getStockBatchByIdSupply } from "../../reducer/actions/actionsStockBatch"
import { useSelector, useDispatch } from "react-redux";
import convertNum from "../../functions/convertNum";
import convertDateReverse from "../../functions/convertDateReverse";
import convertDateFormat from "../../functions/convertDateFormat";
import { motion } from "framer-motion";
import { Search, X, ChevronDown, Tag, Layers, CalendarPlus } from "lucide-react";


const TableStockBatch = ({ idSupply }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (idSupply) {
            dispatch(getStockBatchByIdSupply(idSupply));
        }
    }, [idSupply, dispatch]);

    const listStockBatches = useSelector((state) => state.stockBatch.listStockBatch);


    return (
        <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.3,
                duration: 0.4,
            }}
            className="bg-white  mb-2">

            <div className="p-1 overflow-x-auto">

                {/* TABLE */}
                <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.4,
                    }}
                    className="bg-white  mb-1">


                    <div>
                        <table className="w-full">
                            <thead>
                                <tr className="bg-zinc-950">
                                    <th className="px-3 md:px-5 py-3.5 text-left  font-semibold text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs">Nombre Lote</th>
                                    {/* este valor es la cantidad que existe del lote en particular */}
                                    <th className="px-3 md:px-5 py-3.5 text-left  font-semibold text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs">Cant</th>
                                    <th className="px-3 md:px-5 py-3.5 text-left  font-semibold text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs">Costo Unit</th>
                                    <th className="px-3 md:px-5 py-3.5 text-left  font-semibold text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs">Fecha Compra</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listStockBatches ? listStockBatches.map((buy, index) => {
                                    return (

                                        <motion.tr key={buy._id} animate={{
                                            opacity: 1,
                                        }}
                                            transition={{
                                                delay:
                                                    0.35 +
                                                    index * 0.05,
                                            }}
                                            className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                                            <td

                                                className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal"
                                            >{buy.nameLot ? buy.nameLot : "S/N"}</td>
                                            <td

                                                className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal"
                                            >{buy.quantity}</td>
                                            <td className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal">{convertNum(buy.unitCost)}</td>

                                            <td className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal">{convertDateReverse(convertDateFormat(buy.datePurchase))}</td>
                                        </motion.tr>
                                    )
                                }) :

                                    <div className="titGral">
                                        <h2>No hay Datos</h2>
                                    </div>


                                }

                            </tbody>

                        </table>

                    </div>
                </motion.div>

            </div>


        </motion.div>
    )
}

export default TableStockBatch  