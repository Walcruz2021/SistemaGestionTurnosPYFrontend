import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingBag, Package, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Select, { components } from "react-select";
import { getBrands } from "../../reducer/actions/actionBrand.jsx";
import { listCategories } from "../../reducer/actions/category/actionCategory.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    getListSupplies,
    actionsOrderSupplies,
} from "../../reducer/actions/supply/actionsSupply.js";
import { listSuppliesStore } from "../../reducer/actions/companySupply/actionCompanySupply.jsx"
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons";
import ProductGrid from "./ProductGrid.jsx"
import { Search, X, ChevronDown, Tag, Layers, CalendarPlus } from "lucide-react";

const StoreVirtual = () => {
    const dispatch = useDispatch();
    const companySelectedMenu = useSelector(
        (state) => state.company.companySelected
    );

    const listCategories = useSelector((state) => state.gralRed.listCategories);
    const listSuppliesEcommerce = useSelector(
        (state) => state.companySupply.listSuppliesStore
    );


    const listBrand = useSelector((state) => state.gralRed.listBrands);



    const [order, setOrder] = useState(false);
    const [stateFilterCategory, setStateFilterCategory] = useState(false);
    const [stateFilterBrand, setStateFilterBrand] = useState(false);

    const [stateSelectedCategory, setStateSelectedCategory] = useState();

    const [stateSelectedBrand, setStateSelectedBrand] = useState();
    const [supplySelected, setSupplySelected] = useState(null);

    const [stateSearch, setSearch] = useState("");
    const [stateOpenModal, setStateOpenModal] = useState(false);
    const [stateDataSupply, setDataSupply] = useState();
    const [stateDetailsSup, setStateDetailsSup] = useState({
        detailsSup: "",
    });

    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(listSuppliesStore(companySelectedMenu._id));
            dispatch(getBrands());
        }
    }, [companySelectedMenu, dispatch]);

    // ------- SELECTOR MARCAS -------
    const selectBrand = listBrand?.map((b) => ({
        value: b._id,
        label: b.nameBrand,
    }));

    // ------- SELECTOR CATEGORIAS -------
    const selectCategory = listCategories?.map((c) => ({
        value: c.name,
        label: c.name,
    }));

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

        //en la tabla de ventas esta esta condicion pero aqui no me sirve ya que se seleeciona un insumo pero quiero seguir realizando busquedas 
        // if (supplySelected) return [];

        let result = listSuppliesEcommerce || [];

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
            console.log(result)
        }

        if (!stateSearch && !stateSelectedBrand && !stateSelectedCategory) {
            return result;
        }
        return result;
    }, [listSuppliesEcommerce, stateSearch, stateSelectedBrand, stateSelectedCategory, supplySelected]);


    function handleOrder(e) {
        setOrder(!order);
        dispatch(actionsOrderSupplies(order));
    }

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

    // PAGINACION
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);

    // PAGINATION
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = suppliesFiltered?.slice(
        indexOfFirstItem,
        indexOfLastItem
    );



    const totalPages = Math.ceil(
        (suppliesFiltered?.length || 0) / itemsPerPage
    );

    // NEXT PAGE
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    // PREV PAGE
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    // SMART PAGINATION
    const generatePagination = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(
                    1,
                    "...",
                    totalPages - 4,
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                );
            } else {
                pages.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages
                );
            }
        }

        return pages;
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
        <div className="min-h-screen bg-zinc-50">


            {/* Header */}
            <div className="bg-white border-b border-zinc-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-zinc-900 flex items-center justify-center">
                            <span className="text-white text-xs font-black">P</span>
                        </div>
                        <div>
                            <p className="text-zinc-900 font-bold text-sm leading-none">PetShop</p>

                        </div>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-medium hidden sm:block">
                        Vista previa — Grilla de productos
                    </p>
                </div>
            </div>

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


            {/* Content */}
            <div className="max-w-7xl mx-auto px-3 sm:px-8 py-10">

                {/* Section header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-medium mb-1">Catálogo</p>
                        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">Todos los productos</h1>
                    </div>
                </div>

                <div className="h-px w-full bg-zinc-200 mb-8" />

                <ProductGrid currentItems={currentItems} slug="petshop-demo" />

                <p className="mt-12 text-center text-[10px] uppercase tracking-[0.3em] text-zinc-300 font-medium">
                    Componente: ProductGrid · Vista previa
                </p>
            </div>
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

export default StoreVirtual;


