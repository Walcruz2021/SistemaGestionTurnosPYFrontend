import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import { actionListSupplier } from "../../../reducer/actions/supplier/actionsSupplier";
import {
    getListSupplies,
    actionAddBuySupply,
    actionEditSupplyByList,
    getListSuppliesGral,
    actionListBuySuppliesByDateCurrent
} from "../../../reducer/actions/supply/actionsSupply";
import { getBrands } from "../../../reducer/actions/actionBrand"
import { addInventory } from "../../../reducer/actions/inventory/actionsInventory";
import BlockAddProducBuy from "../Supply/BlockAddProducBuy.jsx"
import addSupplyIcon from "../../../icons/supply2.png"
import addSupplierIcon from "../../../icons/supplier.png"
import ModalAddSupplier from "../../Modal/Suppier/ModalAddSupplier.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Plus, Trash2, ShoppingBasket, Loader2, Save } from "lucide-react";

const inputClass =
    "w-full bg-white border border-gray-800 text-gray-900 text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/5 transition-all duration-200 placeholder:text-gray-500";

const labelClass =
    "text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5 block";

const errorClass = "border-red-300 focus:border-red-400 focus:ring-red-100";

const SectionDivider = ({ children }) => (
    <div className="flex items-center gap-3 w-full">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 whitespace-nowrap">
            {children}
        </span>
        <div className="flex-1 h-px bg-gray-400" />
    </div>
);


export default function FormAddBuySupply({ openFormBuySupply, setOpenFormBuySupply
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
    const [loading, setLoading] = useState(false)
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
            dispatch(getBrands(companySelectedMenu?.category))
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

        setLoading(true)
        const resp = await dispatch(actionAddBuySupply({
            ...stateInput,
            Company: companySelectedMenu._id
        }));


        if (resp && resp.status === 200) {

            const addINventory = await dispatch(addInventory(stateInput.detailsSupply, companySelectedMenu._id));

            if (addINventory && addINventory.status === 200) {
                setLoading(false)
                MySwal.fire({
                    title: "¡Stock y compra registrada!",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(21, 151, 67)",
                }).then(() => {
                    dispatch(getListSupplies(companySelectedMenu._id));
                    dispatch(actionListBuySuppliesByDateCurrent(companySelectedMenu._id))
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

            }
            else {
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
            details: "",
            idVariant: ""
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

        if (stateInput.detailsSupply[0].nameBrand && stateInput.detailsSupply[0].nameSupply && stateInput.detailsSupply[0].priceSale && stateInput.detailsSupply[0].quantity && stateInput.detailsSupply[0].unitCost && stateInput.detailsSupply[0].idVariant) {
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
        }),
        menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
        }),

        menu: (base) => ({
            ...base,
            zIndex: 9999,
        }),
    });



    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl mx-auto"
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(stateInput);
                }}
                className="bg-white border border-gray-400 rounded-2xl shadow-sm overflow-hidden"
            >
                <div className="px-5 sm:px-8 py-4 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
                    <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-gray-400 mb-1">
                        Gestión de compras
                    </p>
                    <h1 className="text-xl font-black text-gray-900 tracking-tight">
                        Registrar Compra de Insumos
                    </h1>
                </div>

                <div className="px-3 sm:px-5 py-1">
                    <div className="pb-4 py-3">
                        <SectionDivider>Datos Contables</SectionDivider>
                    </div>

                    <AnimatePresence initial={false}>
                        {showContable && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>* N° Factura</label>
                                        <input
                                            type="text"
                                            name="NInvoice"
                                            value={stateInput.NInvoice}
                                            onChange={handleChange}
                                            placeholder="Ej: A-0001/2026"
                                            className={`${inputClass} ${!stateInput.NInvoice ? errorClass : ""}`}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>* Proveedor</label>
                                        <Select
                                            styles={customStyles(!stateInput?.nameSupplier)}
                                            options={supplierOptions}
                                            value={supplierOptions.find(
                                                (option) => option.value === stateInput.idSupplier
                                            ) || null}
                                            onChange={handleChangeSupplier}
                                            placeholder="Seleccione un proveedor"
                                            className="text-sm"
                                            classNamePrefix="purchase-select"
                                            menuPortalTarget={document.body}
                                            menuPosition="fixed"
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>* Fecha</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={stateInput.date}
                                            onChange={handleChange}
                                            className={`${inputClass} ${!stateInput.date ? errorClass : ""}`}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>* Monto Neto</label>
                                        <input
                                            type="text"
                                            name="montoN"
                                            value={stateInput.montoN}
                                            onChange={handleChange}
                                            placeholder="0"
                                            className={`${inputClass} ${!stateInput.montoN ? errorClass : ""}`}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>IVA</label>
                                        <input
                                            type="text"
                                            name="iva"
                                            value={stateInput.iva}
                                            onChange={handleChange}
                                            placeholder="0"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Impuestos Varios</label>
                                        <input
                                            type="text"
                                            name="impuestos"
                                            value={stateInput.impuestos || ""}
                                            onChange={handleChange}
                                            placeholder="0"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className={labelClass}>* Monto Bruto</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="montoB"
                                                value={
                                                    Number(stateInput.montoN) +
                                                    Number(stateInput.iva || 0) +
                                                    Number(stateInput.impuestos || 0)
                                                }
                                                readOnly
                                                className={`${inputClass} bg-gray-50 font-semibold pr-16`}
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400">
                                                Auto
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="button"
                        onClick={() => setShowContable(!showContable)}
                        className="mt-4 w-full flex items-center justify-between px-4 py-3 bg-black hover:bg-gray-100 border border-gray-400 rounded-lg text-sm font-medium text-white transition-colors duration-300"
                    >
                        <span className="tracking-wide">Datos Contables</span>
                        {showContable ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {Array.from({ length: showContableProd }).map((_, index) => (
                        <div key={index}>
                            <div className="flex items-center gap-2 mt-4 mb-4">
                                <ShoppingBasket size={25} className="text-gray-400 shrink-0" />
                                <SectionDivider>Producto {index + 1}</SectionDivider>
                            </div>


                            <BlockAddProducBuy
                                index={index}
                                stateInput={stateInput}
                                setStateInput={setStateInput}
                                validationBuySupply={validationBuySupply}
                            />

                        </div>
                    ))}

                    <div className="pt-2 flex flex-wrap gap-3">
                        {showContableProd < 10 && (
                            <motion.button
                                type="button"
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={addBlockSupply}
                                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-semibold tracking-wide border border-gray-800 transition-all duration-200"
                            >
                                <span className="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center">
                                    <Plus size={16} />
                                </span>
                                Agregar Producto
                            </motion.button>
                        )}

                        {showContableProd > 1 && (
                            <motion.button
                                type="button"
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={deleteBlockSupply}
                                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold tracking-wide border border-gray-600 transition-all duration-200"
                            >
                                <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                                    <Trash2 size={15} />
                                </span>
                                Eliminar Producto
                            </motion.button>
                        )}
                    </div>

                    <div className="mt-4 pt-2 border-t border-gray-200 flex flex-col items-center gap-4">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-6 gap-3">
                                <Loader2 className="w-10 h-10 text-gray-700 animate-spin" />
                                <p className="text-sm text-gray-500 font-light tracking-wide">
                                    Espere un momento por favor...
                                </p>
                            </div>
                        ) : (
                            <button
                                type="submit"
                                disabled={validationAccountant() || validationBuySupply()}
                                className="inline-flex items-center gap-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold tracking-[0.15em] uppercase px-8 py-3.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                <Save size={16} />
                                Guardar Compra
                            </button>
                        )}

                        <p className="text-[11px] tracking-[0.15em] uppercase text-red-400 font-semibold text-center">
                            (*) Campos obligatorios
                        </p>
                    </div>
                </div>

                <ModalAddSupplier
                    openModal={openModalSupplier}
                    setOpenModal={setOpenModalSupplier}
                />
            </form>
        </motion.div>
    );
}