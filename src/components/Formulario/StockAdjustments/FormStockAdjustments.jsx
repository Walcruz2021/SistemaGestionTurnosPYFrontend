import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TableSuppliesAdjustmentsDetails from "../../Supplies/TableSuppliesAdjustmentsDetails";
import { useSelector, useDispatch } from "react-redux";
import ModalEditSupply from "../../Modal/Supply/ModalEditSupply.js";
import Select from "react-select";
import listCategories from "../../../functions/categoriesSupplies.json";
import "../../../../src/App.css";
import {
    getListSupplies,
    actionsOrderSupplies,
} from "../../../reducer/actions/supply/actionsSupply.js";
import { getBrands } from "../../../reducer/actions/actionBrand.jsx";
import TableStockBatch from "../../StockBatch/TableStockBatch.jsx";
import { Plus, Search } from "lucide-react";

const FormStockAdjustments = ({ setInfo, stateInfo }) => {
    const dispatch = useDispatch();
    const companySelectedMenu = useSelector(
        (state) => state.company.companySelected
    );

    //si el insumo no tiene companySupply ligado no aparecera en la lista
    const listSupplies = useSelector((state) => state.supply.listSupplies);

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
    const brandOptions = listBrand.map((b) => ({
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
        }

        if (!stateSearch && !stateSelectedBrand && !stateSelectedCategory) {
            return null;
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

    return (
        <>
            <div className="container-lg table-responsive mb-4">
                {/* BUSCADOR */}
                <div className="cflex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500 ">
                        Buscar
                    </label>
                    <div className="relative">
                        <div className="mb-1">

                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <input
                            className="w-full bg-white border border-gray-200 text-gray-900 text-sm pl-9 pr-4 py-2.5 focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-500"
                            type="text"
                            placeholder={`Busque un Insumo (minúsculas)`}
                            value={stateSearch}
                            onChange={(e) => {
                                setCurrentPage(1);
                                setSearch(e.target.value);
                            }}
                        />
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
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
                    </div>
                    <div>

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
                </div>









                {/* TABLA + PAGINACIÓN SOLO SI HAY RESULTADOS */}
                {suppliesFiltered && (
                    <>
                        <table className="table table-bordered table-hover table-white mt-3">
                            <thead className="thead-light table-secondary">
                                <tr>
                                    <th className="instrument-serif-regular">
                                        Insumo{" "}
                                        <FontAwesomeIcon
                                            onClick={handleOrder}
                                            color={order ? "#FF846A" : "#A2DFFF"}
                                            icon={faSortAlphaDown}
                                            size="lg"
                                            style={{ cursor: "pointer" }}
                                        />
                                    </th>
                                    <th className="instrument-serif-regular">Categoria</th>
                                    <th className="instrument-serif-regular">Marca</th>
                                    <th className="instrument-serif-regular">Stock</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentItems.map((sup) => (
                                    <tr key={sup._id}>

                                        {
                                            sup.totalStock > 0 ?
                                                <td className="instrument-serif-regular"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={(e) =>
                                                        handleDetailsSupplies(e, {
                                                            sup,
                                                        })
                                                    }
                                                >
                                                    {sup.global.nameSupply}
                                                </td> :

                                                <td className="instrument-serif-regular"
                                                    style={{ color: "red" }}
                                                >
                                                    {sup.global.nameSupply}
                                                </td>
                                        }

                                        <td className="instrument-serif-regular">{sup.global.categorySupply}</td>
                                        <td className="instrument-serif-regular">{sup.global.nameBrand}</td>

                                        {
                                            sup.totalStock > 0 ?
                                                <td className="instrument-serif-regular" style={{ color: "green" }}>{sup.totalStock ?? 0}</td>
                                                :
                                                <td className="instrument-serif-regular" style={{ color: "red" }}>{sup.totalStock ?? 0}</td>
                                        }

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* PAGINACIÓN NUMÉRICA */}
                        {suppliesFiltered.length > itemsPerPage && (
                            <div className="d-flex justify-content-center mt-3">
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
                    </>
                )}

                {/* DETALLES */}

                {supplySelected ? <>

                    <div className="titGral">
                        <h1>Insumo Seleccionado</h1>
                    </div>


                    <TableSuppliesAdjustmentsDetails dataSupplySeleted={stateDetailsSup} />


                </> : <div className="titGral">
                    <h1>Seleccione un Insumo para ver sus Detalles</h1>
                </div>

                }
            </div>

            <ModalEditSupply
                stateOpenModal={stateOpenModal}
                setStateOpenModal={setStateOpenModal}
                stateDataSupply={stateDataSupply}
                setDataSupply={setDataSupply}
            />
        </>
    );
};

export default FormStockAdjustments;
