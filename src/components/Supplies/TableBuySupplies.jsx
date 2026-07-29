import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    actionListBuySuppliesByDateCurrent,
    actionListBuySupplyByNInvoice,
} from "../../reducer/actions/supply/actionsSupply";

import FormAddBuySupply from "../Formulario/Supply/FormAddBuySupply";
import FormAddSupplyGral from "../Formulario/Supply/FormAddSupplyGral";
import FormAddSupplyVariant from "../Formulario/Supply/FormAddSupplyVariant";
import ModalAddSupplier from "../Modal/Suppier/ModalAddSupplier";
import TableDetailBuys from "./TableDetailBuys";

import convertDateFormat from "../../functions/convertDateFormat";
import convertDateReverse from "../../functions/convertDateReverse";
import convertNum from "../../functions/convertNum";

import { motion } from "framer-motion";

import {
    Boxes,
    UserPlus,
    ChevronRight,
    ChevronUp,
    ChevronDown,
    GitBranchPlus,
    ShoppingBasket,
} from "lucide-react";

const SectionDivider = ({ children }) => (
    <div className="flex items-center gap-3 mt-3 mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
            {children}
        </span>

        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
    </div>
);

const TableBuySupplies = () => {
    const dispatch = useDispatch();

    /*
     * Estado de Redux
     */

    const companySelectedMenu = useSelector(
        (state) => state.company.companySelected
    );

    const {
        listBuySupplies,
        findSUpplyByNInvoice,
        notFound,
        loading,
        error,
    } = useSelector((state) => state.supply);

    /*
     * Estados de búsqueda
     */

    const [stateSearch, setSearch] = useState("");
    const [stateSearchGral, setSearchGral] = useState("");

    /*
     * Estados de formularios y modales
     */

    const [openFormBuySupply, setOpenFormBuySupply] = useState(false);
    const [openDetailFormBuy, setOpenDetailBuy] = useState(true);

    const [openModalSupplier, setOpenModalSupplier] = useState(false);
    const [openModalSupply, setOpenModalSupply] = useState(false);
    const [openModalAddVariant, setOpenModalAddVariant] = useState(false);
    const [openTableDetailBuys, setOpenTableDetailBuys] = useState(false)

    /*
     * Compra seleccionada para visualizar su detalle
     */

    const [stateDetailsBuy, setStateDetailsBuy] = useState({
        detailsBuy: null,
    });

    /*
     * Paginación
     */

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    /*
     * Obtener compras del mes actual
     */

    useEffect(() => {
        if (companySelectedMenu?._id) {
            dispatch(
                actionListBuySuppliesByDateCurrent(
                    companySelectedMenu._id
                )
            );
        }
    }, [companySelectedMenu?._id, dispatch]);

    /*
     * Lista de compras
     */

    const suppliesFiltered = useMemo(() => {
        return listBuySupplies || [];
    }, [listBuySupplies]);

    const totalPages =
        suppliesFiltered.length > 0
            ? Math.ceil(suppliesFiltered.length / itemsPerPage)
            : 0;

    const currentItems = suppliesFiltered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    /*
     * Volver a la primera página cuando cambia el filtro
     */

    useEffect(() => {
        setCurrentPage(1);
    }, [stateSearch]);

    /*
     * Filtro local de las compras del mes actual
     */

    function searchBuy(searchValue) {
        return function (buy) {
            if (!searchValue) {
                return true;
            }

            return buy.NInvoice
                ?.toLowerCase()
                .includes(searchValue.toLowerCase());
        };
    }

    /*
     * Búsqueda general por número de factura
     */

    async function searchBuyGralByNInvoice() {
        const invoice = stateSearchGral.trim();

        if (!companySelectedMenu?._id || !invoice) {
            return;
        }

        await dispatch(
            actionListBuySupplyByNInvoice(
                companySelectedMenu._id,
                invoice
            )
        );
    }

    /*
     * Seleccionar una compra
     */

    function handleDetailsBuy(event, buy) {

        event.preventDefault();
        setOpenTableDetailBuys(true)
        setStateDetailsBuy({
            detailsBuy: buy,
        });
    }

    /*
     * Abrir o cerrar detalle del formulario
     */

    function changeOpen() {
        setOpenDetailBuy((previousState) => !previousState);
    }

    /*
     * Tarjetas de acciones rápidas
     */

    const ACTION_CARDS = [
        {
            id: "supply",
            label: "Insumo",
            sub: "Agregar insumo",
            icon: Boxes,
            action: () => {
                setOpenModalSupply(true);
                setOpenFormBuySupply(false);
                setOpenModalAddVariant(false);
            },
            disabled: openModalSupply,
        },
        {
            id: "supplier",
            label: "Proveedor",
            sub: "Agregar proveedor",
            icon: UserPlus,
            action: () => {
                setOpenModalSupplier(true);
                setOpenModalSupply(false);
            },
            disabled: openModalSupplier,
        },
        {
            id: "addVariant",
            label: "Variantes",
            sub: "Agregar variante",
            icon: GitBranchPlus,
            action: () => {
                setOpenModalAddVariant(true);
                setOpenFormBuySupply(false);
                setOpenModalSupply(false);
            },
            disabled: openModalAddVariant,
        },
        {
            id: "addBuySupply",
            label: "Compras",
            sub: "Ingresar compra / listado de compras",
            icon: ShoppingBasket,
            action: () => {
                setOpenFormBuySupply(true);
                setOpenModalAddVariant(false);
                setOpenModalSupply(false);
            },
            disabled: openFormBuySupply,
        },
    ];

    /*
     * Componentes reutilizables de tabla
     */

    const Th = ({ children, right = false }) => (
        <th
            className={`
                px-4
                py-3
                text-[11px]
                font-semibold
                uppercase
                tracking-widest
                text-zinc-400
                whitespace-nowrap
                border-b
                border-zinc-100
                dark:border-zinc-800
                ${right ? "text-right" : "text-left"}
            `}
        >
            {children}
        </th>
    );

    const Td = ({
        children,
        onClick,
        link = false,
        right = false,
    }) => (
        <td
            onClick={onClick}
            className={`
                px-4
                py-3.5
                text-[13px]
                border-b
                border-zinc-100
                dark:border-zinc-800
                align-middle
                ${right ? "text-right tabular-nums" : ""}
                ${link
                    ? `
                            text-zinc-900
                            dark:text-zinc-100
                            font-medium
                            cursor-pointer
                            hover:underline
                            underline-offset-2
                        `
                    : "text-zinc-500 dark:text-zinc-400"
                }
            `}
        >
            {children}
        </td>
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 md:px-10 py-8">
            {/* ACCIONES RÁPIDAS */}

            <div className="not-bootstrap">
                <div className="px-0.5 md:px-8 pt-4 max-w-7xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-4">
                        Acciones rápidas
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-2">
                        {ACTION_CARDS.map((card, index) => {
                            const Icon = card.icon;

                            return (
                                <button
                                    key={card.id}
                                    type="button"
                                    onClick={card.action}
                                    disabled={card.disabled}
                                    className="w-full text-left bg-transparent border-0 disabled:opacity-60"
                                >
                                    <motion.div
                                        custom={index}
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        whileHover={{
                                            y: -4,
                                            scale: 1.02,
                                        }}
                                        whileTap={{
                                            scale: 0.98,
                                        }}
                                        className="
                                            relative
                                            overflow-hidden
                                            group
                                            bg-gray
                                            hover:bg-black
                                            border
                                            border-zinc-200
                                            hover:border-black
                                            rounded-2xl
                                            h-[140px]
                                            min-h-[140px]
                                            p-4
                                            cursor-pointer
                                            transition-all
                                            duration-300
                                            hover:shadow-2xl
                                            flex
                                            flex-col
                                            justify-between
                                        "
                                    >
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="w-9 h-9 rounded-xl group-hover:bg-white/10 flex items-center justify-center mb-3 transition-colors duration-300">
                                                <Icon
                                                    className="w-5 h-5 text-zinc-700 group-hover:text-white transition-colors duration-300"
                                                    strokeWidth={1.8}
                                                />
                                            </div>

                                            <div>
                                                <h3 className="text-zinc-900 group-hover:text-white font-semibold text-sm transition-colors duration-300">
                                                    {card.label}
                                                </h3>

                                                <p className="text-zinc-500 group-hover:text-zinc-300 text-[11px] leading-tight mt-1 transition-colors duration-300 no-underline">
                                                    {card.sub}
                                                </p>
                                            </div>

                                            <div className="flex justify-end mt-auto">
                                                <ChevronRight
                                                    className="
                                                        w-4
                                                        h-4
                                                        text-zinc-300
                                                        group-hover:text-white
                                                        opacity-0
                                                        group-hover:opacity-100
                                                        transition-all
                                                        duration-300
                                                    "
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                {/* FORMULARIO DE VARIANTES */}

                {openModalAddVariant && (
                    <>
                        <div className="flex items-start justify-between mb-8 mt-3">
                            <div>
                                <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 tracking-tight">
                                    Formulario Agregar Variantes
                                </h1>

                                <p className="text-sm text-zinc-400 mt-0.5">
                                    Gestión de nuevas variantes para productos
                                </p>
                            </div>
                        </div>

                        <FormAddSupplyVariant />
                    </>
                )}

                {/* FORMULARIO Y LISTADO DE COMPRAS */}

                {openFormBuySupply && (
                    <>
                    
                        <div className="flex items-center">
                            <div className="flex-1">
                                <SectionDivider>
                                    Detalle de compra
                                </SectionDivider>
                            </div>

                            <button
                                type="button"
                                onClick={changeOpen}
                                className="flex items-center gap-1 ml-auto"
                            >
                                {openDetailFormBuy ? (
                                    <>
                                        <ChevronDown size={30} />

                                        <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                                            Cerrar
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <ChevronUp size={30} />

                                        <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                                            Abrir
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>

                        {openDetailFormBuy && (
                            <FormAddBuySupply
                                openFormBuySupply={openFormBuySupply}
                                setOpenFormBuySupply={
                                    setOpenFormBuySupply
                                }
                            />
                        )}

                        <div className="flex items-start justify-between mb-8 mt-5">
                            <div>
                                <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 tracking-tight">
                                    Tabla de Compras de Insumos
                                </h1>

                                <p className="text-sm text-zinc-400 mt-0.5">
                                    Gestión y seguimiento de facturas
                                </p>
                            </div>
                        </div>

                        <SectionDivider>
                            Compras del mes actual
                        </SectionDivider>

                        {/* FILTRO LOCAL */}

                        <div className="mb-4">
                            <div className="flex items-center gap-2 px-3 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 max-w-sm focus-within:border-zinc-400 dark:focus-within:border-zinc-600 transition-colors">
                                <svg
                                    className="w-3.5 h-3.5 text-zinc-400 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        cx="11"
                                        cy="11"
                                        r="8"
                                    />

                                    <path d="m21 21-4.35-4.35" />
                                </svg>

                                <input
                                    type="text"
                                    placeholder="Filtrar por N° factura..."
                                    value={stateSearch}
                                    name="search"
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    className="bg-transparent flex-1 text-[13px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none"
                                />
                            </div>
                        </div>

                        {/* TABLA DEL MES ACTUAL */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden mb-2"
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-zinc-50 dark:bg-zinc-950">
                                        <tr>
                                            <Th>N° Factura</Th>
                                            <Th>Proveedor</Th>
                                            <Th>Fecha</Th>
                                            <Th>Valor bruto</Th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {currentItems
                                            .filter(
                                                searchBuy(stateSearch)
                                            )
                                            .map((buy) => (
                                                <motion.tr
                                                    key={buy._id}
                                                    initial={{
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                    }}
                                                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors duration-100"
                                                >
                                                    <Td
                                                        link
                                                        onClick={(
                                                            event
                                                        ) =>
                                                            handleDetailsBuy(
                                                                event,
                                                                buy
                                                            )
                                                        }
                                                    >
                                                        {buy.NInvoice}
                                                    </Td>

                                                    <Td>
                                                        {buy.nameSupplier ??
                                                            "No registrado"}
                                                    </Td>

                                                    <Td>
                                                        {buy.date
                                                            ? convertDateReverse(
                                                                convertDateFormat(
                                                                    buy.date
                                                                )
                                                            )
                                                            : "Sin fecha"}
                                                    </Td>

                                                    <Td right>
                                                        {buy.montoB
                                                            ? convertNum(
                                                                buy.montoB
                                                            )
                                                            : 0}
                                                    </Td>
                                                </motion.tr>
                                            ))}

                                        {currentItems.filter(
                                            searchBuy(stateSearch)
                                        ).length === 0 && (
                                                <tr>
                                                    <td
                                                        colSpan={4}
                                                        className="px-4 py-8 text-center text-sm text-zinc-400"
                                                    >
                                                        No hay compras para
                                                        mostrar.
                                                    </td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* PAGINACIÓN */}

                        {suppliesFiltered.length >
                            itemsPerPage && (
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
                                                    type="button"
                                                    className="page-link"
                                                    disabled={
                                                        currentPage === 1
                                                    }
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            (
                                                                previousPage
                                                            ) =>
                                                                previousPage -
                                                                1
                                                        )
                                                    }
                                                >
                                                    «
                                                </button>
                                            </li>

                                            {Array.from(
                                                {
                                                    length: totalPages,
                                                },
                                                (_, index) => (
                                                    <li
                                                        key={
                                                            index + 1
                                                        }
                                                        className={`page-item ${currentPage ===
                                                            index + 1
                                                            ? "active"
                                                            : ""
                                                            }`}
                                                    >
                                                        <button
                                                            type="button"
                                                            className="page-link"
                                                            onClick={() =>
                                                                setCurrentPage(
                                                                    index +
                                                                    1
                                                                )
                                                            }
                                                        >
                                                            {index + 1}
                                                        </button>
                                                    </li>
                                                )
                                            )}

                                            <li
                                                className={`page-item ${currentPage ===
                                                    totalPages
                                                    ? "disabled"
                                                    : ""
                                                    }`}
                                            >
                                                <button
                                                    type="button"
                                                    className="page-link"
                                                    disabled={
                                                        currentPage ===
                                                        totalPages
                                                    }
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            (
                                                                previousPage
                                                            ) =>
                                                                previousPage +
                                                                1
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

                        {/* BÚSQUEDA GENERAL */}

                        <SectionDivider>
                            Búsqueda general
                        </SectionDivider>

                        <div className="flex items-center gap-2 max-w-md mb-5">
                            <div className="flex-1 flex items-center gap-2 px-3 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus-within:border-zinc-400 dark:focus-within:border-zinc-600 transition-colors">
                                <svg
                                    className="w-3.5 h-3.5 text-zinc-400 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        cx="11"
                                        cy="11"
                                        r="8"
                                    />

                                    <path d="m21 21-4.35-4.35" />
                                </svg>

                                <input
                                    type="text"
                                    placeholder="Ingrese N° de factura..."
                                    value={stateSearchGral}
                                    onChange={(event) =>
                                        setSearchGral(
                                            event.target.value
                                        )
                                    }
                                    onKeyDown={(event) => {
                                        if (
                                            event.key ===
                                            "Enter" &&
                                            stateSearchGral.trim() &&
                                            !loading
                                        ) {
                                            searchBuyGralByNInvoice();
                                        }
                                    }}
                                    className="bg-transparent flex-1 text-[13px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none"
                                />
                            </div>

                            <motion.button
                                type="button"
                                whileHover={{
                                    opacity: 0.85,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                                onClick={
                                    searchBuyGralByNInvoice
                                }
                                disabled={
                                    !stateSearchGral.trim() ||
                                    loading
                                }
                                className="px-4 h-9 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[13px] font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-opacity min-w-[90px]"
                            >
                                {loading
                                    ? "Buscando..."
                                    : "Buscar"}
                            </motion.button>
                        </div>

                        {/* ESTADO DE CARGA */}

                        {loading && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                className="flex items-center gap-2.5 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 mb-6"
                            >
                                <div className="w-4 h-4 rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100 animate-spin" />

                                <p className="text-[13px] text-zinc-500">
                                    Buscando factura...
                                </p>
                            </motion.div>
                        )}

                        {/* RESULTADO ENCONTRADO */}

                        {!loading && findSUpplyByNInvoice && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 6,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden mb-6"
                            >
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-zinc-50 dark:bg-zinc-950">
                                            <tr>
                                                <Th>
                                                    N° Factura
                                                </Th>

                                                <Th>
                                                    Proveedor
                                                </Th>

                                                <Th>Fecha</Th>

                                                <Th right>
                                                    Valor bruto
                                                </Th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors duration-100">
                                                <Td
                                                    link
                                                    onClick={(
                                                        event
                                                    ) =>
                                                        handleDetailsBuy(
                                                            event,
                                                            findSUpplyByNInvoice
                                                        )
                                                    }
                                                >
                                                    {
                                                        findSUpplyByNInvoice.NInvoice
                                                    }
                                                </Td>

                                                <Td>
                                                    {findSUpplyByNInvoice.nameSupplier ??
                                                        "No registrado"}
                                                </Td>

                                                <Td>
                                                    {findSUpplyByNInvoice.date
                                                        ? convertDateReverse(
                                                            convertDateFormat(
                                                                findSUpplyByNInvoice.date
                                                            )
                                                        )
                                                        : "Sin fecha"}
                                                </Td>

                                                <Td right>
                                                    {findSUpplyByNInvoice.montoB
                                                        ? convertNum(
                                                            findSUpplyByNInvoice.montoB
                                                        )
                                                        : 0}
                                                </Td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {/* FACTURA NO ENCONTRADA */}

                        {!loading && notFound && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                className="flex items-center gap-2.5 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 mb-6"
                            >
                                <svg
                                    className="w-3.5 h-3.5 text-zinc-400 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                    />

                                    <path d="M12 8v4m0 4h.01" />
                                </svg>

                                <p className="text-[13px] text-zinc-500">
                                    No se encontraron compras para
                                    la factura:{" "}
                                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                                        {stateSearchGral}
                                    </span>
                                </p>
                            </motion.div>
                        )}

                        {/* ERROR DEL SERVIDOR */}

                        {!loading && error && !notFound && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                className="flex items-center gap-2.5 px-4 py-3 rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30 mb-6"
                            >
                                <p className="text-[13px] text-red-600 dark:text-red-400">
                                    {error}
                                </p>
                            </motion.div>
                        )}

                        {/* DETALLE DE COMPRA */}

                        <SectionDivider>
                            Detalle de compra seleccionada
                        </SectionDivider>

                        {
                            openTableDetailBuys &&

                            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                                <TableDetailBuys
                                    stateDetailsBuy={
                                        stateDetailsBuy?.detailsBuy
                                    }
                                />
                            </div>
                        }
                    </>
                )}

                {/* FORMULARIO DE INSUMOS */}

                {openModalSupply && (
                    <FormAddSupplyGral
                        openModal={openModalSupply}
                        setOpenModal={setOpenModalSupply}
                    />
                )}
            </div>

            {/* MODAL DE PROVEEDOR */}

            <ModalAddSupplier
                openModal={openModalSupplier}
                setOpenModal={setOpenModalSupplier}
            />
        </div>
    );
};

export default TableBuySupplies;