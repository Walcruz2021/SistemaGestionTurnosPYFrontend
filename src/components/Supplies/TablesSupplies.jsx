import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSortAlphaDown,
    faPenSquare,
    faTrash,
    faHandHoldingUsd,
} from "@fortawesome/free-solid-svg-icons";
import { FaFileAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TableDetailSupplies from "./TableDetailSupplies";
import { useSelector, useDispatch } from "react-redux";
import ModalEditSupply from "../Modal/Supply/ModalEditSupply";
import Select from "react-select";
import listCategories from "../../functions/categoriesSupplies.json"
import "../../../src/App.css";
import { getListSupplies, actionsOrderSupplies } from "../../reducer/actions/supply/actionsSupply"
import { getBrands } from "../../reducer/actions/actionBrand"
import TableStockBatch from "../StockBatch/TableStockBatch.jsx";

//stateInfo tru or false
const TableSupplies = ({ setInfo, stateInfo }) => {
    const dispatch = useDispatch();
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplies = useSelector((state) => state.supply.listSupplies);

    const listBrand = useSelector((state) => state.gralRed.listBrands);
    const [order, setOrder] = useState(false)
    const [stateFilterCategory, setStateFilterCategory] = useState(false)
    const [stateFilterSupplier, setStateFilterSupplier] = useState(false)
    const [stateFilterBrand, setStateFilterBrand] = useState(false)

    // const [stateIconOrder, stateSetIconOrder] = useState(false)
    const [stateSelectedSupplier, setStateSelectedSupplier] = useState()
    const [stateSelectedCategory, setStateSelectedCategory] = useState()
    const [stateSelectedBrand, setStateSelectedBrand] = useState()

    const [stateSearch, setSearch] = useState("");
    const [stateOpenModal, setStateOpenModal] = useState(false)
    const [stateDataSupply, setDataSupply] = useState()
    const [filterBySupplier, setFilterBySupplier] = useState(false);
    const [stateDetailsSup, setStateDetailsSup] = useState({
        detailsSup: ""
    })

    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(getListSupplies())
            dispatch(getBrands())
        }
    }, [companySelectedMenu, dispatch]);


    const MySwal = withReactContent(Swal);
    function convertDay(date) {
        const day = new Date(date).getDay();
        const days = ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"];
        return days[day];
    }


    function convertDateFormat(date) {
        let info = 0;
        if (date) {
            info = date.split("-").reverse().join("/");
        }
        return info;
    }

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        console.log(updatedCheckedState);
        setCheckedState(updatedCheckedState);
    };


    var selectBrand = []


    if (Array.isArray(listBrand)) {

        listBrand.map((brand, i) => {
            var option = {
                value: brand._id,
                label: brand.nameBrand,
            };
            selectBrand.push(option);
        });
    }

    var selectCategory = []


    if (Array.isArray(listCategories)) {

        listCategories.map((supply, i) => {
            var option = {
                value: supply.name,
                label: supply.name,
            };
            selectCategory.push(option);
        });
    }

    const handleChangeSelectSupplier = (selected) => {

        setStateSelectedSupplier(selected)
        setStateFilterSupplier(true)
    }

    const handleChangeSelectBrand = (selected) => {

        setStateSelectedBrand(selected)
        setStateFilterBrand(true)
    }


    const handleChangeSelectCategory = (selected) => {

        setStateSelectedCategory(selected)
        setStateFilterCategory(true)
    }

    function handleToggleFilterBrand() {
        setStateFilterBrand(prev => !prev);
        setStateFilterCategory(false);
        //se hardcodea al selector como undefined de manera de que se quite el filtrado en el momento que se desactiva el check
        setStateSelectedBrand(undefined)
    }

    function handleToggleFilterSCategory() {
        setStateFilterCategory(prev => !prev);
        setStateFilterBrand(false);
        //se hardcodea al selector como undefined de manera de que se quite el filtrado en el momento que se desactiva el check
        setStateSelectedCategory(undefined)
    }

    const suppliesFiltered = stateSelectedBrand
        ? listSupplies.filter(s => s.nameBrand === stateSelectedBrand.label)
        : stateSelectedCategory ? listSupplies.filter(s => s.categorySupply === stateSelectedCategory.label) : listSupplies

    function handleOrder(e) {
        setOrder(!order);
        const listOrder = listSupplies;
        dispatch(actionsOrderSupplies(order));
    }

    function searchSupply(busc) {
        //console.log(busc)
        return function (x) {
            return x.nameSupply.toLowerCase().includes(busc) | !busc;
            //return x.name.includes(busc) | !busc;
        };
    }

    function activeModalEdit(e, props) {

        setStateOpenModal(true),
            setDataSupply(props)
    }

    function handleDetailsSupplies(e, props) {
        e.preventDefault();

        setStateDetailsSup({
            detailsSup: props.sup
        });
    }


    return (
        <>
            <div className="container-lg table-responsive mb-4">

                <div className="container-lg table-responsive">
                    <div className="containerSearch">
                        <input
                            className="inputBuscar instrument-serif-regular"
                            type="text"
                            name="search"
                            placeholder={`Busque un Insumo. Ingrese sólo valores en minúsculas`}
                            value={stateSearch}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div
                    className="d-flex justify-content-center align-items-center mt-2"
                    style={{ height: "100%" }}
                >
                    <label>Filtrar x Marca</label>
                    <input
                        type="checkbox"
                        checked={stateFilterBrand}
                        onChange={handleToggleFilterBrand}
                        style={{ width: "22px", height: "22px" }}
                    />
                </div>

                <div
                    className="d-flex justify-content-center align-items-center mt-2"
                    style={{ height: "100%" }}
                >
                    <label>Filtrar x Categoria</label>
                    <input
                        type="checkbox"
                        checked={stateFilterCategory}
                        onChange={handleToggleFilterSCategory}
                        style={{ width: "22px", height: "22px" }}
                    />
                </div>

                {stateFilterBrand &&

                    <Select
                        className="classSelect instrument-serif-regular"
                        placeholder="Seleccione Marca"
                        onChange={(e) => {
                            handleChangeSelectBrand(e);
                        }}
                        options={selectBrand}
                    />
                }

                {stateFilterCategory &&

                    <Select
                        className="classSelect instrument-serif-regular"
                        placeholder="Seleccione Categoria"
                        onChange={(e) => {
                            handleChangeSelectCategory(e);
                        }}
                        options={selectCategory}
                    />
                }


                <table className="table table-bordered table-hover table-white">
                    <thead className="thead-light table-secondary">
                        <tr>
                            <th className="instrument-serif-regular">Insumo {" "}
                                <FontAwesomeIcon
                                    onClick={(e) => handleOrder(e)}
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

                        {suppliesFiltered.filter(searchSupply(stateSearch)).map((sup, index) =>
                            <tr key={sup._id}>

                                {/* <td style={{ cursor: "pointer" }} onClick={(e) =>
                                    activeModalEdit(e, {
                                        _id: sup._id,
                                        categorySupply: sup.categorySupply,
                                        idSupplier: sup.idSupplier,
                                        nameSupplier: sup.nameSupplier,
                                        nameSupply: sup.nameSupply
                                    })
                                } className="instrument-serif-regular">{sup.nameSupply ?? null}</td> */}
                                <td style={{ cursor: "pointer" }} onClick={(e) =>
                                    handleDetailsSupplies(e, {
                                        sup
                                    })
                                } className="instrument-serif-regular">{sup.nameSupply ?? null}</td>
                                <td className="instrument-serif-regular">{sup.categorySupply ?? null}</td>
                                <td className="instrument-serif-regular">{sup.nameBrand ?? null}</td>
                                <td className="instrument-serif-regular">{sup.totalStock ?? 0}</td>
                            </tr>
                        )}
                    </tbody>
                </table>


                <div className="titGral">
                    <h1>Insumo Seleccionado</h1>
                </div>
                <TableDetailSupplies stateDetailsSup={stateDetailsSup.detailsSup} />
                <TableStockBatch idSupply={stateDetailsSup.detailsSup?._id} />

            </div>

            <ModalEditSupply stateOpenModal={stateOpenModal} setStateOpenModal={setStateOpenModal} stateDataSupply={stateDataSupply} setDataSupply={setDataSupply} />

        </>
    );
};

export default TableSupplies;
