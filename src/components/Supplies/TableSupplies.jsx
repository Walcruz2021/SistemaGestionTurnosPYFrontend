import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TableDetailSupplies from "./TableDetailSupplies.jsx";
import { useSelector, useDispatch } from "react-redux";
import ModalEditSupply from "../Modal/Supply/ModalEditSupply.js";
import Select from "react-select";
import listCategories from "../../functions/categoriesSupplies.json";
import "../../../src/App.css";
import {
    getListSupplies,
    actionsOrderSupplies,
} from "../../reducer/actions/supply/actionsSupply.js";
import { getBrands } from "../../reducer/actions/actionBrand.jsx";
import TableStockBatch from "../StockBatch/TableStockBatch.jsx";

const TableSupplies = ({ setInfo, stateInfo }) => {
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

    //  PAGINACIÓN
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

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

    // ----------------- FILTRO PRINCIPAL -----------------
    const suppliesFiltered = useMemo(() => {
        if (supplySelected) return [];

        let result = listSupplies;

        if (stateSearch.trim() !== "") {
            result = result.filter((s) =>
                s.global.nameSupply
                    .toLowerCase()
                    .includes(stateSearch.toLowerCase())
            );
        }

        if (stateSelectedBrand) {
            result = result.filter(
                (s) => s.global.idBrand === stateSelectedBrand.value
            );
        }

        if (stateSelectedCategory) {
            result = result.filter(
                (s) =>
                    s.global.categorySupply === stateSelectedCategory.label
            );
        }

        // Si NO hay filtros → no mostramos tabla
        if (!stateSearch && !stateSelectedBrand && !stateSelectedCategory) {
            return null;
        }

        return result;
    }, [
        listSupplies,
        stateSearch,
        stateSelectedBrand,
        stateSelectedCategory,
        supplySelected,
    ]);

    // ---------------- PAGINACIÓN ----------------
    const totalPages = suppliesFiltered
        ? Math.ceil(suppliesFiltered.length / itemsPerPage)
        : 0;

    const currentItems =
        suppliesFiltered?.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        ) ?? [];

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

    return (
        <>
            <div className="container-lg table-responsive mb-4">
                {/* BUSCADOR */}
                <div className="containerSearch">
                    <input
                        className="inputBuscar instrument-serif-regular"
                        type="text"
                        name="search"
                        placeholder={`Busque un Insumo...`}
                        value={stateSearch}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* FILTRO MARCA */}
                <div className="d-flex justify-content-center mt-2">
                    <label>Filtrar x Marca</label>
                    <input
                        type="checkbox"
                        checked={stateFilterBrand}
                        onChange={() => {
                            setStateFilterBrand((p) => !p);
                            setStateFilterCategory(false);
                            setStateSelectedBrand(undefined);
                            setCurrentPage(1);
                        }}
                        style={{ width: "22px", height: "22px" }}
                    />
                </div>

                {stateFilterBrand && (
                    <Select
                        className="classSelect instrument-serif-regular"
                        placeholder="Seleccione Marca"
                        onChange={(e) => {
                            setStateSelectedBrand(e);
                            setCurrentPage(1);
                        }}
                        options={selectBrand}
                    />
                )}

                {/* FILTRO CATEGORIA */}
                <div className="d-flex justify-content-center mt-2">
                    <label>Filtrar x Categoria</label>
                    <input
                        type="checkbox"
                        checked={stateFilterCategory}
                        onChange={() => {
                            setStateFilterCategory((p) => !p);
                            setStateFilterBrand(false);
                            setStateSelectedCategory(undefined);
                            setCurrentPage(1);
                        }}
                        style={{ width: "22px", height: "22px" }}
                    />
                </div>

                {stateFilterCategory && (
                    <Select
                        className="classSelect instrument-serif-regular"
                        placeholder="Seleccione Categoria"
                        onChange={(e) => {
                            setStateSelectedCategory(e);
                            setCurrentPage(1);
                        }}
                        options={selectCategory}
                    />
                )}

                {/* SI NO HAY FILTRO → NO MOSTRAR TABLA */}
                {!suppliesFiltered && (
                    <p className="text-muted mt-3">
                        Aplicá un filtro para ver los insumos.
                    </p>
                )}

                {/* TABLA + PAGINACIÓN SOLO SI HAY RESULTADOS */}
                {suppliesFiltered && (
                    <>
                        <table className="table table-bordered table-hover table-white mt-3">
                            <thead className="thead-light table-secondary">
                                <tr>
                                    <th>
                                        Insumo{" "}
                                        <FontAwesomeIcon
                                            onClick={handleOrder}
                                            color={order ? "#FF846A" : "#A2DFFF"}
                                            icon={faSortAlphaDown}
                                            size="lg"
                                            style={{ cursor: "pointer" }}
                                        />
                                    </th>
                                    <th>Categoria</th>
                                    <th>Marca</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentItems.map((sup) => (
                                    <tr key={sup._id}>
                                        <td
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) =>
                                                handleDetailsSupplies(e, {
                                                    sup,
                                                })
                                            }
                                        >
                                            {sup.global.nameSupply}
                                        </td>
                                        <td>{sup.global.categorySupply}</td>
                                        <td>{sup.global.nameBrand}</td>
                                        <td>{sup.totalStock ?? 0}</td>
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
                                            className={`page-item ${
                                                currentPage === 1
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
                                                    className={`page-item ${
                                                        currentPage === i + 1
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
                                            className={`page-item ${
                                                currentPage === totalPages
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
                <div className="titGral">
                    <h1>Insumo Seleccionado</h1>
                </div>
                <TableDetailSupplies
                    stateDetailsSup={stateDetailsSup.detailsSup}
                />
                <TableStockBatch
                    idSupply={stateDetailsSup.detailsSup?.idGlobalSupply}
                />
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

export default TableSupplies;
