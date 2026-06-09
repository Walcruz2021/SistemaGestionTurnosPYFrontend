import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarPlus, Boxes, CheckSquare } from "lucide-react";
import TableStockBatch from "../StockBatch/TableStockBatch";
import ModalPriceSupply from "../Modal/Supply/ModalPriceSupply";


/**
 * Table of supply variants, showing stock, priceSale, etc and related stock batches.
 * @param {*} supplySelected the supply selected in the main table (TableSupplies), with its variants and batches
 * @returns table variants and batches
 */

const TableSupplyVariants = ({
    supplySelected,
    stateBatches,
    setStateBatches,
    setSupplySelected
}) => {


    const [selectedId, setSelectedId] = useState(null);
    const [stateIdCompanySupply, setStateIdCompanySupply] = useState(null);
    const [modalOpenEditSupply, setModalOpenEditSupply] = useState(false);
    const [stateDetailsVariant, setStateDetailsVariant] = useState({})


    const handleSelectVariant = (item) => {

        const variantData = {
            ...item,

            // lote/s relacionados a esta variante
            batches: supplySelected.batches.filter(
                batch => batch.idVariant === item.idSupplyVariant
            ),

            // info del insumo global
            global: supplySelected.global,

            // ids principales
            idCompanySupply: supplySelected._id,
            idCompany: supplySelected.idCompany
        };

        setSelectedId(item._id);
        setStateBatches(variantData);
       
    };

    const handleSetPriceSale = (e, props) => {
        e.preventDefault();

        setModalOpenEditSupply(true);
        setStateDetailsVariant(props.item);
        setStateIdCompanySupply(supplySelected._id);
    };

    return (

        <div>

            {/* CARD TITLE */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="bg-white border border-zinc-200 rounded-2xl overflow-hidden mb-3"
            >

                <div className="px-6 py-2 border-b border-zinc-100 flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
                            Variantes
                        </h2>

                        <p className="text-zinc-500 text-sm mt-0.5">
                            Seleccione una variante
                        </p>

                    </div>

                    <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

                        <CalendarPlus className="w-4 h-4 text-white" />

                    </div>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-zinc-200 bg-zinc-50">

                                <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-700">
                                    <CheckSquare className="scale-90" />
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-700">
                                    <Boxes className="scale-90" />
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-700">
                                    Stock
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-700">
                                    Precio Venta
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {supplySelected?.variants?.map((item) => (

                                <tr
                                    key={item._id}
                                    className={`border-b border-zinc-100 transition
                                    ${selectedId === item._id
                                            ? "bg-zinc-100"
                                            : "hover:bg-zinc-50"
                                        }`}
                                >

                                    <td className="px-4 py-3">

                                        <input
                                            type="checkbox"
                                            name="variant"
                                            checked={selectedId === item._id}
                                            className="scale-150"
                                            onChange={() =>
                                                handleSelectVariant(item)
                                            }
                                        />

                                    </td>

                                    <td className="px-4 py-3 text-zinc-800 font-medium">

                                        {item.variant.name}

                                    </td>

                                    <td className="px-4 py-3 text-zinc-600">

                                        {item.currentStock}

                                    </td>

                                    <td className="px-4 py-3 text-zinc-600"

                                        style={{ cursor: "pointer" }}
                                        onClick={(e) =>
                                            handleSetPriceSale(e, {
                                                item,
                                            })
                                        }
                                    >
                                        $
                                        {item.priceSale.toLocaleString(
                                            "es-AR"
                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </motion.div>

            <TableStockBatch
                stateBatches={stateBatches}
            />

            <ModalPriceSupply modalOpenEditSupply={modalOpenEditSupply} setModalOpenEditSupply={setModalOpenEditSupply} stateDetailsVariant={stateDetailsVariant} setStateDetailsVariant={setStateDetailsVariant} stateIdCompanySupply={stateIdCompanySupply} setSupplySelected={setSupplySelected}/>
        </div>


    );
};

export default TableSupplyVariants;