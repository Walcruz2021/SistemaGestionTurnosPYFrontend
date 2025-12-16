
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
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useState } from "react";
import ModalEditSupply from "../Modal/Supply/ModalEditSupply";

const TableDetailSupplies = ({ stateDetailsSup }) => {

    const [modalOpenEditSupply, setModalOpenEditSupply] = useState(false);
    const onClickEditSUpply = () => {
        setModalOpenEditSupply(true);
    }

    return (

        <>


            <>
                <div className="container my-4">
                    <div className="row g-3 text-center">

                        <div className="col-6 col-md-2">
                            <div className="card p-3 h-100 shadow-sm">
                                <FaFileInvoice size="1.7rem" className="mb-2" />
                                <small className="text-muted">Insumo</small>
                                <strong>{stateDetailsSup.global?.nameSupply ?? ""}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-2">
                            <div className="card p-3 h-100 shadow-sm">
                                <MdDiscount size="1.7rem" className="mb-2" />
                                <small className="text-muted">Marca</small>
                                <strong>{stateDetailsSup.global?.nameBrand ?? ""}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-2">
                            <div className="card p-3 h-100 shadow-sm">
                                <PiHighHeelFill size="1.7rem" className="mb-2" />
                                <small className="text-muted">Talle</small>
                                <strong>{stateDetailsSup.global?.valueUnidMed ?? 0}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-2">
                            <div className="card p-3 h-100 shadow-sm">
                                <GrDocumentStore size="1.7rem" className="mb-2" />
                                <small className="text-muted">Stock</small>
                                <strong>{stateDetailsSup?.totalStock ?? 0}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-2">
                            <div className="card p-3 h-100 shadow-sm bg-light">
                                <TbCategoryFilled size="1.7rem" className="mb-2" />
                                <small className="text-muted">Categoria</small>
                                <strong>{stateDetailsSup.global?.categorySupply ?? ""}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-2">
                            <div className="card p-3 h-100 shadow-sm bg-light">
                                <BsCalendar2DateFill size="1.7rem" className="mb-2" />
                                <small className="text-muted">Fecha Ingreso</small>
                                <strong>{stateDetailsSup.global?.createdAt ?? ""}</strong>
                            </div>
                        </div>

                        
                        <div className="col-6 col-md-2">
                            <div className="card p-3 h-100 shadow-sm bg-light">
                                <FaMoneyBillTrendUp  size="1.7rem" className="mb-2" />
                                <small className="text-muted">Precio Venta</small>
                                <strong>{stateDetailsSup?.priceSale ?? ""}</strong>
                            </div>
                        </div>

                        <div className="col-6 col-md-2">
                            <div className="card p-3 h-100 shadow-sm bg-light" onClick={() => onClickEditSUpply()} style={{ cursor: "pointer" }}>
                                <BsCalendar2DateFill size="1.7rem" className="mb-2" />
                                <small className="text-muted">Editar Insumo</small>

                            </div>
                        </div>
                    </div>
                </div>


            </>

            <ModalEditSupply modalOpenEditSupply={modalOpenEditSupply} setModalOpenEditSupply={setModalOpenEditSupply} dataSupply={stateDetailsSup} />
        </>
    )
}

export default TableDetailSupplies