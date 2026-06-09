
import React, { useEffect, useState } from "react";
import { getStockBatchByIdSupply } from "../../reducer/actions/actionsStockBatch"
import { useSelector, useDispatch } from "react-redux";
import convertNum from "../../functions/convertNum";
import convertDateReverse from "../../functions/convertDateReverse";
import convertDateFormat from "../../functions/convertDateFormat";
import { motion } from "framer-motion";
import { Search, X, ChevronDown, Tag, Layers, CalendarPlus } from "lucide-react";


const TableStockBatch = ({ stateBatches }) => {

    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (idSupply) {
    //         dispatch(getStockBatchByIdSupply(idSupply));
    //     }
    // }, [idSupply, dispatch]);

    //figure out this query if delete or modified
    //const listStockBatches = useSelector((state) => state.stockBatch.listStockBatch);


    return (
        <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.3,
                duration: 0.4,
            }}
            className="bg-white  mb-2">

            <div className="p-1 overflow-x-auto">

                {/* CARD TITLE */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="bg-white border border-zinc-200 rounded-2xl overflow-hidden mb-3"
                    >


                        <div className="px-6 py-2 border-b border-zinc-100 flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
                                    Tabla de Lotes
                                </h2>

                                <p className="text-zinc-500 text-sm mt-0.5">
                                    Lotes y Detalles del Insumo Seleccionado
                                </p>


                            </div>

                            <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

                                <CalendarPlus className="w-4 h-4 text-white" />

                            </div>

                        </div>

                    </motion.div>
                </div>

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
                                {stateBatches ? stateBatches.batches?.map((buy, index) => {
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