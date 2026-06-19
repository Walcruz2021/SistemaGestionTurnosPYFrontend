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
import { addInventory } from "../../../reducer/actions/inventory/actionsInventory";
import addSupplyIcon from "../../../icons/supply2.png"
import addSupplierIcon from "../../../icons/supplier.png"
import ModalAddSupplier from "../../Modal/Suppier/ModalAddSupplier.jsx";
import ModalAddSupplyGral from "../../Modal/Supply/ModalAddSupplyGral.jsx";

import { Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import SearchSupplyFormAddvariant from "../../Search/SearchSupplyFormAddvariant.jsx"
import TableSuppliesFiltered from "../../Supplies/TableSuppliesFiltered.jsx"




export default function FormAddSupplyVariant({
}) {
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplier = useSelector((state) => state.supplier.listSupplier);
    const listBrands = useSelector((state) => state.gralRed.listBrands)
    const listSupplies = useSelector((state) => state.supply.listSupplies);
    const listSuppliesGral = useSelector((state) => state.supply.listSuppliesGral)
    const [stateListSuppliesGral, setStateListSuppliesGral] = useState()

    const [stateActiveTable, setStateActiveTable] = useState(false)
    const [showContable, setShowContable] = useState(true);

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
                priceSale: "",
                idVariant: "",
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



    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === "NInvoice") {
            value = value.replace(/[^a-zA-Z0-9/-]/g, "").slice(0, 15);
            setStateInput((prev) => ({
                ...prev, [name]: value
            }));
        } else if (name === "date") {

            setStateInput((prev) => ({
                ...prev, [name]: value
            }));
        } else if (name === "iva" || name === "impuestos" || name === "montoN") {
            value = value.replace(/\D/g, "").slice(0, 10);

            setStateInput((prev) => ({
                ...prev, [name]: value
            }));
        } else {
            //aqui se considera montoBruto el cual NO debe tener limites de digitos
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


        const resp = await dispatch(actionAddBuySupply({
            ...stateInput,
            Company: companySelectedMenu._id
        }));


        if (resp && resp.status === 200) {

            const addINventory = await dispatch(addInventory(stateInput.detailsSupply, companySelectedMenu._id));

            if (addINventory && addINventory.status === 200) {
                MySwal.fire({
                    title: "¡Stock y compra registrada!",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(21, 151, 67)",
                }).then(() => {
                    dispatch(getListSupplies(companySelectedMenu._id));

                });

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
                            priceSale: "",
                            idVariant: "",
                        }
                    ]
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ocurrio un Error de Inventario",
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un Error de Compra",
            });
        }

    };



  

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

    const SectionDivider = ({ children }) => (
        <div className="flex items-center gap-3 mt-10 mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                {children}
            </span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>
    );
    return (
        <Form centered size="lg">

            {/* =============================== */}
            {/*         DATOS GENERALES         */}
            {/* =============================== */}
            <SectionDivider>Busqueda de Insumo</SectionDivider>

            <SearchSupplyFormAddvariant listSuppliesGral={listSuppliesGral} stateListSuppliesGral={stateListSuppliesGral} setStateListSuppliesGral={setStateListSuppliesGral} stateActiveTable={stateActiveTable} setStateActiveTable={setStateActiveTable} />


            {

                stateActiveTable === true ?
                    <TableSuppliesFiltered stateListSuppliesGral={stateListSuppliesGral} stateInput={stateInput} setStateInput={setStateInput} />
                    :
                    <div>

                        <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
                            Insumo
                        </h2>



                        <p className="text-zinc-500 text-sm mt-0.5">
                            Debe filtrar un insumo
                        </p>


                    </div>
            }




        </Form >
    );
}

