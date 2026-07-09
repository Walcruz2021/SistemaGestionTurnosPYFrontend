
import { motion } from "framer-motion";
import { Search, X, ChevronDown, Tag, Layers, CalendarPlus } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import Select, { components } from "react-select";
import { useSelector, useDispatch } from "react-redux";

/**
 * allows an typeSupply to be filtered. The type of filtered input is displayed in a table. Then this supply is selected to add variant
 * @param {*} listSuppliesGral (array supplies gral)
 * @param stateListSuppliesGral
 * @param setStateListSuppliesGral 
 * @param stateActiveTable display the table (true) does not display the table (false)
 * @param setStateActiveTable
 * @returns setStateListSupplies filtered by parameters. Is used in FormAddvariant
 */

const SearchSupplyFormAddvariant = ({ listSuppliesGral, stateListSuppliesGral, setStateListSuppliesGral, stateActiveTable, setStateActiveTable }) => {
    //stateSearch is word writed in input search
    const [stateSearch, setSearch] = useState("");
    const [stateSelectedCategory, setStateSelectedCategory] = useState();
    const listBrand = useSelector((state) => state.gralRed.listBrands);
    const listCategories = useSelector((state) => state.category.arrayCategories);
    const [brand, setBrand] = useState(null);
    const [stateSelectedBrand, setStateSelectedBrand] = useState();
    const [supplySelected, setSupplySelected] = useState(null);
    //will indicate the search engine's actions
    const [brandToSearch, setBrandToSearch] = useState(null);
    const [categoryToSearch, setCategoryToSearch] = useState(null);


    //Reset the table when a word is not found in the search engine.
    useEffect(() => {
        if (stateSearch) {
            setStateActiveTable(true)
        } else {
            setStateActiveTable(false)
        }
    }, [stateSearch])

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
        let result = Array.isArray(listSuppliesGral)
            ? [...listSuppliesGral]
            : [];

        if (stateSearch.trim()) {
            result = result.filter((s) =>
                s.nameSupply
                    ?.toLowerCase()
                    .includes(stateSearch.toLowerCase())
            );
        }

        if (brandToSearch) {
            result = result.filter(
                (s) => s?.idBrand === brandToSearch.value
            );
        }

        if (categoryToSearch) {

            result = result.filter(
                (s) => s?.idCategory === categoryToSearch.value
            );
        }

        return result;
    }, [
        listSuppliesGral,
        stateSearch,
        brandToSearch,
        categoryToSearch,
        stateSearch
    ]);


    useEffect(() => {
        if (suppliesFiltered) {
            setStateListSuppliesGral(suppliesFiltered)
        }
    }, [suppliesFiltered])

    const handleChangeSelectCategory = (selected) => {
        setSupplySelected(null);

        setStateSelectedCategory(selected);

        // clean brand
        setStateSelectedBrand(null);

        // clean applied filters
        setCategoryToSearch(null);
        setBrandToSearch(null);
        setStateActiveTable(false)
    };




    //when the user clicks the search button
    const handleSearch = (e) => {
        e.preventDefault();
        setCategoryToSearch(stateSelectedCategory);
        setBrandToSearch(stateSelectedBrand);
        setStateActiveTable(true)
    };

    //-------------------------------------------------
    // MANEJO DE FILTROS
    //-------------------------------------------------
    const handleChangeSelectBrand = (selected) => {
        setSupplySelected(null);
        setStateSelectedBrand(selected);
        setBrandToSearch(null);
        setStateActiveTable(false)
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
                                        <FilterChip label={`"${stateSearch}"`} onRemove={() => { setSearch("") }} />
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
                                type="button"
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
    )

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
}

export default SearchSupplyFormAddvariant