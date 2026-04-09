import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { actionListSupplier } from "../../../reducer/actions/supplier/actionsSupplier";
import {
    getListSupplies,
    actionAddBuySupply,
    actionEditSupplyByList,
    getListSuppliesGral
} from "../../../reducer/actions/supply/actionsSupply";
import { getBrands } from "../../../reducer/actions/actionBrand"
import BlockAddProducBuy from "../Supply/BlockAddProducBuy.jsx"
import addSupplyIcon from "../../../icons/supply2.png"
import addSupplierIcon from "../../../icons/supplier.png"
import ModalAddSupplier from "../../Modal/Suppier/ModalAddSupplier.jsx";
import ModalAddSupply from "../../Modal/Supply/ModalAddSuppply.jsx";
import { FaBasketShopping } from "react-icons/fa6";
export default function FormAddBuySupply({
}) {
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplier = useSelector((state) => state.supplier.listSupplier);
    const listBrands = useSelector((state) => state.gralRed.listBrands)
    const listSupplies = useSelector((state) => state.supply.listSupplies);
    const listSuppliesGral = useSelector((state) => state.supply.listSuppliesGral)

    const [showContable, setShowContable] = useState(true);
    const [showContableProd, setShowContableProd] = useState(1);
    const [openModalSupply, setOpenModalSupply] = useState(false);
    const [openModalSupplier, setOpenModalSupplier] = useState(false);
    // const [statusStateAccountant, setStateAccountant] = useState(false)

    // const [stateArrayCont,setStateArrayCont]=useState(2)
    const [stateInput, setStateInput] = useState({
        montoN: "",
        montoB: "",
        paymentMethod: "",
        iva: "",
        typeInvoice: "",
        NInvoice: "",
        taxes: "",
        date: "",
        nameSupplier: "",
        idSupplier: "",
        detailsSupply: [
            {
                idSupply: "",
                nameSupply: "",
                quantity: "",
                unitCost: "",
                idBrand: "",
                nameBrand: "",
                valueUnidMed: "",
                details: "",
                priceSale: ""
            }
        ]
    });

    
    // Cargar lista de proveedores + insumos
    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(actionListSupplier(companySelectedMenu._id));
            dispatch(getListSupplies(companySelectedMenu._id));
            dispatch(getBrands())
        }
    }, [companySelectedMenu]);


    useEffect(() => {
        dispatch(getListSuppliesGral())
    }, [])

    // const handleChangeIndex = (e) => {
    //     const { name, value } = e.target;

    //     setStateInput((prev) => {
    //         const updated = [...prev.detailsSupply];
    //         updated[index][name] = value;
    //         return { ...prev, detailsSupply: updated };
    //     });
    // };

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name == "NInvoice") {
            value = value.replace(/[^a-zA-Z0-9/-]/g, "").slice(0, 15);
            setStateInput((prev) => ({
                ...prev, [name]: value
            }));
        } else if (name == "date") {



            setStateInput((prev) => ({
                ...prev, [name]: value
            }));
        } else {
            value = value.replace(/\D/g, "").slice(0, 10);

            setStateInput((prev) => ({
                ...prev, [name]: value
            }));
        }
    };


    // SELECT — Proveedor
    const supplierOptions = listSupplier.map((s) => ({
        value: s._id,
        label: s.nameSupplier
    }));


    const handleChangeSupplier = (e) => {
        const idSupplier = e.value;
        const nameSupplier = e.label;
        setStateInput({
            ...stateInput,
            idSupplier,
            nameSupplier
        });
    };


    // SELECT método de pago
    const paymentMethods = ["efectivo", "transferencia", "tarjeta", "cheque", "pagare"]
        .map((m) => ({ value: m, label: m }));

    const handleChangePayment = (e) => {
        setStateInput({ ...stateInput, paymentMethod: e.value });
    };


    // SELECT tipo de factura
    const invoiceTypes = ["Factura A", "Factura B", "Factura C"]
        .map((f) => ({ value: f, label: f }));

    const handleChangeInvoice = (e) => {
        setStateInput({ ...stateInput, typeInvoice: e.value });
    };


    // Fecha mínima
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };


    useEffect(() => {
        const montoB =
            Number(stateInput.montoN || 0) +
            Number(stateInput.iva || 0) +
            Number(stateInput.impuestos || 0);

        setStateInput(prev => ({
            ...prev,
            montoB
        }));
    }, [stateInput.montoN, stateInput.iva, stateInput.impuestos]);


    // SUBMIT
    const handleSubmit = async () => {
        // if (
        //     stateInput.nameSupply.trim() === "" ||
        //     stateInput.date.trim() === ""
        // ) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "Faltan Datos por Completar",
        //     });
        //     return;
        // }

        const resp = await dispatch(actionAddBuySupply({
            ...stateInput,
            Company: companySelectedMenu._id
        }));

        setStateInput({
            montoN: "",
            montoB: "",
            paymentMethod: "",
            iva: "",
            typeInvoice: "",
            NInvoice: "",
            taxes: "",
            date: "",
            nameSupplier: "",
            idSupplier: "",
            detailsSupply: [
                {
                    idSupply: "",
                    nameSupply: "",
                    quantity: "",
                    unitCost: "",
                    idBrand: "",
                    nameBrand: "",
                    valueUnidMed: "",
                    details: "",
                    priceSale: ""
                }
            ]
        })

        if (resp && resp.status === 200) {
            MySwal.fire({
                title: "¡Compra registrada!",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(21, 151, 67)",
            }).then(() => {
                dispatch(getListSupplies(companySelectedMenu._id));

            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un Error",
            });
        }

    };

    const addBlockSupply = () => {

        const newBlock =
        {
            idSupply: "",
            nameSupply: "",
            quantity: "",
            unitCost: "",
            idBrand: "",
            nameBrand: "",
            valueUnidMed: "",
            details: ""
        }
        setStateInput((prev) => ({
            ...prev,
            detailsSupply: [...prev.detailsSupply, newBlock]
        }));
        setShowContableProd(showContableProd + 1)
    }

    const deleteBlockSupply = () => {
        setStateInput((prev) => ({
            ...prev,
            detailsSupply: prev.detailsSupply.slice(0, -1)
        }));

        setShowContableProd(showContableProd - 1);
    };

    const addSupplyFunction = () => {

        setOpenModalSupply(!openModalSupply);

    };

    const addSupplierFunction = () => {

        setOpenModalSupplier(!openModalSupplier);

    };

    const validationAccountant = () => {
        if (stateInput.date && stateInput.montoN && stateInput.nameSupplier && stateInput.NInvoice
        ) {
            return false
        } else return true
    }

    const validationBuySupply = () => {

        if (stateInput.detailsSupply[0].nameBrand && stateInput.detailsSupply[0].nameSupply && stateInput.detailsSupply[0].priceSale && stateInput.detailsSupply[0].quantity && stateInput.detailsSupply[0].unitCost && stateInput.detailsSupply[0].dueDate) {
            return false
        } else return true
    }

const customStyles = (hasError) => ({
    control: (provided) => ({
        ...provided,
        borderColor: hasError ? "red" : provided.borderColor,
        boxShadow: "none",
        "&:hover": {
            borderColor: hasError ? "red" : provided.borderColor
        }
    })
});
    return (
        <Form centered size="lg">
            <div className="titGral">
                <h2>Detalle Compra</h2>
            </div>


            {/* =============================== */}
            {/*       BLOQUE CONTABLE           */}
            {/* =============================== */}

            {showContable && (
                <Row className="g-2">

                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label className="instrument-serif-regular">N Factura</Form.Label>
                            <Form.Control
                                type="text"
                                className={`instrument-serif-regular ${!stateInput.NInvoice ? "border-danger" : ""}`}
                                name="NInvoice"
                                value={stateInput.NInvoice}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    {/* Proveedor */}
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label className="instrument-serif-regular">Proveedor</Form.Label>
                            <Select
                                styles={customStyles(!stateInput?.nameSupplier)}
                                options={supplierOptions}
                                className="instrument-serif-regular"
                                onChange={handleChangeSupplier}
                                placeholder="Proveedor"
                            />
                        </Form.Group>
                    </Col>

                    {/* Fecha */}
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label className="instrument-serif-regular">Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                className={`instrument-serif-regular ${!stateInput.date ? "border-danger" : ""}`}
                                value={stateInput.date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label className="instrument-serif-regular">Monto Neto</Form.Label>
                            <Form.Control
                                type="text"
                                name="montoN"
                                className={`instrument-serif-regular ${!stateInput.montoN ? "border-danger" : ""}`}
                                value={stateInput.montoN}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label className="instrument-serif-regular">IVA</Form.Label>
                            <Form.Control
                                type="text"
                                name="iva"
                                className="instrument-serif-regular"
                                value={stateInput.iva}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label className="instrument-serif-regular">Impuestos Varios</Form.Label>
                            <Form.Control
                                type="text"
                                name="impuestos"
                                className="instrument-serif-regular"
                                value={stateInput.impuestos}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label className="instrument-serif-regular">Monto Bruto</Form.Label>
                            <Form.Control
                                type="text"
                                name="montoB"
                                className="instrument-serif-regular"
                                value={Number(stateInput.montoN) + Number(stateInput.iva ?? 0) + Number(stateInput.impuestos ?? 0)}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                </Row>
            )}

            {/* =============================== */}
            {/*       BOTÓN OCULTAR/VER         */}
            {/* =============================== */}
            <div className="pt-3 mb-4">

                <button
                    className="btn btn-outline-secondary w-100 d-flex justify-content-between align-items-center mb-3"
                    onClick={() => setShowContable(!showContable)}

                >
                    <span>Datos Contables</span>
                    {showContable ? <ChevronUp /> : <ChevronDown />}
                </button>

            </div>


            {/* =============================== */}
            {/*         DATOS GENERALES         */}
            {/* =============================== */}

            {Array.from({ length: showContableProd }).map((_, index) => (
                <div>

                    <div className="mb-3 border-top border-2">
                        <div className="d-flex align-items-center gap-2 instrument-serif-regular mb-2 mt-3">
                            <FaBasketShopping size={35} />
                            <h3>Producto {index + 1}</h3>
                        </div>

                    </div>

                    <BlockAddProducBuy
                        key={index}
                        index={index}
                        stateInput={stateInput}
                        setStateInput={setStateInput}
                        validationBuySupply={validationBuySupply}
                    />

                </div>
            ))}

            {/* =============================== */}
            {/*       BOTÓN OCULTAR/VER         */}
            {/* =============================== */}
            <div className="pt-3">

                {showContableProd < 10 ? <button
                    className="btn btn-outline-secondary w-100 d-flex justify-content-between align-items-center mb-3"
                    onClick={() => addBlockSupply()}

                >
                    <span>Agregar Bloque Producto</span>

                </button> : null}

                {showContableProd > 1 ?
                    <button
                        className="btn btn-outline-secondary w-100 d-flex justify-content-between align-items-center mb-3"
                        onClick={() => deleteBlockSupply()}

                    >
                        <span>Eliminar Bloque Producto</span>

                    </button> : null

                }

            </div>

            < Modal.Footer >
                {/* <Button variant="secondary" onClick={setOpenModal}>
          Cancelar
        </Button> */}
                < Button variant="primary" onClick={() => handleSubmit(stateInput)} listBrands={listBrands} disabled={validationAccountant() || validationBuySupply()}>
                    Guardar Compra
                </Button>

                <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
                    <div className="text-center">
                        <div className="card-body">
                            <button className="btn btn-link">
                                <img src={addSupplyIcon} onClick={addSupplyFunction} />
                            </button>

                        </div>
                    </div>

                    <div className="text-center">
                        <div className="card-body">
                            <button className="btn btn-link">
                                <img src={addSupplierIcon} onClick={addSupplierFunction} />
                            </button>

                        </div>
                    </div>
                </div>


            </Modal.Footer >

            <ModalAddSupply
                openModal={openModalSupply}
                setOpenModal={setOpenModalSupply}
            />

            <ModalAddSupplier
                openModal={openModalSupplier}
                setOpenModal={setOpenModalSupplier}
            />
        </Form >
    );
}

