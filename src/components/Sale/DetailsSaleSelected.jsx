import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import {
    faChartLine,
    faHandHoldingDollar,
    faCreditCardAlt,
    faBuildingColumns,
} from "@fortawesome/free-solid-svg-icons";
import convertNum from "../../functions/convertNum";
import noteCred from "../../icons/noteCred.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import FormNoteCred from "../Formulario/Vtas/FormNoteCred"


const DetailsSaleSelected = ({ detailsSale, setStateDetailsSale,setOpenModalNoteCred, openModalNoteCred }) => {


    function functionOpenModal() {
        setOpenModalNoteCred(!openModalNoteCred)
    }

    return (
        <div>
            <div className="titGral">

                <h2>Detalle Venta Seleccionada: {detailsSale && detailsSale.numeSale}</h2>
            </div>



            <div className="container-lg table-responsive">

                <table className="table table-bordered table-hover table-white">
                    <thead class="thead-light table-dark instrument-serif-regular">
                        <tr className="instrument-serif-regular">
                            <th>Cantidad</th>
                            <th> Producto </th>
                            <th>Valor Unit</th>
                            <th>Total x Prod</th>
                            <th>NCred</th>

                        </tr>
                    </thead>
                    <tbody className="instrument-serif-regular">
                        {detailsSale && detailsSale.items.map((item) => (
                            <tr key={item._id}>
                                {item.quantitySale ? <td>{item.quantitySale}</td> : <td>{0}</td>}
                                <td>{item.nameSupply}</td>
                                {item.subtotal ? <td>{convertNum(item.subtotal/item.quantitySale)}</td> : <td>{convertNum(0)}</td>}
                                {item.subtotal ? <td>{convertNum(item.subtotal)}</td> : <td>{convertNum(0)}</td>}
                                {item.quantityReturned ? <td className="text-center text-warning">{item.quantityReturned}</td> : <td className="text-center">{0}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>




            <div className="container mt-2">
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-light instrument-serif-regular">


                        <h5 className="mb-0">RESUMEN DE PAGO</h5>
                    </div>

                    <div className="table-responsive">
                        <table className="table mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="instrument-serif-regular">Medio de Pago</th>
                                    <th className="text-end">Monto</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="instrument-serif-regular"> Efectivo</td>
                                    <td className="text-end instrument-serif-regular">
                                        {detailsSale?.efectivo ? convertNum(detailsSale.efectivo) : "$ 0"}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="instrument-serif-regular">Transferencia / Banco</td>
                                    <td className="text-end instrument-serif-regular">
                                        {detailsSale?.transferencia ? convertNum(detailsSale.transferencia) : "$ 0"}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="instrument-serif-regular">Tarjeta</td>
                                    <td className="text-end instrument-serif-regular">
                                        {detailsSale?.tarjeta ? convertNum(detailsSale.tarjeta) : "$ 0"}
                                    </td>
                                </tr>
                            </tbody>

                            <tfoot>
                                <tr className="table-secondary">
                                    <th className="instrument-serif-regular">Total</th>
                                    <th className="text-end instrument-serif-regular">
                                        {convertNum(
                                            (detailsSale?.efectivo || 0) +
                                            (detailsSale?.transferencia || 0) +
                                            (detailsSale?.tarjeta || 0)
                                        )}
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>

            <div className="d-flex card-body justify-content-center mt-1">


                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-top">Nota Credito</Tooltip>}

                >
                    <button className="btn btn-link" onClick={functionOpenModal}>
                        <img src={noteCred} />
                    </button>
                </OverlayTrigger>


            </div>

            {openModalNoteCred && <FormNoteCred openModal={openModalNoteCred} setOpenModal={setOpenModalNoteCred} dataModalSale={detailsSale} setStateDetailsSale={setStateDetailsSale}/>}
        </div>
    )
}

export default DetailsSaleSelected