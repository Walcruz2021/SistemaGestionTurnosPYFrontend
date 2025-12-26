
import { BsPersonBoundingBox } from "react-icons/bs";
import { TbTaxEuro } from "react-icons/tb";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa6";
import convertNum from "../../functions/convertNum";

const TableDetailSells = ({ stateDetailsBuy }) => {

    return (

        <>


            <>
                <div className="container my-4">
                    <div className="row g-3 text-center">

                        <div className="col-6 col-md-4">
                            <div className="card p-3 h-100 shadow-sm">
                                <FaFileInvoice size="1.7rem" className="mb-2" />
                                <small className="text-muted">N° Factura</small>
                                <strong>{stateDetailsBuy.NInvoice ?? 0}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-4">
                            <div className="card p-3 h-100 shadow-sm">
                                <FaMoneyBillWave size="1.7rem" className="mb-2" />
                                <small className="text-muted">Importe Neto</small>
                                <strong>{convertNum(stateDetailsBuy.montoN ?? 0)}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-4">
                            <div className="card p-3 h-100 shadow-sm">
                                <TbTaxEuro size="1.7rem" className="mb-2" />
                                <small className="text-muted">IVA</small>
                                <strong>{convertNum(stateDetailsBuy.iva ?? 0)}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-4">
                            <div className="card p-3 h-100 shadow-sm">
                                <TbTaxEuro size="1.7rem" className="mb-2" />
                                <small className="text-muted">Otros Impuestos</small>
                                <strong>{convertNum(stateDetailsBuy.taxes ?? 0)}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-4">
                            <div className="card p-3 h-100 shadow-sm bg-light">
                                <FaMoneyBills size="1.7rem" className="mb-2" />
                                <small className="text-muted">Total Bruto</small>
                                <strong>{convertNum(stateDetailsBuy.montoB ?? 0)}</strong>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="card p-3 h-100 shadow-sm bg-light">
                                <BsPersonBoundingBox size="1.7rem" className="mb-2" />
                                <small className="text-muted">Proveedor</small>
                                <strong>{stateDetailsBuy.nameSupplier}</strong>
                            </div>
                        </div>

                    </div>
                </div>

            </>

            <div >
                <table className="table table-bordered table-hover table-white">
                    <thead className="thead-light table-secondary">
                        <tr>

                            <th className="instrument-serif-regular">Elementos Comprados</th>


                            <th className="instrument-serif-regular">
                                Marca
                                {/* <FontAwesomeIcon
                                           // onClick={(e) => handleOrder(e)}
                                           color={order ? "#FF846A" : "#A2DFFF"}
                                           icon={faSortAlphaDown}
                                           size="lg"
                                           style={{ cursor: "pointer" }}
                                       /> */}
                            </th>

                            <th className="instrument-serif-regular">Cantidad</th>
                            <th className="instrument-serif-regular">Costo Unid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stateDetailsBuy.detailsSupply ? stateDetailsBuy.detailsSupply.map((buy) => {
                            return (

                                <tr key={buy._id}>

                                    <td

                                        className="instrument-serif-regular"
                                    >{buy.nameSupply}</td>
                                    <td>{buy.nameBrand}</td>
                                    <td>{buy.quantity}</td>
                                    <td>{convertNum(buy.unitCost)}</td>
                                </tr>
                            )
                        }) : <h2>no hay datos</h2>

                        }

                    </tbody>

                </table>

            </div>
        </>
    )
}

export default TableDetailSells