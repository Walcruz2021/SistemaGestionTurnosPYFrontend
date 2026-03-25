import React, { useEffect, useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { actionListBuySuppliesByDateCurrent, actionListBuySupplyByNInvoice, getListSuppliesGral } from "../../reducer/actions/supply/actionsSupply"
import iconBuySupply from "../../icons/buySupply2.gif"
import FormAddBuySupply from "../Formulario/Supply/FormAddBuySupply"
import convertDateFormat from "../../functions/convertDateFormat"
import convertDateReverse from "../../functions/convertDateReverse"
import convertNum from "../../functions/convertNum"
import TableDetailBuys from "./TableDetailBuys"
import { use } from "react"
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const TableBuySupplies = () => {

    const dispatch = useDispatch()
    const listBuySuppliesByCurrentDate = useSelector((state) => state.supply.listBuySupplies)
    const findSupplyByNInvoice = useSelector((state) => state.supply.findSUpplyByNInvoice)
    const [stateSearch, setSearch] = useState("");
    const [stateSearchGral, setSearchGral] = useState("");
    const [isActiveMessage, setIsActiveMessage] = useState(false);
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const [openFormBuySupply, setOpenFormBuySupply] = useState(false)
    const [stateDetailsBuy, setStateDetailsBuy] = useState({
        detailsBuy: ""
    })

    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(actionListBuySuppliesByDateCurrent(companySelectedMenu._id))
        }
    }, [companySelectedMenu, dispatch]);


    useEffect(() => {
        if (!stateSearchGral) {
            setIsActiveMessage(false);
        }
    }, [stateSearchGral])


    //PAGINACION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const suppliesFiltered = useMemo(() => {


        return listBuySuppliesByCurrentDate || []

        return result;
    }, [
        listBuySuppliesByCurrentDate,

    ]);



    const totalPages = suppliesFiltered && suppliesFiltered.length > 0
        ? Math.ceil(suppliesFiltered.length / itemsPerPage)
        : 0;

    const currentItems =
        suppliesFiltered && suppliesFiltered.length > 0 ? suppliesFiltered?.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        ) ?? [] : [];

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

    //FUNCION QUE UTILIZA EL INPUT PARA BUSCAR UNA COMPRA

    /**
     * This function searches for a buy: Its used in filtered search ListBuys
     * @param {String} busc Buy's Invoice as state
     * @returns
     */

    function searchBuy(busc) {

        return function (x) {

            return x.NInvoice && x.NInvoice.toLowerCase().includes(busc.toLowerCase()) || !busc;
            //return x.NInvoice.includes(busc) | !busc;
        };
    }

    function searchBuyGralByNInvoice() {
        dispatch(actionListBuySupplyByNInvoice(companySelectedMenu._id, stateSearchGral))
        setIsActiveMessage(true);
    }

    function handleDetailsBuy(e, props) {
        e.preventDefault();
        setStateDetailsBuy({
            detailsBuy: props,
        });
    }
    return (
        <div>
            <div className="">

                <div className="text-center ">
                    <div className="card-body">

                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-top">Ingresar Compra</Tooltip>}
                        >
                            <button
                                className="btn btn-link"
                                onClick={() => setOpenFormBuySupply(!openFormBuySupply)}
                            >
                                <img src={iconBuySupply} />
                            </button>
                        </OverlayTrigger>

                    </div>
                </div>
            </div>

            <div className="container-lg table-responsive mb-4">

                <div className="titGral">
                    <h1>Listado Compras Mes Actual</h1>
                </div>

                <div className="">
                    <div className="containerSearch">
                        <input
                            className="inputBuscar instrument-serif-regular"
                            type="text"
                            name="search"
                            placeholder={`Busque una compra del mes actual. Ingrese 
N Factura en minusculas`}
                            value={stateSearch}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {openFormBuySupply ? <FormAddBuySupply /> : null
                }
                <table className="table table-bordered table-hover table-white mt-3">
                    <thead className="thead-light table-secondary">
                        <tr>

                            <th className="instrument-serif-regular">N Factura</th>

                            <th className="instrument-serif-regular">Proveedor</th>
                            <th className="instrument-serif-regular">
                                Fecha{" "}
                                {/* <FontAwesomeIcon
                                    // onClick={(e) => handleOrder(e)}
                                    color={order ? "#FF846A" : "#A2DFFF"}
                                    icon={faSortAlphaDown}
                                    size="lg"
                                    style={{ cursor: "pointer" }}
                                /> */}
                            </th>
                            <th className="instrument-serif-regular">Valor Bruto</th>


                        </tr>
                    </thead>
                    <tbody>
                        {currentItems ? currentItems.filter(searchBuy(stateSearch)).map((buy) => {
                            return (

                                <tr key={buy._id}>

                                    <td
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) =>
                                            handleDetailsBuy(e,
                                                buy
                                            )
                                        }
                                        className="instrument-serif-regular"
                                    >{buy.NInvoice}</td>
                                    <td className="instrument-serif-regular">{buy.nameSupplier ?? "No registrado"}</td>
                                    <td className="instrument-serif-regular">{convertDateReverse(convertDateFormat(buy.date))}</td>
                                    <td className="instrument-serif-regular">{buy.montoB ? convertNum(buy.montoB) : 0}</td>
                                </tr>
                            )
                        }) : null

                        }

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

                <div className="titGral">
                    <h1>Busqueda de Compra General</h1>
                </div>


                {/* <div className="d-flex align-items-center gap-2">
                    <div className="containerSearch">
                        <input
                            className="instrument-serif-regular"
                            type="text"
                            name="search"
                            placeholder={`Ingrese N Factura en minusculas`}
                            //value={stateSearch}
                            onChange={(e) => setSearchGral(e.target.value)}

                        />
                    </div>
                    <button className="btn btn-outline-dark mt-2" onClick={() => searchBuyGralByNInvoice(stateSearchGral)} disabled={!stateSearchGral}>Buscar Compra</button>
                </div> */}

                <div className="flex items-center w-full max-w-xl gap-3">

                    <input
                        type="text"
                        name="search"
                        placeholder="Ingrese N° de factura en minúsculas"
                        className="flex-1 px-5 py-3 text-base border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-black"
                        onChange={(e) => setSearchGral(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && stateSearchGral) {
                                searchBuyGralByNInvoice(stateSearchGral);
                            }
                        }}
                    />


                    <button
                        onClick={() => searchBuyGralByNInvoice(stateSearchGral)}
                        disabled={!stateSearchGral}
                        className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition disabled:bg-gray-400"
                    >
                        Buscar
                    </button>

                </div>


                {findSupplyByNInvoice ?

                    <table className="table table-bordered table-hover table-white mt-3">
                        <thead className="thead-light table-secondary">
                            <tr>

                                <th className="instrument-serif-regular">N Factura</th>

                                <th className="instrument-serif-regular">Proveedor</th>
                                <th className="instrument-serif-regular">
                                    Fecha{" "}
                                    {/* <FontAwesomeIcon
                                    // onClick={(e) => handleOrder(e)}
                                    color={order ? "#FF846A" : "#A2DFFF"}
                                    icon={faSortAlphaDown}
                                    size="lg"
                                    style={{ cursor: "pointer" }}
                                /> */}
                                </th>
                                <th className="instrument-serif-regular">Valor Bruto</th>


                            </tr>
                        </thead>
                        <tbody>


                            <tr key={findSupplyByNInvoice._id}>

                                <td
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) =>
                                        handleDetailsBuy(e,
                                            findSupplyByNInvoice
                                        )
                                    }
                                    className="instrument-serif-regular"
                                >{findSupplyByNInvoice.NInvoice}</td>
                                <td className="instrument-serif-regular">{findSupplyByNInvoice.nameSupplier ?? "No registrado"}</td>
                                <td className="instrument-serif-regular">{convertDateReverse(convertDateFormat(findSupplyByNInvoice.date))}</td>
                                <td className="instrument-serif-regular">{findSupplyByNInvoice.montoB ? convertNum(findSupplyByNInvoice.montoB) : 0}</td>
                            </tr>


                        </tbody>

                    </table> : isActiveMessage && !findSupplyByNInvoice ?
                        <div className="titGral">
                            <h2>No se encontraron compras para la factura ingresada: {stateSearchGral}</h2>
                        </div> : null

                }



                <div className="titGral">
                    <h1>Detalle de Compra Seleccionada</h1>
                </div>
                <TableDetailBuys stateDetailsBuy={stateDetailsBuy.detailsBuy} />

            </div>



        </div>
    )
}

export default TableBuySupplies


