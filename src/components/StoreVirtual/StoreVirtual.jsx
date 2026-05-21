import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingBag, Package, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Select from "react-select";
import { getBrands } from "../../reducer/actions/actionBrand.jsx";
import listCategories from "../../functions/categoriesSupplies.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    getListSupplies,
    actionsOrderSupplies,
} from "../../reducer/actions/supply/actionsSupply.js";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons";

const StoreVirtual = () => {
    const dispatch = useDispatch();
    const companySelectedMenu = useSelector(
        (state) => state.company.companySelected
    );

    const listSupplies = useSelector(
        (state) => state.supply.listSupplies
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
            dispatch(getListSupplies(companySelectedMenu._id));
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
            console.log(result)
        }

        if (!stateSearch && !stateSelectedBrand && !stateSelectedCategory) {
            return result;
        }
        return result;
    }, [listSupplies, stateSearch, stateSelectedBrand, stateSelectedCategory, supplySelected]);


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

    return (
        <div className="min-h-screen bg-zinc-100">

            {/* HERO */}
            <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-black to-zinc-900 text-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">

                    <div className="max-w-2xl">

                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-5">
                            <ShoppingBag className="w-4 h-4" />

                            <span className="text-sm tracking-wide">
                                Ecommerce Sistemapy
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                            Tienda Online
                        </h1>

                        <p className="text-zinc-300 text-sm md:text-base mt-5 leading-relaxed max-w-xl">
                            Descubrí productos exclusivos disponibles en nuestra tienda.
                            Comprá de forma rápida y simple desde cualquier dispositivo.
                        </p>

                    </div>
                </div>
            </section>

            <div className="container-lg table-responsive mb-4">
                {/* BUSCADOR */}
                <div className="containerSearch">
                    <input
                        className="inputBuscar instrument-serif-regular"
                        type="text"
                        placeholder={`Busque un Insumo (minúsculas)`}
                        value={stateSearch}
                        onChange={(e) => {
                            setCurrentPage(1);
                            setSearch(e.target.value);
                        }}
                    />
                </div>

                {/* FILTRO POR MARCA */}
                <p className="mt-3 instrument-serif-regular ">Filtrar por marca</p>
                <Select
                    className="classSelect instrument-serif-regular"
                    placeholder="Seleccione Marca"
                    onChange={handleChangeSelectBrand}
                    value={stateSelectedBrand}
                    options={brandOptions}
                    isClearable
                />




                {/* FILTRO POR CATEGORÍA */}
                <p className="mt-3 instrument-serif-regular">Filtrar por categoría</p>
                <Select
                    className="classSelect instrument-serif-regular"
                    placeholder="Seleccione Categoría"
                    onChange={handleChangeSelectCategory}
                    value={stateSelectedCategory}
                    options={categoryOptions}
                    isClearable
                />

            </div>

            {/* PRODUCTS */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">
                            Productos Disponibles
                        </h2>

                        <p className="text-zinc-500 mt-1 text-sm md:text-base">
                            Explorá todos los productos cargados en la tienda.
                        </p>
                    </div>

                    <div className="hidden md:flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-4 py-2 shadow-sm">
                        <Package className="w-4 h-4 text-zinc-500" />

                        <span className="text-sm font-medium text-zinc-700">
                            {listSupplies?.length || 0} productos
                        </span>
                    </div>

                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {currentItems?.map((product, index) => {

                        const image =
                            product?.imgStore?.[0] ||
                            "https://placehold.co/600x600/18181b/ffffff?text=Img not Found";

                        return (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {
                                    product.totalStock > 0 ?

                                        <Link
                                            to={`/tiendavirtual/${companySelectedMenu?.slug}/product/${product._id}`}
                                            className="group no-underline"
                                        >
                                            <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">

                                                {/* IMAGE */}
                                                <div className="relative overflow-hidden bg-zinc-100 aspect-square">

                                                    <img
                                                        src={image}
                                                        alt={product?.global?.nameSupply}
                                                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700  bg-white"
                                                    />

                                                    <div className="absolute top-3 left-3">
                                                        <div className="bg-black text-white text-[11px] uppercase tracking-wider px-3 py-1 rounded-full font-semibold">
                                                            {product?.global?.categorySupply}
                                                        </div>
                                                    </div>

                                                </div>

                                                {/* CONTENT */}
                                                <div className="p-5 flex flex-col gap-4">

                                                    <div>

                                                        <h3 className="text-zinc-900 font-bold text-lg leading-tight line-clamp-2 group-hover:text-black transition-colors">
                                                            {product?.global?.nameSupply}
                                                        </h3>

                                                        <div className="flex items-center gap-2 mt-2 text-sm text-zinc-500">
                                                            <span>{product?.global?.nameBrand}</span>

                                                            <span>•</span>

                                                            <span>
                                                                Talle {product?.global?.valueUnidMed}
                                                            </span>
                                                        </div>

                                                    </div>

                                                    {/* STOCK */}
                                                    <div className="flex items-center justify-between bg-zinc-100 rounded-2xl px-4 py-3 border border-zinc-200">

                                                        <div>
                                                            <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                                                                Stock
                                                            </p>

                                                            <p className="text-zinc-900 font-bold text-lg">
                                                                {product?.totalStock}
                                                            </p>
                                                        </div>

                                                        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
                                                            <Package className="w-5 h-5" />
                                                        </div>

                                                    </div>

                                                    {/* PRICE */}
                                                    <div className="flex items-center justify-between mt-1">

                                                        <div>
                                                            <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                                                                Precio
                                                            </p>

                                                            <h4 className="text-2xl font-black text-zinc-900">
                                                                ${product?.priceSale?.toLocaleString("es-AR")}
                                                            </h4>
                                                        </div>

                                                        <div className="w-11 h-11 rounded-2xl border border-zinc-300 group-hover:bg-black group-hover:border-black transition-all duration-300 flex items-center justify-center">
                                                            <ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-white transition-colors duration-300" />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </Link> :

                                        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">

                                            {/* IMAGE */}
                                            <div className="relative overflow-hidden bg-zinc-100 aspect-square">

                                                <img
                                                    src={image}
                                                    alt={product?.global?.nameSupply}
                                                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700"
                                                />

                                                <div className="absolute top-3 left-3">
                                                    <div className="bg-black text-white text-[11px] uppercase tracking-wider px-3 py-1 rounded-full font-semibold">
                                                        {product?.global?.categorySupply}
                                                    </div>
                                                </div>

                                            </div>

                                            {/* CONTENT */}
                                            <div className="p-5 flex flex-col gap-4">

                                                <div>

                                                    <h3 className="font-bold text-lg leading-tight line-clamp-2 transition-colors">
                                                        <span className="text-zinc-900 line-through">
                                                            {product?.global?.nameSupply}
                                                        </span>

                                                        <span className="text-red-600 ml-2">
                                                            (sin stock)
                                                        </span>
                                                    </h3>

                                                    <div className="flex items-center gap-2 mt-2 text-sm text-zinc-500">
                                                        <span>{product?.global?.nameBrand}</span>

                                                        <span>•</span>

                                                        <span>
                                                            Talle {product?.global?.valueUnidMed}
                                                        </span>
                                                    </div>

                                                </div>

                                                {/* STOCK */}
                                                <div className="flex items-center justify-between bg-zinc-100 rounded-2xl px-4 py-3 border border-zinc-200">

                                                    <div>
                                                        <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                                                            Stock
                                                        </p>

                                                        <p className="text-zinc-900 font-bold text-lg">
                                                            {product?.totalStock}
                                                        </p>
                                                    </div>

                                                    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
                                                        <Package className="w-5 h-5" />
                                                    </div>

                                                </div>

                                                {/* PRICE */}
                                                <div className="flex items-center justify-between mt-1">

                                                    <div>
                                                        <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
                                                            Precio
                                                        </p>

                                                        <h4 className="text-2xl font-black text-zinc-900">
                                                            ${product?.priceSale?.toLocaleString("es-AR")}
                                                        </h4>
                                                    </div>

                                                    <div className="w-11 h-11 rounded-2xl border border-zinc-300 group-hover:bg-black group-hover:border-black transition-all duration-300 flex items-center justify-center">
                                                        <ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-white transition-colors duration-300" />
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                }
                            </motion.div>
                        );
                    })}
                </div>

                {/* PAGINATION */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mt-14">

                    {/* INFO */}
                    <div className="text-sm text-zinc-500 font-medium">
                        Mostrando{" "}

                        <span className="font-bold text-zinc-900">
                            {indexOfFirstItem + 1}
                        </span>

                        {" "}a{" "}

                        <span className="font-bold text-zinc-900">
                            {Math.min(indexOfLastItem, listSupplies?.length)}
                        </span>

                        {" "}de{" "}

                        <span className="font-bold text-zinc-900">
                            {listSupplies?.length}
                        </span>

                        {" "}productos
                    </div>

                    {/* CONTROLS */}
                    <div className="flex items-center gap-2 flex-wrap justify-center">

                        {/* PREV */}
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`h-11 px-4 rounded-2xl border transition-all duration-300 flex items-center gap-2 text-sm font-semibold
                            ${currentPage === 1
                                    ? "bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed"
                                    : "bg-white border-zinc-300 text-zinc-800 hover:bg-black hover:text-white hover:border-black shadow-sm hover:shadow-lg"
                                }`}
                        >
                            <ChevronLeftIcon className="w-4 h-4" />

                            <span className="hidden sm:block">
                                Anterior
                            </span>
                        </button>

                        {/* PAGES */}
                        {generatePagination().map((page, index) => {

                            if (page === "...") {
                                return (
                                    <div
                                        key={index}
                                        className="w-11 h-11 flex items-center justify-center text-zinc-400 font-bold"
                                    >
                                        ...
                                    </div>
                                );
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentPage(page);

                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        });
                                    }}
                                    className={`w-11 h-11 rounded-2xl text-sm font-bold transition-all duration-300
                                    ${currentPage === page
                                            ? "bg-black text-white shadow-xl scale-105"
                                            : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300"
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        {/* NEXT */}
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`h-11 px-4 rounded-2xl border transition-all duration-300 flex items-center gap-2 text-sm font-semibold
                            ${currentPage === totalPages
                                    ? "bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed"
                                    : "bg-white border-zinc-300 text-zinc-800 hover:bg-black hover:text-white hover:border-black shadow-sm hover:shadow-lg"
                                }`}
                        >
                            <span className="hidden sm:block">
                                Siguiente
                            </span>

                            <ChevronRightIcon className="w-4 h-4" />
                        </button>

                    </div>
                </div>

            </section>
        </div>
    );
};

export default StoreVirtual;