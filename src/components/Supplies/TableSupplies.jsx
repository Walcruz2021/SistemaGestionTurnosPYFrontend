import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TableDetailSupplies from "./TableDetailSupplies.jsx";
import { useSelector, useDispatch } from "react-redux";
import ModalEditSupply from "../Modal/Supply/ModalEditSupply.js";
import Select, { components } from "react-select";
import listCategories from "../../reducer/actions/category/actionCategory";
import "../../../src/App.css";
import {
    getListSupplies,
    actionsOrderSupplies,
} from "../../reducer/actions/supply/actionsSupply.js";

import TableStockBatch from "../StockBatch/TableStockBatch.jsx";
import { list } from "postcss";
import { Search, X, ChevronDown, Tag, Layers, CalendarPlus } from "lucide-react";
import { motion } from "framer-motion";
import TableSupplyVariants from "./TableSupplyVariants.jsx";
import { FaFileInvoice } from "react-icons/fa6";
import { MdDiscount } from "react-icons/md";

/**
 * Main table of supplies, with search, filter and pagination. When selecting a supply, it shows its details, variants and related batches.
 * @param {*} 
 * @returns table supplies, variants and batches
 */

const TableSupplies = ({ setInfo, stateInfo }) => {
    const dispatch = useDispatch();
    const companySelectedMenu = useSelector(
        (state) => state.company.companySelected
    );

    const [brand, setBrand] = useState(null);
    const listCategories = useSelector((state) => state.category.arrayCategories);

    //@endpoint GET /api/getListSupplies/:idCompany
    const listSupplies = useSelector((state) => state.supply.listSupplies);

    const listBrand = useSelector((state) => state.gralRed.listBrands);


    const [order, setOrder] = useState(false);
    const [stateFilterCategory, setStateFilterCategory] = useState(false);
    const [stateFilterBrand, setStateFilterBrand] = useState(false);

    const [stateSelectedCategory, setStateSelectedCategory] = useState();
    const [categoryToSearch, setCategoryToSearch] = useState(null);
    const [stateSelectedBrand, setStateSelectedBrand] = useState();
    //will indicate the search engine's actions
    const [brandToSearch, setBrandToSearch] = useState(null);


    const [supplySelected, setSupplySelected] = useState(null);

    const [stateSearch, setSearch] = useState("");
    const [stateOpenModal, setStateOpenModal] = useState(false);
    const [stateDataSupply, setDataSupply] = useState();
    const [stateBatches, setStateBatches] = useState([]);
    const [stateDetailsSup, setStateDetailsSup] = useState({
        detailsSup: "",
    });



    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(getListSupplies(companySelectedMenu._id));

        }
    }, [companySelectedMenu, dispatch]);


    // ------- SELECTOR MARCAS -------
    const selectBrand = listBrand?.map((b) => ({
        value: b._id,
        label: b.nameBrand,
    }));


    // --------------------------
    // SELECT OPTIONS
    // --------------------------
    const categoryOptions = listCategories?.map((c) => ({
        value: c._id,
        label: c.name
    }));

    const filteredBrands = useMemo(() => {


        const brands = !stateSelectedCategory
            ? listBrand
            : listBrand?.filter((b) =>
                b.categories?.some(
                    (cat) => cat._id === stateSelectedCategory.value
                )
            );



        return brands?.map((b) => ({
            value: b._id,
            label: b.nameBrand
        }));

    }, [listBrand, stateSelectedCategory]);



    const suppliesFiltered = useMemo(() => {
        let result = [...listSupplies];

        // Buscar por nombre
        if (stateSearch.trim()) {
            result = result.filter((s) =>
                s.global.nameSupply
                    .toLowerCase()
                    .includes(stateSearch.toLowerCase())
            );
        }

        // Filtrar por categoría
        if (categoryToSearch) {
            result = result.filter((s) =>
                s.global.categories?.some(
                    (cat) => cat._id === categoryToSearch.value
                )
            );
        }

        // Filtrar por marca
        if (brandToSearch) {
            result = result.filter(
                (s) => s.global.idBrand === brandToSearch.value
            );
        }

        return result;
    }, [
        listSupplies,
        stateSearch,
        categoryToSearch,
        brandToSearch
    ]);


    const handleChangeSelectCategory = (selected) => {
        setSupplySelected(null);

        setStateSelectedCategory(selected);

        // clean brand
        setStateSelectedBrand(null);

        // clean applied filters
        setCategoryToSearch(null);
        setBrandToSearch(null);
    };

    function handleOrder(e) {
        setOrder(!order);
        dispatch(actionsOrderSupplies(order));
    }

    //when the user clicks the search button
    const handleSearch = () => {
        setCategoryToSearch(stateSelectedCategory);
        setBrandToSearch(stateSelectedBrand);
    };

    //-------------------------------------------------
    // MANEJO DE SELECCIÓN DE INSUMO
    //-------------------------------------------------
    const handleDetailsSupplies = (e, props) => {
        e.preventDefault();

        const selected = props.sup;

        setSupplySelected(selected._id);
        setStateDetailsSup(selected);

        // // Reset filtros
        setStateSelectedBrand(null);
        setStateSelectedCategory(null);
        setStateBatches([]);
        setSearch("");
    };

    //-------------------------------------------------
    // MANEJO DE FILTROS
    //-------------------------------------------------
    const handleChangeSelectBrand = (selected) => {
        setSupplySelected(null);
        setStateSelectedBrand(selected);
        setBrandToSearch(null);
    };



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

    const CustomControl = ({ children, ...props }) => {
        return (
            <components.Control {...props}>
                <Tag size={18} className="ml-2 text-gray-500" />
                {children}
            </components.Control>
        );
    };

    const CustomControlSelect1 = ({ children, ...props }) => {
        return (
            <components.Control {...props}>
                <Tag size={14} className="ml-2 text-gray-500" />
                {children}
            </components.Control>
        );
    };

    const CustomControlSelect2 = ({ children, ...props }) => {
        return (
            <components.Control {...props}>
                <Layers size={14} className="ml-2 text-gray-500" />
                {children}
            </components.Control>
        );
    };

    return (
        <div className="px-0.5 md:px-8 py-8 max-w-7xl mx-auto">

            {/* CONTAINER SEARCH */}
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
                                            options={filteredBrands}
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
                                <button
                                    disabled={!stateSelectedCategory && !stateSelectedBrand}
                                    onClick={handleSearch}
                                    className={`
        flex items-center gap-2 px-5 py-2.5
        bg-gray-900 text-white
        rounded-lg font-medium
        shadow-sm transition-all duration-200
        hover:bg-black hover:shadow-md
        active:scale-95
        disabled:bg-gray-400
        disabled:text-gray-500
        disabled:cursor-not-allowed
    `}
                                >
                                    <Search className="w-4 h-4" />
                                    Buscar
                                </button>
                            </div>


                        </div>


                    </motion.div>


                </div>

            </div>

            {/* INSUMOS */}


            {/* TABLA + PAGINACIÓN SOLO SI HAY RESULTADOS */}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.4,
                }}
                className="bg-white  mb-4"
            >

                <div className="p-1 overflow-x-auto">

                    {suppliesFiltered && (
                        <>
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
                                                Tabla de Insumos
                                            </h2>

                                            <p className="text-zinc-500 text-sm mt-0.5">
                                                Listado Completo de Insumos
                                            </p>

                                        </div>

                                        <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

                                            <CalendarPlus className="w-4 h-4 text-white" />

                                        </div>

                                    </div>

                                </motion.div>
                            </div>

                            <motion.div initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.3,
                                    duration: 0.4,
                                }}
                                className="bg-white  mb-6">


                                <div>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-zinc-950">
                                                <th className="px-3 md:px-5 py-3.5 text-left  font-semibold text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs">
                                                    Insumo{" "}
                                                    <FontAwesomeIcon
                                                    // onClick={handleOrder}
                                                    // color={order ? "#FF846A" : "#A2DFFF"}
                                                    // icon={faSortAlphaDown}
                                                    // size="lg"
                                                    // style={{ cursor: "pointer" }}
                                                    />
                                                </th>
                                                <th className="px-3 md:px-5 py-3.5 text-left  font-semibold text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs">Marca</th>
                                                <th className="px-3 md:px-5 py-3.5 text-left  font-semibold text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs">Categoria</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {currentItems && currentItems.map((sup, index) => (
                                                <motion.tr key={sup._id} animate={{
                                                    opacity: 1,
                                                }}
                                                    transition={{
                                                        delay:
                                                            0.35 +
                                                            index * 0.05,
                                                    }}
                                                    className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
                                                >
                                                    <td className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={(e) =>
                                                            handleDetailsSupplies(e, {
                                                                sup,
                                                            })
                                                        }
                                                    >

                                                        {sup.global.nameSupply}
                                                    </td>

                                                    <td className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal">{sup.global.nameBrand}</td>
                                                    <td className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal">{sup.global.nameCategory}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>

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
                        </>
                    )}

                    {/* DETALLES */}

                    {supplySelected ? <>

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
                                        Insumo
                                    </h2>

                                    <p className="text-zinc-500 text-sm mt-0.5">
                                        Insumo Seleccionado
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

                                        {/* Imagen */}
                                        <div className="flex justify-center md:justify-start ">
                                            <img
                                                src={stateDetailsSup.global?.imgStore}
                                                alt="Insumo"
                                                className="w-24 h-28 object-cover"
                                            />
                                        </div>

                                        {/* Insumo */}
                                        <div className="flex flex-col justify-center">
                                            <FaFileInvoice size="1.7rem" className="mb-2 text-zinc-700" />

                                            <small className="text-zinc-500 instrument-serif-regular">
                                                Insumo
                                            </small>

                                            <strong className="instrument-serif-regular text-zinc-900">
                                                {stateDetailsSup.global?.nameSupply ?? ""}
                                            </strong>
                                        </div>

                                        {/* Marca */}
                                        <div className="flex flex-col justify-center">
                                            <MdDiscount size="1.7rem" className="mb-2 text-zinc-700" />

                                            <small className="text-zinc-500 instrument-serif-regular">
                                                Marca
                                            </small>

                                            <strong className="instrument-serif-regular text-zinc-900">
                                                {stateDetailsSup.global?.nameBrand ?? ""}
                                            </strong>
                                        </div>

                                    </div>
                                </div>

                                <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

                                    <CalendarPlus className="w-4 h-4 text-white" />

                                </div>

                            </div>


                        </motion.div>

                        <TableSupplyVariants supplySelected={stateDetailsSup} setSupplySelected={setSupplySelected} stateBatches={stateBatches} setStateBatches={setStateBatches} />

                    </> :
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="bg-white border border-zinc-200 rounded-2xl overflow-hidden mb-3"
                        >

                            {/* CARD TITLE */}
                            <div className="px-6 py-2 border-b border-zinc-100 flex items-center justify-between">

                                <div>

                                    <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
                                        Insumos
                                    </h2>

                                    <p className="text-zinc-500 text-sm mt-0.5">
                                        Seleccione un Inusmo para ver sus detalles
                                    </p>

                                </div>

                                <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

                                    <CalendarPlus className="w-4 h-4 text-white" />

                                </div>

                            </div>

                        </motion.div>

                    }
                </div>

            </motion.div>


            <ModalEditSupply
                stateOpenModal={stateOpenModal}
                setStateOpenModal={setStateOpenModal}
                stateDataSupply={stateDataSupply}
                setDataSupply={setDataSupply}
            />
        </div>
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

export default TableSupplies;
