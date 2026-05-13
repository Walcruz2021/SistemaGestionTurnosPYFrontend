
import { BsPersonBoundingBox } from "react-icons/bs";
import { TbTaxEuro } from "react-icons/tb";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa6";
import { motion } from "framer-motion";
import convertNum from "../../functions/convertNum";

const CardInfo = ({ icon, label, value, highlight }) => (
    <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -1 }}
        className={`
            rounded-xl border px-3 py-3 transition-all duration-200
            ${highlight
                ? "bg-black border-zinc-700"
                : "bg-zinc-900 border-zinc-800"
            }
        `}
    >
        <div className="flex items-center gap-3">

            <div
                className={`
                    w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                    ${highlight
                        ? "bg-zinc-800 text-zinc-100"
                        : "bg-zinc-800/80 text-zinc-300"
                    }
                `}
            >
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 font-medium truncate">
                    {label}
                </p>

                <h3 className="text-[13px] md:text-sm font-semibold text-zinc-100 truncate">
                    {value ?? "-"}
                </h3>
            </div>

        </div>
    </motion.div>
);

const Th = ({ children, right }) => (
    <th
        className={`
            px-4 py-3 text-[11px] font-semibold uppercase tracking-widest
            text-zinc-400 whitespace-nowrap border-b border-zinc-100
            dark:border-zinc-800
            ${right ? "text-right" : "text-left"}
        `}
    >
        {children}
    </th>
);

const Td = ({ children, right }) => (
    <td
        className={`
            px-4 py-3.5 text-[13px] border-b border-zinc-100
            dark:border-zinc-800 align-middle text-zinc-500
            dark:text-zinc-400
            ${right ? "text-right tabular-nums" : ""}
        `}
    >
        {children}
    </td>
);

const TableDetailBuys = ({ stateDetailsBuy }) => {

    return (
        <div >

            {/* CARDS OSCURAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-5">

                <CardInfo
                    icon={<FaFileInvoice size="1rem" />}
                    label="N° Factura"
                    value={stateDetailsBuy.NInvoice ?? 0}
                />

                <CardInfo
                    icon={<FaMoneyBillWave size="1rem" />}
                    label="Importe Neto"
                    value={convertNum(stateDetailsBuy.montoN ?? 0)}
                />

                <CardInfo
                    icon={<TbTaxEuro size="1rem" />}
                    label="IVA"
                    value={convertNum(stateDetailsBuy.iva ?? 0)}
                />

                <CardInfo
                    icon={<TbTaxEuro size="1rem" />}
                    label="Otros Imp."
                    value={convertNum(stateDetailsBuy.taxes ?? 0)}
                />

                <CardInfo
                    icon={<FaMoneyBills size="1rem" />}
                    label="Total Bruto"
                    value={convertNum(stateDetailsBuy.montoB ?? 0)}
                    highlight
                />

                <CardInfo
                    icon={<BsPersonBoundingBox size="1rem" />}
                    label="Proveedor"
                    value={stateDetailsBuy.nameSupplier ?? "No registrado"}
                />

            </div>

            {/* TABLA MISMO ESTILO QUE EL EJEMPLO */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="
                    rounded-xl border border-zinc-200
                    dark:border-zinc-800
                    bg-white dark:bg-zinc-900
                    overflow-hidden
                "
            >

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-zinc-50 dark:bg-zinc-950">
                            <tr>

                                <Th>Elementos Comprados</Th>
                                <Th>Marca</Th>
                                <Th right>Cantidad</Th>
                                <Th right>Costo Unid.</Th>

                            </tr>
                        </thead>

                        <tbody>

                            {stateDetailsBuy.detailsSupply?.length > 0 ? (
                                stateDetailsBuy.detailsSupply.map((buy) => (
                                    <motion.tr
                                        key={buy._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="
                                        hover:bg-zinc-50
                                        dark:hover:bg-zinc-800/60
                                        transition-colors duration-100
                                    "
                                    >

                                        <Td>
                                            <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                                {buy.nameSupply}
                                            </span>
                                        </Td>

                                        <Td>{buy.nameBrand}</Td>

                                        <Td right>
                                            {buy.quantity}
                                        </Td>

                                        <Td right>
                                            {convertNum(buy.unitCost)}
                                        </Td>

                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="
                                        py-10 text-center text-sm
                                        text-zinc-500
                                    "
                                    >
                                        No hay detalles cargados
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>
                </div>

            </motion.div>

        </div>
    );
};

export default TableDetailBuys;

