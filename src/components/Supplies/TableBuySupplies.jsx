import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { actionListBuySupplies } from "../../reducer/actions/supply/actionsSupply"
import iconBuySupply from "../../icons/buySupply2.gif"
import FormAddBuySupply from "../Formulario/Supply/FormAddBuySupply"
import convertDateReverse from "../../functions/convertDateReverse"
import convertNum from "../../functions/convertNum"
import TableDetailBuys from "./TableDetailBuys"

const TableBuySupplies = () => {

    const dispatch = useDispatch()
    const listBuySupplies = useSelector((state) => state.supply.listBuySupplies)

    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const [openFormBuySupply, setOpenFormBuySupply] = useState(false)
    const [stateDetailsBuy, setStateDetailsBuy] = useState({
        detailsBuy: ""
    })

    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(actionListBuySupplies(companySelectedMenu._id))
        }
    }, [companySelectedMenu, dispatch]);

    function handleDetailsBuy(e, props) {
        e.preventDefault();

        setStateDetailsBuy({
            detailsBuy: props
        });
    }

 

    return (
        <div>
            <div className="col-6 col-md-4 d-flex justify-content-center mb-1">

                <div className="text-center">
                    <div className="card-body">
                        <button
                            className="btn btn-link"
                            onClick={() => setOpenFormBuySupply(!openFormBuySupply)}
                        >
                            <img src={iconBuySupply} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-lg table-responsive mb-4">

                <div className="titGral">
                    <h1>Listado Compras</h1>
                </div>

                {openFormBuySupply ? <FormAddBuySupply /> : null
                }
                <table className="table table-bordered table-hover table-white">
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
                        {listBuySupplies ? listBuySupplies.map((buy) => {
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
                                     <td>{buy.nameSupplier??"No registrado"}</td>
                                    <td>{convertDateReverse(buy.date)}</td>
                                    <td>{buy.montoB ? convertNum(buy.montoB) : 0}</td>
                                </tr>
                            )
                        }) : <h2>no hay datos</h2>

                        }

                    </tbody>

                </table>

                <div className="titGral">
                    <h1>Detalle de Compra Seleccionada</h1>
                </div>
                <TableDetailBuys stateDetailsBuy={stateDetailsBuy.detailsBuy} />

            </div>

        </div>
    )
}

export default TableBuySupplies


