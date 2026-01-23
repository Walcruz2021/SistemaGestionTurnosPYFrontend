
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
import { useEffect, useState } from "react";
import ModalPriceSupply from "../Modal/Supply/ModalPriceSupply";
import convertNum from "../../functions/convertNum";
import convertDateFormat from "../../functions/convertDateFormat";
import convertDateReverse from "../../functions/convertDateReverse";

const TableDetailSupplies = ({ stateDetailsSup, setSupplySelected }) => {

    console.log(stateDetailsSup, "sss")
    const [modalOpenEditSupply, setModalOpenEditSupply] = useState(false);
    const [dataSupplyEdit, setDataSupplyEdit] = useState({})
    const onClickEditSUpply = () => {
        setModalOpenEditSupply(true);
    }

    useEffect(() => {
        if (stateDetailsSup) {
            setDataSupplyEdit(stateDetailsSup)
        }
    }, [stateDetailsSup])

    return (

        <>




            <div className="container my-4">
                <div className="row g-3 text-center">

                    <div className="col-6 col-md-2">
                        <div className="card p-3 h-100 shadow-sm">
                            <FaFileInvoice size="1.7rem" className="mb-2" />
                            <small className="text-muted instrument-serif-regular">Insumo</small>
                            <strong className="instrument-serif-regular">{stateDetailsSup.global?.nameSupply ?? ""}</strong>
                        </div>
                    </div>

                    <div className="col-6 col-md-2">
                        <div className="card p-3 h-100 shadow-sm">
                            <MdDiscount size="1.7rem" className="mb-2" />
                            <small className="text-muted instrument-serif-regular">Marca</small>
                            <strong className="instrument-serif-regular">{stateDetailsSup.global?.nameBrand ?? ""}</strong>
                        </div>
                    </div>

                    <div className="col-6 col-md-2">
                        <div className="card p-3 h-100 shadow-sm">
                            <PiHighHeelFill size="1.7rem" className="mb-2" />
                            <small className="text-muted instrument-serif-regular">Talle</small>
                            <strong className="instrument-serif-regular">{stateDetailsSup.global?.valueUnidMed ?? 0}</strong>
                        </div>
                    </div>

                    <div className="col-6 col-md-2">
                        <div className="card p-3 h-100 shadow-sm">
                            <GrDocumentStore size="1.7rem" className="mb-2" />
                            <small className="text-muted instrument-serif-regular">Stock</small>
                            <strong className="instrument-serif-regular">{stateDetailsSup?.totalStock ?? 0}</strong>
                        </div>
                    </div>

                    <div className="col-6 col-md-2">
                        <div className="card p-3 h-100 shadow-sm bg-light">
                            <TbCategoryFilled size="1.7rem" className="mb-2" />
                            <small className="text-muted instrument-serif-regular">Categoria</small>
                            <strong className="instrument-serif-regular">{stateDetailsSup.global?.categorySupply ?? ""}</strong>
                        </div>
                    </div>

                    {/* no se tom en cuenta ya que la fecha de ingreso es de la fecha en que se dio de alta el insumo y es un valor que no se tiene en cuenta por el momento */}

                    {/* <div className="col-6 col-md-2">
                            <div className="card p-3 h-100 shadow-sm bg-light">
                                <BsCalendar2DateFill size="1.7rem" className="mb-2" />
                                <small className="text-muted">Fecha Ingreso</small>
                                <strong>{convertDateReverse(convertDateFormat(stateDetailsSup.global?.createdAt ?? ""))}</strong>
                            </div>
                        </div> */}


                    <div className="col-6 col-md-2">
                        <div className="card p-3 h-100 shadow-sm bg-light" onClick={() => onClickEditSUpply()} style={{ cursor: "pointer" }}>
                            <FaMoneyBillTrendUp size="1.7rem" className="mb-2" />
                            <small className="text-muted instrument-serif-regular">Precio Venta</small>
                            <strong className="instrument-serif-regular">{convertNum(stateDetailsSup?.priceSale ?? "")}</strong>
                        </div>
                    </div>

                    {/* El usuario no va a poder editar un insumo momentaneamente */}
                    {/* <div className="col-6 col-md-2">
                            <div className="card p-3 h-100 shadow-sm bg-light" onClick={() => onClickEditSUpply()} style={{ cursor: "pointer" }}>
                                <BsCalendar2DateFill size="1.7rem" className="mb-2" />
                                <small className="text-muted instrument-serif-regular">Editar Insumo</small>

                            </div>
                        </div> */}

                </div>





            </div>


            <ModalPriceSupply modalOpenEditSupply={modalOpenEditSupply} setModalOpenEditSupply={setModalOpenEditSupply} dataSupply={stateDetailsSup} setSupplySelected={setSupplySelected} />
        </>
    )           
}

export default TableDetailSupplies