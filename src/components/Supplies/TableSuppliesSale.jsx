import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

// Componentes
import TableDetailSupplies from "./TableDetailSupplies.jsx";
import TableStockBatch from "../StockBatch/TableStockBatch.jsx";
import ModalEditSupply from "../Modal/Supply/ModalEditSupply.js";

// Datos
import listCategories from "../../functions/categoriesSupplies.json";

// Actions
import { getListSupplies, actionsOrderSupplies } from "../../reducer/actions/supply/actionsSupply.js";
import { getBrands } from "../../reducer/actions/actionBrand.jsx";

const TableSuppliesSale = () => {
    const dispatch = useDispatch();
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplies = useSelector((state) => state.supply.listSupplies.global);
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
            dispatch(getListSupplies(companySelectedMenu._id));
            dispatch(getBrands());
        }
    }, [companySelectedMenu, dispatch]);

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
        if (supplySelected) return [];

        let result = listSupplies;

        // Buscar por texto
        if (stateSearch.trim() !== "") {
            result = result.filter((s) =>
                s.nameSupply.toLowerCase().includes(stateSearch.toLowerCase())
            );
        }

        // Filtrar por marca
        if (stateSelectedBrand) {
            result = result.filter((s) => s.idBrand === stateSelectedBrand.value);
        }

        // Filtrar por categoría
        if (stateSelectedCategory) {
            result = result.filter((s) => s.categorySupply === stateSelectedCategory.label);
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

    return (
        <>
            <div className="container-lg table-responsive mb-4">
                {/* BUSCADOR */}
                <div className="containerSearch">
                    <input
                        className="inputBuscar instrument-serif-regular"
                        type="text"
                        placeholder="Busque un Insumo (minúsculas)"
                        value={stateSearch}
                        onChange={(e) => {
                            setSupplySelected(null);
                            setSearch(e.target.value);
                        }}
                    />
                </div>

                {/* FILTRO POR MARCA */}
                <p className="mt-3">Filtrar por marca</p>
                <Select
                    className="classSelect instrument-serif-regular"
                    placeholder="Seleccione Marca"
                    onChange={handleChangeSelectBrand}
                    value={stateSelectedBrand}
                    options={brandOptions}
                    isClearable
                />

                {/* FILTRO POR CATEGORÍA */}
                <p className="mt-3">Filtrar por categoría</p>
                <Select
                    className="classSelect instrument-serif-regular"
                    placeholder="Seleccione Categoría"
                    onChange={handleChangeSelectCategory}
                    value={stateSelectedCategory}
                    options={categoryOptions}
                    isClearable
                />

                {/* TABLA PRINCIPAL */}
                <table className="table table-bordered table-hover table-white mt-3">
                    <thead className="table-secondary">
                        <tr>
                            <th>
                                Insumo{" "}
                                <FontAwesomeIcon
                                    onClick={handleOrder}
                                    icon={faSortAlphaDown}
                                    style={{ cursor: "pointer" }}
                                    color={order ? "#FF846A" : "#A2DFFF"}
                                />
                            </th>
                            <th>Categoría</th>
                            <th>Marca</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliesFiltered && suppliesFiltered.map((sup) => (
                            <tr key={sup._id}>
                                <td
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) =>
                                        handleDetailsSupplies(e, { sup })
                                    }
                                >
                                    {sup.nameSupply}
                                </td>
                                <td>{sup.categorySupply}</td>
                                <td>{sup.nameBrand}</td>
                                <td>{sup.totalStock ?? 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* DETALLE DEL INSUMO */}
                <div className="titGral mt-4">
                    <h1>Insumo Seleccionado</h1>
                </div>

                <TableDetailSupplies stateDetailsSup={stateDetailsSup} />
                {/* aqui deberia mostrar la compra mas antigua no todas las compras */}
                {/* <TableStockBatch idSupply={stateDetailsSup.detailsSup?._id} /> */}

                <input type="date" />
                <input type="number" min="0" name="cantSale" onChange={(e) => {
                    // Solo permitir números y máximo 10 caracteres
                    const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                    setStateDetailsSup((prevState) => ({
                        ...prevState,
                        cantSale: value,
                    }));
                }} />

                <div className="col-12 col-md-2">
                    <button onClick={() => { addSale(stateDetailsSup) }}>Ingresar Venta</button>
                </div>

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

export default TableSuppliesSale;
