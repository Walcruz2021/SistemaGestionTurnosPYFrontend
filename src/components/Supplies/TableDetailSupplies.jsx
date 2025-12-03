
import { BsPersonBoundingBox } from "react-icons/bs";
import { TbTaxEuro } from "react-icons/tb";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa6";
import { PiHighHeelFill } from "react-icons/pi";
import { BsCalendar2DateFill } from "react-icons/bs"
import { MdDiscount } from "react-icons/md";
import { GrDocumentStore } from "react-icons/gr";
import { TbCategoryFilled } from "react-icons/tb";

const TableDetailSupplies = ({ stateDetailsSup }) => {
    console.log(stateDetailsSup)
    return (

        <>


            <>
                <div className="container my-4">
                    <div className="row g-3 text-center">

                        <div className="col-6 col-md-4">
                            <div className="card p-3 h-100 shadow-sm">
                                <FaFileInvoice size="1.7rem" className="mb-2" />
                                <small className="text-muted">Insumo</small>
                                <strong>{stateDetailsSup.nameSupply ?? ""}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-4">
                            <div className="card p-3 h-100 shadow-sm">
                                <MdDiscount size="1.7rem" className="mb-2" />
                                <small className="text-muted">Marca</small>
                                <strong>{stateDetailsSup.nameBrand ?? ""}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-4">
                            <div className="card p-3 h-100 shadow-sm">
                                <PiHighHeelFill size="1.7rem" className="mb-2" />
                                <small className="text-muted">Talle</small>
                                <strong>{stateDetailsSup.valueUnidMed ?? 0}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-4">
                            <div className="card p-3 h-100 shadow-sm">
                                <GrDocumentStore  size="1.7rem" className="mb-2" />
                                <small className="text-muted">Stock</small>
                                <strong>{stateDetailsSup.totalStock ?? 0}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-4">
                            <div className="card p-3 h-100 shadow-sm bg-light">
                                <TbCategoryFilled size="1.7rem" className="mb-2" />
                                <small className="text-muted">Categoria</small>
                                <strong>{stateDetailsSup.categorySupply ?? ""}</strong>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="card p-3 h-100 shadow-sm bg-light">
                                <BsCalendar2DateFill size="1.7rem" className="mb-2" />
                                <small className="text-muted">Fecha Ingreso</small>
                                <strong>{stateDetailsSup.createdAt ?? ""}</strong>
                            </div>
                        </div>

                    </div>
                </div>

            </>

      
        </>
    )
}

export default TableDetailSupplies