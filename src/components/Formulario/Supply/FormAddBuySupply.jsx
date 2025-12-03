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
    actionEditSupplyByList
} from "../../../reducer/actions/supply/actionsSupply";
import { getBrands } from "../../../reducer/actions/actionBrand"
import BlockAddProducBuy from "../Supply/BlockAddProducBuy.jsx"
import addSupplyIcon from "../../../icons/supply2.png"
import addSupplierIcon from "../../../icons/supplier.png"
import ModalAddSupplier from "../../Modal/Suppier/ModalAddSupplier.jsx";
import ModalAddSupply from "../../Modal/Supply/ModalAddSuppply.jsx";
export default function FormAddBuySupply({

}) {
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplier = useSelector((state) => state.supplier.listSupplier);
    const listBrands = useSelector((state) => state.gralRed.listBrands)
    const listSupplies = useSelector((state) => state.supply.listSupplies);
    const [showContable, setShowContable] = useState(true);
    const [showContableProd, setShowContableProd] = useState(1);
    const [openModalSupply, setOpenModalSupply] = useState(false);
    const [openModalSupplier, setOpenModalSupplier] = useState(false);
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
                details: ""
            }
        ]
    });

    console.log(stateInput)
    // Cargar lista de proveedores + insumos
    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(actionListSupplier(companySelectedMenu._id));
            dispatch(getListSupplies());
            dispatch(getBrands())
        }
    }, [companySelectedMenu]);


    // const handleChangeIndex = (e) => {
    //     const { name, value } = e.target;

    //     setStateInput((prev) => {
    //         const updated = [...prev.detailsSupply];
    //         updated[index][name] = value;
    //         return { ...prev, detailsSupply: updated };
    //     });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setStateInput((prev) => ({
            ...prev, [name]: value
        }));
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
    const handleSubmit = () => {
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

        dispatch(actionAddBuySupply({
            ...stateInput,
            Company: companySelectedMenu._id
        }));

        // dispatch(actionEditSupplyByList(stateInput.detailsSupply, stateInput.idSupply))

        MySwal.fire({
            title: "¡Compra registrada!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "rgb(21, 151, 67)",
        }).then(() => {
            dispatch(getListSupplies(companySelectedMenu._id));

        });
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

    const addSupplyFunction = () => {

        setOpenModalSupply(!openModalSupply);

    };

    const addSupplierFunction = () => {

        setOpenModalSupplier(!openModalSupplier);

    };

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
                            <Form.Label>N Factura</Form.Label>
                            <Form.Control
                                type="String"
                                name="NInvoice"
                                value={stateInput.NInvoice}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    {/* Proveedor */}
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label>Proveedor</Form.Label>
                            <Select
                                options={supplierOptions}
                                onChange={handleChangeSupplier}
                                placeholder="Proveedor"
                            />
                        </Form.Group>
                    </Col>

                    {/* Fecha */}
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={stateInput.date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label>Monto Neto</Form.Label>
                            <Form.Control
                                type="number"
                                name="montoN"
                                value={stateInput.montoN}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label>IVA</Form.Label>
                            <Form.Control
                                type="number"
                                name="iva"
                                value={stateInput.iva}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label>Impuestos Varios</Form.Label>
                            <Form.Control
                                type="number"
                                name="impuestos"
                                value={stateInput.impuestos}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label>Monto Bruto</Form.Label>
                            <Form.Control
                                type="number"
                                name="montoB"
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
            <div className="pt-3">

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
                <BlockAddProducBuy
                    key={index}
                    index={index}
                    stateInput={stateInput}
                    setStateInput={setStateInput}
                />
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
                        onClick={() => setShowContableProd(showContableProd - 1)}

                    >
                        <span>Eliminar Bloque Producto</span>

                    </button> : null

                }

            </div>

            < Modal.Footer >
                {/* <Button variant="secondary" onClick={setOpenModal}>
          Cancelar
        </Button> */}
                < Button variant="primary" onClick={() => handleSubmit(stateInput)} listBrands={listBrands}>
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

