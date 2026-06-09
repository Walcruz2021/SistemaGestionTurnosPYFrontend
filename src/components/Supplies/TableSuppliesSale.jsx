import React, { useState, useEffect, useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Select, { components } from "react-select";
import { Search, X, ChevronDown, Tag, Layers, CalendarPlus } from "lucide-react";
import { motion } from "framer-motion";
// Componentes
import TableSuppliesSaleDetails from "./TableSuppliesSaleDetails.jsx";
import TableStockBatch from "../StockBatch/TableStockBatch.jsx";
import ModalEditSupply from "../Modal/Supply/ModalEditSupply.js";

// Datos
import {listCategories} from "../../reducer/actions/category/actionCategory.jsx";

// Actions
import { getListSupplies, actionsOrderSupplies } from "../../reducer/actions/supply/actionsSupply.js";
import { getBrands } from "../../reducer/actions/actionBrand.jsx";

const TableSuppliesSale = () => {
    const dispatch = useDispatch();
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplies = useSelector((state) => state.supply.listSupplies);
    const listCategories = useSelector((state) => state.category.listCategories);
    const listBrand = useSelector((state) => state.gralRed.listBrands);
    const [order, setOrder] = useState(false);
    const [stateSearch, setSearch] = useState("");
    const [supplySelected, setSupplySelected] = useState(null);

    const [stateSelectedBrand, setStateSelectedBrand] = useState(null);
    const [stateSelectedCategory, setStateSelectedCategory] = useState(null);

    const [stateOpenModal, setStateOpenModal] = useState(false);
    const [stateDataSupply, setDataSupply] = useState(null);

    //estado que manjera el insumo seleccionado
    const [stateDetailsSup, setStateDetailsSup] = useState({});
    const [stateListSales, setStateListSales] = useState([]);

    //estado que manejara el array de los insumos a vender que se seleccionaron
    const [stateValue, setStateValue] = useState([]);


    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(getListSupplies(copmanySelectedMenu._id));
            dispatch(getBrands());
        }
    }, [companySelectedMenu, dispatch]);


    // --------------------------
    // SELECT OPTIONS
    // --------------------------
    const brandOptions = listBrand?.map((b) => ({
        value: b._id,
        label: b.nameBrand
    }));

    const categoryOptions = listCategories.map((c) => ({
        value: c.name,
        label: c.name
    }));

    //-------------------------------------------------
    // FILTRADO OPTIMIZADO
    //-------------------------------------------------
    const suppliesFiltered = useMemo(() => {
        // Si se seleccionó un insumo → tabla vacía
        if (supplySelected) return [];

        let result = listSupplies;

        // Buscar por texto
        if (stateSearch.trim() !== "") {
            result = result.filter((s) =>
                s.global.nameSupply.toLowerCase().includes(stateSearch.toLowerCase())
            );
        }

        // Filtrar por marca
        if (stateSelectedBrand) {
            result = result.filter((s) => s.global.idBrand === stateSelectedBrand.value);
        }

        // Filtrar por categoría
        if (stateSelectedCategory) {
            result = result.filter((s) => s.global.categorySupply === stateSelectedCategory.value);
        }

        if (!stateSearch && !stateSelectedBrand && !stateSelectedCategory) {
            return null;
        }
        return result;
    }, [listSupplies, stateSearch, stateSelectedBrand, stateSelectedCategory, supplySelected]);


    //-------------------------------------------------
    // MANEJO DE SELECCIÓN DE INSUMO
    //-------------------------------------------------
    const handleDetailsSupplies = (e, props) => {
        e.preventDefault();

        const selected = props.sup;
        setSupplySelected(selected._id);
        setStateDetailsSup(selected);

        // Reset filtros
        setStateSelectedBrand(null);
        setStateSelectedCategory(null);
        setSearch("");
    };

    //-------------------------------------------------
    // MANEJO DE FILTROS
    //-------------------------------------------------
    const handleChangeSelectBrand = (selected) => {
        setSupplySelected(null);
        setStateSelectedBrand(selected);
    };

    const handleChangeSelectCategory = (selected) => {
        setSupplySelected(null);
        setStateSelectedCategory(selected);
    };

    //-------------------------------------------------
    // ORDENO LA TABLA
    //-------------------------------------------------
    const handleOrder = () => {
        setOrder(!order);
        dispatch(actionsOrderSupplies(order));
    };


    function addSale(supply) {
        console.log(supply)
        setStateValue(prev => [...prev, supply]);
    }


    // ---------------- PAGINACIÓN ----------------

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    //
    const totalPages = suppliesFiltered
        ? Math.ceil(suppliesFiltered.length / itemsPerPage)
        : 0;

    const currentItems =
        suppliesFiltered?.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        ) ?? [];

    const CustomControlSelect1 = ({ children, ...props }) => {
        return (
            <components.Control {...props}>
                <Tag size={14} className="ml-2 text-gray-500" />
                {children}
            </components.Control>
        );
    };


    // FILTERED SEARCH
    const CustomControlSelect2 = ({ children, ...props }) => {
        return (
            <components.Control {...props}>
                <Layers size={14} className="ml-2 text-gray-500" />
                {children}
            </components.Control>
        );
    };

    return (
        <>

            <div className="px-0.5 md:px-8 py-1 max-w-7xl mx-auto">

                {/* BUSCADOR */}
                <div className="bg-gray-50 flex items-center justify-center px-4 py-0">
                    <div className="w-full max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-full max-w-2xl mx-auto"
                        >

                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-visible mb-3">
                                {/* Top accent line */}
                                <div className="h-[2px] w-full bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200" />
                                <div className="px-6 py-6 space-y-5">.

                                    <div className="inline-flex items-center bg-black px-4 py-2">
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-white font-medium flex items-center gap-2 mt-3">
                                            <span className="inline-block w-4 h-px bg-white" />
                                            Explorar insumos
                                        </p>
                                    </div>

                                    {/* BUSCADOR */}
                                    <div className="relative group">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-gray-600 transition-colors duration-200" />
                                        <input
                                            className="w-full pl-11 pr-10 py-3 rounded-lg border border-gray-500 text-sm text-gray-800 placeholder-gray-500 bg-gray-50 focus:bg-white focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
                                            type="text"
                                            placeholder={`Busque un Insumo (minúsculas)`}
                                            value={stateSearch}
                                            onChange={(e) => {
                                                setCurrentPage(1);
                                                setSearch(e.target.value);
                                            }}
                                        />


                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        <div className="space-y-1.5">

                                            {/* FILTRO POR MARCA */}
                                            <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-3">
                                                <Tag className="w-4 h-4" />
                                                Marca
                                            </label>
                                            <Select
                                                className="classSelect instrument-serif-regular"
                                                placeholder="Seleccione Marca"
                                                onChange={handleChangeSelectBrand}
                                                value={stateSelectedBrand}
                                                options={brandOptions}
                                                isClearable
                                                components={{
                                                    Control: CustomControlSelect1
                                                }}
                                                menuPortalTarget={document.body}
                                                menuPosition="fixed"
                                                styles={{
                                                    menuPortal: (base) => ({
                                                        ...base,
                                                        zIndex: 9999
                                                    })
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            {/* FILTRO POR CATEGORÍA */}
                                            <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-3">
                                                <Layers className="w-4 h-4" />
                                                Categoría
                                            </label>
                                            <Select
                                                className="classSelect instrument-serif-regular"
                                                placeholder="Seleccione Categoría"
                                                onChange={handleChangeSelectCategory}
                                                value={stateSelectedCategory}
                                                options={categoryOptions}
                                                isClearable
                                                components={{
                                                    Control: CustomControlSelect2
                                                }}
                                                menuPortalTarget={document.body}
                                                menuPosition="fixed"
                                                styles={{
                                                    menuPortal: (base) => ({
                                                        ...base,
                                                        zIndex: 9999
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Active filters indicator */}
                                    {(stateSearch || stateSelectedBrand || stateSelectedCategory) && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex flex-wrap gap-2 pt-1"
                                        >
                                            {stateSearch && (
                                                <FilterChip label={`"${stateSearch}"`} onRemove={() => { setSearch(""); setCurrentPage?.(1); }} />
                                            )}
                                            {stateSelectedBrand && (
                                                <FilterChip label={stateSelectedBrand.label} onRemove={() => handleChangeSelectBrand(null)} />
                                            )}
                                            {stateSelectedCategory && (
                                                <FilterChip label={stateSelectedCategory.label} onRemove={() => handleChangeSelectCategory(null)} />
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Debug info */}
                                    {/* <div className="mt-8 p-4 rounded-xl bg-white border border-gray-200 text-xs text-gray-400 space-y-1">
                                    <p><span className="text-gray-600 font-medium">Búsqueda:</span> {stateSearch || "—"}</p>
                                    <p><span className="text-gray-600 font-medium">Marca:</span> {brand?.label || "—"}</p>
                                    <p><span className="text-gray-600 font-medium">Categoría:</span> {category?.label || "—"}</p>
                                    <p><span className="text-gray-600 font-medium">Página:</span> {currentPage}</p>
                                </div> */}
                                </div>

                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* TABLA PRINCIPAL */}

                {
                    suppliesFiltered && (
                        <>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.3,
                                    duration: 0.4,
                                }}
                                className="bg-white  mb-2">

                                <div className="p-1 overflow-x-auto">

                                    <motion.div initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.3,
                                            duration: 0.4,
                                        }}
                                        className="bg-white  mb-1">


                                        <table className="w-full">

                                            {

                                                suppliesFiltered && !supplySelected &&
                                                <thead>
                                                    <tr className="bg-zinc-950">
                                                        <th className="px-3 md:px-5 py-3.5 text-left  font-semibold text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs">
                                                            Insumo{" "}
                                                            <FontAwesomeIcon
                                                                onClick={handleOrder}
                                                                icon={faSortAlphaDown}
                                                                style={{ cursor: "pointer" }}
                                                                color={order ? "#FF846A" : "#A2DFFF"}
                                                            />
                                                        </th>
                                                        <th className="px-3 md:px-5 py-3.5 text-left  font-semibold text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs">Categoría</th>
                                                        <th className="px-3 md:px-5 py-3.5 text-left  font-semibold text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs">Marca</th>
                                                        <th className="px-3 md:px-5 py-3.5 text-left  font-semibold text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs">Stock</th>
                                                    </tr>
                                                </thead>
                                            }


                                            <tbody>

                                                {currentItems.map((sup, index) => (
                                                    <motion.tr key={sup._id} animate={{
                                                        opacity: 1,
                                                    }}
                                                        transition={{
                                                            delay:
                                                                0.35 +
                                                                index * 0.05,
                                                        }}
                                                        className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">

                                                        {sup.totalStock > 0 ?
                                                            <td
                                                                className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal"
                                                                style={{ cursor: "pointer" }}
                                                                onClick={(e) =>
                                                                    handleDetailsSupplies(e, { sup })
                                                                }
                                                            >
                                                                {sup.global.nameSupply}
                                                            </td> :

                                                            <td
                                                                className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal"
                                                                style={{ color: "red" }}

                                                            >
                                                                {sup.global.nameSupply}
                                                            </td>

                                                        }
                                                        <td className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal">{sup.global.categorySupply}</td>
                                                        <td className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal">{sup.global.nameBrand}</td>
                                                        <td className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal">{sup.totalStock ?? 0}</td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>

                                        </table>

                                        {/* PAGINACIÓN NUMÉRICA */}
                                        {suppliesFiltered.length > itemsPerPage && (
                                            <div className="d-flex justify-content-center mt-3">
                                                <nav>
                                                    <ul className="pagination flex-wrap">

                                                        {/* BOTÓN ANTERIOR */}
                                                        <li
                                                            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                                                        >
                                                            <button
                                                                className="page-link"
                                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                            >
                                                                «
                                                            </button>
                                                        </li>

                                                        {/* PRIMERA PÁGINA */}
                                                        {currentPage > 3 && (
                                                            <>
                                                                <li className="page-item">
                                                                    <button
                                                                        className="page-link"
                                                                        onClick={() => setCurrentPage(1)}
                                                                    >
                                                                        1
                                                                    </button>
                                                                </li>

                                                                {currentPage > 4 && (
                                                                    <li className="page-item disabled">
                                                                        <span className="page-link">...</span>
                                                                    </li>
                                                                )}
                                                            </>
                                                        )}

                                                        {/* PÁGINAS CENTRALES */}
                                                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                                                            .filter(
                                                                (page) =>
                                                                    page >= currentPage - 1 &&
                                                                    page <= currentPage + 1
                                                            )
                                                            .map((page) => (
                                                                <li
                                                                    key={page}
                                                                    className={`page-item ${currentPage === page ? "active" : ""
                                                                        }`}
                                                                >
                                                                    <button
                                                                        className="page-link"
                                                                        onClick={() => setCurrentPage(page)}
                                                                    >
                                                                        {page}
                                                                    </button>
                                                                </li>
                                                            ))}

                                                        {/* ÚLTIMA PÁGINA */}
                                                        {currentPage < totalPages - 2 && (
                                                            <>
                                                                {currentPage < totalPages - 3 && (
                                                                    <li className="page-item disabled">
                                                                        <span className="page-link">...</span>
                                                                    </li>
                                                                )}

                                                                <li className="page-item">
                                                                    <button
                                                                        className="page-link"
                                                                        onClick={() => setCurrentPage(totalPages)}
                                                                    >
                                                                        {totalPages}
                                                                    </button>
                                                                </li>
                                                            </>
                                                        )}

                                                        {/* BOTÓN SIGUIENTE */}
                                                        <li
                                                            className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                                                }`}
                                                        >
                                                            <button
                                                                className="page-link"
                                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                            >
                                                                »
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        )}


                                    </motion.div>

                                </div>


                            </motion.div>

                        </>

                    )
                }


                {/* DETALLE DEL INSUMO */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="bg-white border border-zinc-200 rounded-2xl overflow-hidden mb-3"
                >

                    <div className="px-6 py-2 border-b border-zinc-100 flex items-center justify-between">

                        <div>

                            <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
                                Ventas
                            </h2>

                            <p className="text-zinc-400 text-sm mt-0.5">
                                Insumo seleccionado
                            </p>

                        </div>

                        <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

                            <CalendarPlus className="w-4 h-4 text-white" />

                        </div>

                    </div>
                </motion.div>


                <TableSuppliesSaleDetails dataSupplySeleted={stateDetailsSup} />


                {/* aqui deberia mostrar la compra mas antigua no todas las compras */}
                {/* <TableStockBatch idSupply={stateDetailsSup.detailsSup?._id} /> */}


            </div>

            {/* MODAL */}
            <ModalEditSupply
                stateOpenModal={stateOpenModal}
                setStateOpenModal={setStateOpenModal}
                stateDataSupply={stateDataSupply}
                setDataSupply={setDataSupply}
            />
        </>
    );
};

function FilterChip({ label, onRemove }) {
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
            {label}
            <button onClick={onRemove} className="text-gray-400 hover:text-gray-700 transition-colors">
                <X className="w-3 h-3" />
            </button>
        </span>
    );
}

export default TableSuppliesSale;
