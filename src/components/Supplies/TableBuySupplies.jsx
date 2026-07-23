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
import { Boxes, UserPlus, ChevronRight, ChevronUp, ChevronDown,GitBranchPlus,ShoppingBasket} from "lucide-react"
import FormAddSupplyGral from '../Formulario/Supply/FormAddSupplyGral';
import ModalAddSupplier from '../Modal/Suppier/ModalAddSupplier';

import FormAddSupplyVariant from "../Formulario/Supply/FormAddSupplyVariant"

const SectionDivider = ({ children }) => (
    <div className="flex items-center gap-3 mt-3 mb-4">
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

    const [openDetailFormBuy, setOpenDetailBuy] = useState(true)
    const [stateDetailsBuy, setStateDetailsBuy] = useState({
        detailsBuy: ""
    })
    const [openModalSupplier, setOpenModalSupplier] = useState(false);
    const [openModalSupply, setOpenModalSupply] = useState(false);

    const [openModalAddVariant, setOpenModalAddVariant] = useState(false);


    const addSupplyFunction = () => {

        setOpenModalSupply(!openModalSupply);

    };

    const addSupplierFunction = () => {

        setOpenModalSupplier(!openModalSupplier);

    };

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

    const ACTION_CARDS = [

        {
            id: "supply",
            label: "Insumo",
            sub: "Agregar insumo",
            icon: Boxes,
            action: () => {setOpenModalSupply(true),setOpenFormBuySupply(false),setOpenModalAddVariant(false) },
            type: "button",

        },

        {
            id: "supplier",
            label: "Proveedor",
            sub: "Agregar proveedor",
            icon: UserPlus,
            action: () => {setOpenModalSupplier(!openModalSupplier),setOpenModalSupply(false)},
            type: "button",
        },

        {
            id: "addVariant",
            label: "Variantes",
            sub: "Agregar Variante",
            icon: GitBranchPlus,
            action: () => { setOpenModalAddVariant(true), setOpenFormBuySupply(false),setOpenModalSupply(false) },
            type: "button",
            disabled: openModalAddVariant
        },

        {
            id: "addBuySupply",
            label: "Compras",
            sub: "Ingresar Compra / listado Compras",
            icon: ShoppingBasket,
            action: () => { setOpenFormBuySupply(true), setOpenModalAddVariant(false),setOpenModalSupply(false) },
            type: "button",
            disabled: openFormBuySupply
        },
    ];

    const changeOpen = () => {
        setOpenDetailBuy(!openDetailFormBuy)
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 md:px-10 py-8">
            <div className="not-bootstrap">

                <div className="px-0.5 md:px-8 pt-4 max-w-7xl mx-auto">

                    <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-4">
                        Acciones rápidas
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-2">

                        {ACTION_CARDS
                            .filter((card) => !card.hidden)
                            .map((card, i) => {

                                const Icon = card.icon;

                                const content = (
                                    <motion.div
                                        custom={i}
                                        // variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
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

                                        {/* CONTENIDO */}
                                        <div className="relative z-10 flex flex-col h-full">

                                            {/* ICON */}
                                            <div className="w-9 h-9 rounded-xl  group-hover:bg-white/10 flex items-center justify-center mb-3 transition-colors duration-300">

                                                <Icon
                                                    className="w-5 h-5 text-zinc-700 group-hover:text-white transition-colors duration-300"
                                                    strokeWidth={1.8}
                                                />

                                            </div>

                                            {/* TITULO */}
                                            <div>

                                                <h3 className="text-zinc-900 group-hover:text-white font-semibold text-sm transition-colors duration-300">
                                                    {card.label}
                                                </h3>

                                                <p className="text-zinc-500 group-hover:text-zinc-300 text-[11px] leading-tight mt-1 transition-colors duration-300 no-underline">
                                                    {card.sub}
                                                </p>

                                            </div>

                                            {/* FLECHA */}
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
                                );

                                if (card.type === "link") {
                                    return (
                                        <Link
                                            key={card.id}
                                            to={card.action}
                                            className="block w-full no-underline"
                                            style={{ textDecoration: "none" }}
                                        >
                                            {content}
                                        </Link>
                                    );
                                }

                                return (
                                    <button
                                        key={card.id}
                                        onClick={card.action}
                                        className="w-full text-left bg-transparent border-0"
                                        disabled={card.disabled}
                                    >
                                        {content}
                                    </button>
                                );
                            })}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">

                {/* ── Encabezado ── */}

                {openModalAddVariant &&
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
                }

                {openFormBuySupply &&
                    <>

                        <div className="flex items-start justify-between mb-8 mt-3">
                            <div>
                                <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 tracking-tight">
                                    Formulario Compras de Insumos
                                </h1>
                                <p className="text-sm text-zinc-400 mt-0.5">
                                    Gestión y seguimiento de facturas
                                </p>
                            </div>

                        </div>
                        <div className="flex items-center">
                            <SectionDivider className="flex-1">
                                Detalle Compra
                            </SectionDivider>

                            {openDetailFormBuy?
                            <button
                                onClick={changeOpen}
                                className="flex items-center gap-1 ml-auto"
                            >
                                <ChevronDown size={30} />
                                <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">CERRAR</span>
                            </button>: <button
                                onClick={changeOpen}
                                className="flex items-center gap-1 ml-auto"
                            >
                                <ChevronUp size={30} />
                                <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">ABRIR</span>
                            </button>

                            }
                        </div>

                        {
                            openDetailFormBuy &&
                            <FormAddBuySupply openFormBuySupply={openFormBuySupply} setOpenFormBuySupply={setOpenFormBuySupply} />
                                  
                        }
                      

                        <SectionDivider>Compras mes actual</SectionDivider>


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

                        <SectionDivider>Detalle de compra seleccionada</SectionDivider>


                        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                            <TableDetailBuys stateDetailsBuy={stateDetailsBuy?.detailsBuy} />
                        </div>
                    </>
                }

                {openModalSupply &&
                    <>
                      <FormAddSupplyGral openModal={openModalSupply} setOpenModal={setOpenModalSupply}/>
                    </>
                }

            </div>


            <ModalAddSupplier
                openModal={openModalSupplier}
                setOpenModal={setOpenModalSupplier}
            />

        </div>
    )
}

export default TableBuySupplies


//   <div className="flex items-center">
//                             <SectionDivider className="flex-1">
//                                 Detalle Compra
//                             </SectionDivider>

//                             <button
//                                 onClick={changeOpen}
//                                 className="flex items-center gap-1 ml-auto"
//                             >
//                                 <ChevronUp size={30} />
//                                 <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">ABRIR</span>
//                             </button>
//                         </div> 
                        
//                         }
