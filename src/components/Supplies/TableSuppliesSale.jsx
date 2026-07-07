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
import SearchSupplyAddSale from "../Search/SearchSupplyAddSale.jsx"
// Datos
import { listCategories } from "../../reducer/actions/category/actionCategory.jsx";

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

    //(stateListSupplies) array filtered by supply selected
    const [stateListSupplies, setStateListSupplies] = useState([])

    const [stateActiveTable, setStateActiveTable] = useState(false)

    const [supplySelected, setSupplySelected] = useState({
        nameSupply: "", variants: [

        ]
    });


    const [supplySelectedVariant, setSupplySelectedVariant] = useState(null);

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
            dispatch(getListSupplies(companySelectedMenu._id));
            dispatch(getBrands(companySelectedMenu?.category));
        }
    }, [companySelectedMenu, dispatch]);

    //-------------------------------------------------
    // MANEJO DE SELECCIÓN DE INSUMO
    //-------------------------------------------------
    const handleDetailsSupplies = (e, props) => {

        e.preventDefault();

        const selected = props?.sup;
        setSupplySelected({
            nameSupply: selected?.global.nameSupply,
            variants: selected?.variants
        });

        setStateDetailsSup(selected);

        // Reset filtros
        setStateSelectedBrand(null);
        setStateSelectedCategory(null);
        setSearch("");
    };

    //-------------------------------------------------
    // MANEJO DE SELECCIÓN DE VARIANTES
    //-------------------------------------------------
    const handleDetailsSuppliesVariant = (e, variant, nameSupply) => {
        e.preventDefault();
        const newDataVariant = {
            ...variant,
            nameSupply: nameSupply
        };


        const selected = newDataVariant;
        setSupplySelectedVariant(selected);
        setStateDetailsSup(selected);

        // Reset filtros
        setStateSelectedBrand(null);
        setStateSelectedCategory(null);
        setSearch("");
    };


    //-------------------------------------------------
    // ORDENO LA TABLA
    //-------------------------------------------------
    const handleOrder = () => {
        setOrder(!order);
        dispatch(actionsOrderSupplies(order));
    };


    function addSale(supply) {

        setStateValue(prev => [...prev, supply]);
    }


    // ---------------- PAGINACIÓN ----------------

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    //
    const totalPages = Array.isArray(stateListSupplies)
        ? Math.ceil(stateListSupplies.length / itemsPerPage)
        : 0;

    const currentItems = Array.isArray(stateListSupplies)
        ? stateListSupplies.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
        : [];


    console.log(currentItems)
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


    const filterCategories = (arrayCategories) => {

        let stringCategories = ""
        if (Array.isArray(arrayCategories)) {

            arrayCategories.map((cat) => {
                stringCategories = stringCategories.concat("/", cat.name)
            })
        }

        return stringCategories
    }

    return (
        <>

            <div className="px-0.5 md:px-8 py-1 max-w-7xl mx-auto">


                {/* BUSCADOR */}
                <SearchSupplyAddSale listSupplies={listSupplies} stateListSupplies={stateListSupplies} setStateListSupplies={setStateListSupplies} stateActiveTable={stateActiveTable} setStateActiveTable={setStateActiveTable} setSupplySelectedFromTable={setSupplySelected}/>

                {

                    //exists supplies and exists option search selected
                    currentItems.length > 0 && stateActiveTable ?

                        <>
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
                                            Listado de insumos para venta
                                        </p>

                                    </div>

                                    <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

                                        <CalendarPlus className="w-4 h-4 text-white" />

                                    </div>

                                </div>
                            </motion.div>



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

                                                    </tr>
                                                </thead>
                                            }


                                            <tbody>

                                                {currentItems?.map((sup, index) => (

                                                    <motion.tr key={sup._id} animate={{
                                                        opacity: 1,
                                                    }}
                                                        transition={{
                                                            delay:
                                                                0.35 +
                                                                index * 0.05,
                                                        }}
                                                        className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">



                                                        <td
                                                            className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={(e) =>
                                                                handleDetailsSupplies(e, { sup })
                                                            }
                                                        >
                                                            {sup?.global?.nameSupply}
                                                        </td>


                                                        <td className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal">{filterCategories(sup?.global?.categories)}</td>
                                                        <td className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal">{sup?.global?.nameBrand}</td>

                                                    </motion.tr>
                                                ))}
                                            </tbody>

                                        </table>

                                        {/* PAGINACIÓN NUMÉRICA */}
                                        {stateListSupplies.length > itemsPerPage && (
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
                        :

                        //not exists supplies and exists option search selected
                        currentItems.length < 0 && stateActiveTable ?
                            <>
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
                                                NO HAY INSUMOS PARA LA OPCION SELECCIONADA
                                            </p>

                                        </div>

                                        <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

                                            <CalendarPlus className="w-4 h-4 text-white" />

                                        </div>

                                    </div>
                                </motion.div>
                            </>
                            :

                            //exists supplies AND NOT EXISTS OPTIONS SEARCH SELECTED
                            currentItems.length > 0 && !stateActiveTable ?
                                <>

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
                                                    DEBE FILTRAR UN INSUMO
                                                </p>

                                            </div>

                                            <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

                                                <CalendarPlus className="w-4 h-4 text-white" />

                                            </div>

                                        </div>
                                    </motion.div>
                                </> :
                                //NOT exists supplies  and NOT EXISTS OPTIONS SEARCH SELECTED
                                <>

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
                                                    NO HAY INSUMO PARA LA OPCION SELECCIONADA
                                                </p>

                                            </div>

                                            <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

                                                <CalendarPlus className="w-4 h-4 text-white" />

                                            </div>

                                        </div>
                                    </motion.div>
                                </>
                }




                {/* TABLE VARIANTS */}
                {
                   supplySelected &&  (
                        <>
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

                                        <p className="text-zinc-400 text-sm mt-0.5">
                                            Listado de Variantes
                                        </p>

                                    </div>

                                    <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

                                        <CalendarPlus className="w-4 h-4 text-white" />

                                    </div>

                                </div>
                            </motion.div>

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


                                                <thead>
                                                    <tr className="bg-zinc-950">
                                                        <th className="px-3 md:px-5 py-3.5 text-left  font-semibold text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs">
                                                            Variante{" "}
                                                            <FontAwesomeIcon
                                                                onClick={handleOrder}
                                                                icon={faSortAlphaDown}
                                                                style={{ cursor: "pointer" }}
                                                                color={order ? "#FF846A" : "#A2DFFF"}
                                                            />
                                                        </th>
                                                        <th className="px-3 md:px-5 py-3.5 text-left  font-semibold text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs">Insumo</th>

                                                        <th className="px-3 md:px-5 py-3.5 text-left  font-semibold text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs">stock</th>


                                                    </tr>
                                                </thead>
                                            }


                                            <tbody>

                                                {supplySelected?.variants.map((sup, index) => (

                                                    <motion.tr key={sup._id} animate={{
                                                        opacity: 1,
                                                    }}
                                                        transition={{
                                                            delay:
                                                                0.35 +
                                                                index * 0.05,
                                                        }}
                                                        className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">



                                                        <td
                                                            className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={(e) =>
                                                                handleDetailsSuppliesVariant(e, sup, supplySelected.nameSupply)
                                                            }
                                                        >
                                                            {sup?.variant?.name}
                                                        </td>
                                                        <td className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal">{supplySelected.nameSupply}</td>


                                                        <td className="px-3 md:px-5 py-3 text-xs md:text-sm text-zinc-500 break-words whitespace-normal">{sup?.currentStock}</td>

                                                    </motion.tr>
                                                ))}
                                            </tbody>

                                        </table>

                                        {/* PAGINACIÓN NUMÉRICA */}
                                        {stateListSupplies.length > itemsPerPage && (
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


                <TableSuppliesSaleDetails dataSupplySeleted={supplySelectedVariant} setSupplySelected={setSupplySelected}/>


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
