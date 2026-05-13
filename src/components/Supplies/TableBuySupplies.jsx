import React, { useEffect, useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { actionListBuySuppliesByDateCurrent, actionListBuySupplyByNInvoice, getListSuppliesGral } from "../../reducer/actions/supply/actionsSupply"
import iconBuySupply from "../../icons/buySupply2.gif"
import FormAddBuySupply from "../Formulario/Supply/FormAddBuySupply"
import convertDateFormat from "../../functions/convertDateFormat"
import convertDateReverse from "../../functions/convertDateReverse"
import convertNum from "../../functions/convertNum"
import TableDetailBuys from "./TableDetailBuys"
import { use } from "react"
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { motion, AnimatePresence } from "framer-motion";

const SectionDivider = ({ children }) => (
    <div className="flex items-center gap-3 mt-10 mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
            {children}
        </span>
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
    </div>
);

const TableBuySupplies = () => {

    const dispatch = useDispatch()
    const listBuySuppliesByCurrentDate = useSelector((state) => state.supply.listBuySupplies)
    const findSupplyByNInvoice = useSelector((state) => state.supply.findSUpplyByNInvoice)
    const [stateSearch, setSearch] = useState("");
    const [stateSearchGral, setSearchGral] = useState("");
    const [isActiveMessage, setIsActiveMessage] = useState(false);
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const [openFormBuySupply, setOpenFormBuySupply] = useState(false)
    const [stateDetailsBuy, setStateDetailsBuy] = useState({
        detailsBuy: ""
    })

    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(actionListBuySuppliesByDateCurrent(companySelectedMenu._id))
        }
    }, [companySelectedMenu, dispatch]);


    useEffect(() => {
        if (!stateSearchGral) {
            setIsActiveMessage(false);
        }
    }, [stateSearchGral])


    //PAGINACION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const suppliesFiltered = useMemo(() => {


        return listBuySuppliesByCurrentDate || []

        return result;
    }, [
        listBuySuppliesByCurrentDate,

    ]);



    const totalPages = suppliesFiltered && suppliesFiltered.length > 0
        ? Math.ceil(suppliesFiltered.length / itemsPerPage)
        : 0;

    const currentItems =
        suppliesFiltered && suppliesFiltered.length > 0 ? suppliesFiltered?.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        ) ?? [] : [];

    function handleOrder(e) {
        setOrder(!order);
        dispatch(actionsOrderSupplies(order));
    }

    function handleDetailsSupplies(e, props) {
        e.preventDefault();
        setStateDetailsSup({
            detailsSup: props.sup,
        });
    }

    //FUNCION QUE UTILIZA EL INPUT PARA BUSCAR UNA COMPRA

    /**
     * This function searches for a buy: Its used in filtered search ListBuys
     * @param {String} busc Buy's Invoice as state
     * @returns
     */

    function searchBuy(busc) {

        return function (x) {

            return x.NInvoice && x.NInvoice.toLowerCase().includes(busc.toLowerCase()) || !busc;
            //return x.NInvoice.includes(busc) | !busc;
        };
    }

    function searchBuyGralByNInvoice() {
        dispatch(actionListBuySupplyByNInvoice(companySelectedMenu._id, stateSearchGral))
        setIsActiveMessage(true);
    }

    function handleDetailsBuy(e, props) {
        e.preventDefault();
        setStateDetailsBuy({
            detailsBuy: props,
        });
    }

    const Th = ({ children, right }) => (
        <th
            className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 whitespace-nowrap border-b border-zinc-100 dark:border-zinc-800 ${right ? "text-right" : "text-left"
                }`}
        >
            {children}
        </th>
    );
    const Td = ({ children, onClick, link, right }) => (
        <td
            onClick={onClick}
            className={`px-4 py-3.5 text-[13px] border-b border-zinc-100 dark:border-zinc-800 align-middle
      ${right ? "text-right tabular-nums" : ""}
      ${link
                    ? "text-zinc-900 dark:text-zinc-100 font-medium cursor-pointer hover:underline underline-offset-2"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
        >
            {children}
        </td>
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 md:px-10 py-8">
            <div className="max-w-4xl mx-auto">

                {/* ── Encabezado ── */}
                <div className="flex items-start justify-between mb-8">

                    <div>
                        <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 tracking-tight">
                            Compras de Insumos
                        </h1>
                        <p className="text-sm text-zinc-400 mt-0.5">
                            Gestión y seguimiento de facturas
                        </p>
                    </div>

                    <div className="flex items-center gap-3 pl-1">

                        {iconBuySupply && (
                            <img
                                src={iconBuySupply}
                                className="w-8 h-8"
                                alt=""
                            />
                        )}

                        <motion.button
                            whileHover={{ opacity: 0.85 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setOpenFormBuySupply(!openFormBuySupply)}
                            className="
            inline-flex items-center
            px-3 py-2
            rounded-lg
            bg-zinc-900 dark:bg-zinc-100
            text-zinc-100 dark:text-zinc-900
            text-sm font-medium
            hover:opacity-85
            transition-opacity
        "
                        >
                            Ingresar compra
                        </motion.button>

                    </div>

                </div>

                {/* ── Formulario ── */}
                <AnimatePresence>
                    {openFormBuySupply && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="mb-6 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                        >
                            <FormAddBuySupply />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Sección: mes actual ── */}
                <SectionDivider>Compras mes actual</SectionDivider>

                {/* Buscador */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 px-3 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 max-w-sm focus-within:border-zinc-400 dark:focus-within:border-zinc-600 transition-colors">
                        <svg
                            className="w-3.5 h-3.5 text-zinc-400 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Filtrar por N° factura..."
                            value={stateSearch}
                            name="search"
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent flex-1 text-[13px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none"
                        />
                    </div>
                </div>

                <motion.div initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden mb-2">
                    <div className="overflow-x-auto">

                        <table className="w-full">
                            <thead className="bg-zinc-50 dark:bg-zinc-950">
                                <tr>

                                    <Th className="instrument-serif-regular">N Factura</Th>
                                    <Th className="instrument-serif-regular">Proveedor</Th>
                                    <Th className="instrument-serif-regular">
                                        Fecha{" "}
                                        {/* <FontAwesomeIcon
                                    // onClick={(e) => handleOrder(e)}
                                    color={order ? "#FF846A" : "#A2DFFF"}
                                    icon={faSortAlphaDown}
                                    size="lg"
                                    style={{ cursor: "pointer" }}
                                /> */}
                                    </Th>
                                    <Th className="instrument-serif-regular">Valor Bruto</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems ? currentItems.filter(searchBuy(stateSearch)).map((buy) => {
                                    return (

                                        <motion.tr
                                            key={buy._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors duration-100"
                                        >
                                            <Td link onClick={(e) => handleDetailsBuy(e, buy)}>
                                                {buy.NInvoice}
                                            </Td>
                                            <Td>{buy.nameSupplier ?? "No registrado"}</Td>

                                            <Td>
                                                {convertDateReverse(convertDateFormat(buy.date))}
                                            </Td>

                                            <Td right>
                                                {buy.montoB ? convertNum(buy.montoB) : 0}
                                            </Td>
                                        </motion.tr>
                                    )
                                }) : null

                                }

                            </tbody>

                        </table>

                    </div>

                </motion.div>


                {/* PAGINACIÓN NUMÉRICA */}
                {suppliesFiltered.length > itemsPerPage && (
                    <div className="flex justify-center items-center gap-1 mt-4">
                        <nav>
                            <ul className="pagination">
                                <li
                                    className={`page-item ${currentPage === 1
                                        ? "disabled"
                                        : ""
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage(
                                                currentPage - 1
                                            )
                                        }
                                    >
                                        «
                                    </button>
                                </li>

                                {Array.from(
                                    { length: totalPages },
                                    (_, i) => (
                                        <li
                                            key={i}
                                            className={`page-item ${currentPage === i + 1
                                                ? "active"
                                                : ""
                                                }`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() =>
                                                    setCurrentPage(
                                                        i + 1
                                                    )
                                                }
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    )
                                )}

                                <li
                                    className={`page-item ${currentPage === totalPages
                                        ? "disabled"
                                        : ""
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage(
                                                currentPage + 1
                                            )
                                        }
                                    >
                                        »
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}

                {/* ── Sección: búsqueda general ── */}
                <SectionDivider>Búsqueda general</SectionDivider>

                <div className="flex items-center gap-2 max-w-md mb-5">
                    <div className="flex-1 flex items-center gap-2 px-3 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus-within:border-zinc-400 dark:focus-within:border-zinc-600 transition-colors">
                        <svg
                            className="w-3.5 h-3.5 text-zinc-400 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Ingrese N° de factura..."
                            onChange={(e) => setSearchGral(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && stateSearchGral)
                                    searchBuyGralByNInvoice();
                            }}
                            className="bg-transparent flex-1 text-[13px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none"
                        />
                    </div>
                    <motion.button
                        whileHover={{ opacity: 0.85 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={searchBuyGralByNInvoice}
                        disabled={!stateSearchGral}
                        className="px-4 h-9 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[13px] font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                    >
                        Buscar
                    </motion.button>
                </div>

                {/* Resultado búsqueda general */}

                {findSupplyByNInvoice ? (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden mb-6"
                    >

                        <div className="overflow-x-auto">

                            <table className="w-full">
                                <thead className="bg-zinc-50 dark:bg-zinc-950">
                                    <tr>
                                        <Th>N° Factura</Th>
                                        <Th>Proveedor</Th>
                                        <Th>Fecha</Th>
                                        <Th right>Valor bruto</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors duration-100">
                                        <Td
                                            link
                                            onClick={(e) =>
                                                handleDetailsBuy(e, findSupplyByNInvoice)
                                            }
                                        >
                                            {findSupplyByNInvoice.NInvoice}
                                        </Td>
                                        <Td>
                                            {findSupplyByNInvoice.nameSupplier ?? "No registrado"}
                                        </Td>
                                        <Td>
                                            {convertDateReverse(
                                                convertDateFormat(findSupplyByNInvoice.date)
                                            )}
                                        </Td>
                                        <Td right>
                                            {findSupplyByNInvoice.montoB
                                                ? convertNum(findSupplyByNInvoice.montoB)
                                                : 0}
                                        </Td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </motion.div>
                ) : isActiveMessage && !findSupplyByNInvoice ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2.5 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 mb-6"
                    >
                        <svg
                            className="w-3.5 h-3.5 text-zinc-400 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4m0 4h.01" />
                        </svg>
                        <p className="text-[13px] text-zinc-500">
                            No se encontraron compras para la factura:{" "}
                            <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                                {stateSearchGral}
                            </span>
                        </p>
                    </motion.div>
                ) : null}



                {/* ── Sección: detalle ── */}
                <SectionDivider>Detalle de compra seleccionada</SectionDivider>


                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                    <TableDetailBuys stateDetailsBuy={stateDetailsBuy?.detailsBuy} />
                </div>
            </div>
        </div>
    )
}

export default TableBuySupplies


