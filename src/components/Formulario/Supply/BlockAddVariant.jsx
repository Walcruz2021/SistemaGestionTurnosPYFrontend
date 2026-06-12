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
    actionEditSupply,
    getListSuppliesGral
} from "../../../reducer/actions/supply/actionsSupply";
import { getBrands } from "../../../reducer/actions/actionBrand";
import { getListSuppliesVariant } from "../../../reducer/actions/supply/actionsSupplyVariant"
import { actionAddSupplyVariant, actionAddImgSupplyVariant } from "../../../reducer/actions/supply/actionsSupplyVariant"
import { Utensils, Shirt, Save, Image as ImageIcon, X } from "lucide-react";


const selectClass = "w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200";


const BlockAddVariant = ({ stateSupplySelected, setStateSupplySelected }) => {
    console.log(stateSupplySelected)

    const dispatch = useDispatch();

    const [productType, setProductType] = useState("");
    const [sizeType, setSizeType] = useState("");
    const [images, setImages] = useState([null, null, null]);
    // const handleChangeSelectVariant = (option) => {
    //     handleChangeField("nameVariant", option.label);
    //     handleChangeField("idVariant", option.value);
    // };

    const onChangeSelectUnidad = (option) => {

        setStateSupplySelected(prev => ({
            ...prev,
            unidad: option.value
        }));
    }



    const onChangeSelectSabor = (option) => {
        setStateSupplySelected((prev) => ({
            ...prev, sabor: option.value
        }))
    }

    const onChangeSelectColor = (option) => {
        setStateSupplySelected((prev) => ({
            ...prev, color: option.value

        }))
    }


    const onChangeSelectTalle = (option) => {
        setStateSupplySelected((prev) => ({
            ...prev, talle: option.value
        }))
    }

    //functions to add images
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];

        setImages((prev) => {
            const newImages = [...prev];
            newImages[index] = file;
            return newImages;
        });
    };

    const removeImage = (index) => {
        setImages(prev => { const n = [...prev]; n[index] = null; return n; });
    };

    const handleSubmit = async () => {

        if (!stateSupplySelected.idSupply) {
            return Swal.fire({
                icon: "error",
                title: "Faltan datos",
                text: "Complete todos los campos",
            });
        }


        const data = Object.fromEntries(
            Object.entries(stateSupplySelected).filter(
                ([key, value]) => value !== ""
            )
        );

        const response = await dispatch(actionAddSupplyVariant(data));


        if (response.status === 200) {

            const formData = new FormData();

            formData.append(
                "variantData",
                JSON.stringify(stateSupplySelected)
            );

            images.forEach((image) => {
                if (image) {
                    formData.append("images", image);
                }
            });

            const responseImg = await dispatch(actionAddImgSupplyVariant(formData, response?.data?.supplyVariant._id))

            if (responseImg?.status !== 200) {
                return Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "El insumo fue creado pero la imagen no pudo subirse",
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Variante Agregada"
                });
                setStateSupplySelected({
                    idSupply: "",
                    peso: "",
                    unidad: "",
                    sabor: "",
                    talle: "",
                    color: "",
                    name: ""
                })

            }

            //The product type form is reset
            setProductType("")

        } else {
            if (response.status === 400) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ya existe la variante",
                });
            }
        }
    };


    const selectStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: "#0f172a",
            borderColor: state.isFocused ? "#6366f1" : "#334155",
            color: "#fff",
            boxShadow: "none",
            minHeight: "42px",
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#0f172a",
            color: "#fff",
        }),
        singleValue: (base) => ({
            ...base,
            color: "#fff",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#312e81" : "#0f172a",
            color: "#fff",
        }),
    };

    return (
        <div className="min-h-screen  flex items-center justify-center p-2">
            <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-800">
                    <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-1">Gestión de inventario</p>
                    <h1 className="text-xl font-bold text-slate-100">Agregar Variante</h1>
                </div>

                <div className="px-8 py-4 space-y-7">

                    {/* Tipo producto */}
                    <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">
                            Tipo de Producto
                        </label>

                        <div className="flex gap-3">
                            {[
                                { value: "food", label: "Alimentos", Icon: Utensils },
                                { value: "clothes", label: "Ropa / Accesorios", Icon: Shirt },
                            ].map(({ value, label, Icon }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => {
                                        setProductType(value); setSizeType(""); setStateSupplySelected(prev => ({
                                            ...prev,
                                            peso: "",
                                            unidad: "",
                                            sabor: "",
                                            color: "",
                                            talle: ""
                                        }));;
                                    }}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ${productType === value
                                        ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                                        : "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-indigo-500/50 hover:bg-slate-700/60"
                                        }`}
                                >
                                    <Icon size={15} />
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Alimentos */}
                    {productType === "food" && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3 bg-slate-800/40 rounded-xl border border-slate-700/60">

                            <div>
                                <label className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
                                    Peso
                                </label>

                                <input
                                    type="text"
                                    placeholder="Ej: 15"
                                    maxLength={10000}
                                    required
                                    value={stateSupplySelected.peso || ""}
                                    onChange={(e) => {
                                        // Solo permitir números y máximo 10 caracteres
                                        const value = e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 5);
                                        // Don't allow values starting with 0
                                        if (value === "0") return;
                                        setStateSupplySelected((prevState) => ({
                                            ...prevState,
                                            peso: value,
                                        }));
                                    }}
                                    className={selectClass}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
                                    Unidad
                                </label>

                                <Select
                                    styles={selectStyles}
                                    options={[
                                        { value: "kg", label: "Kg" },
                                        { value: "gramos", label: "Gramos" }
                                    ]}
                                    onChange={onChangeSelectUnidad}

                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
                                    Sabor
                                </label>

                                <Select
                                    styles={selectStyles}
                                    options={[
                                        { value: "pollo", label: "Pollo" },
                                        { value: "carne", label: "Carne" },
                                        { value: "verduras", label: "Verduras" },
                                        { value: "cereales", label: "Cereales" },
                                        { value: "carne,leche,cereales", label: "Carne,Leche,Cereales" },
                                        { value: "pollo y arroz", label: "Pollo y Arroz" },
                                        { value: "carne, pollo y cerdo", label: "Carne, Pollo y Cerdo" },
                                        { value: "pollo, carne y vegetales", label: "Pollo, Carne y Vegetales" },
                                        { value: "pescado", label: "Pescado" }
                                    ]}
                                    onChange={onChangeSelectSabor}

                                />
                            </div>

                        </div>
                    )}

                    {/* Ropa */}
                    {productType === "clothes" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-800/40 rounded-xl border border-slate-700/60">

                            <div>
                                <label className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
                                    Color
                                </label>

                                <Select
                                    styles={selectStyles}
                                    options={[
                                        { value: "negro", label: "Negro" },
                                        { value: "blanco", label: "Blanco" },
                                        { value: "rosa", label: "Rosa" },
                                        { value: "amarillo", label: "Amarillo" }
                                    ]}
                                    onChange={onChangeSelectColor}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
                                    Tipo de Talle
                                </label>

                                <Select
                                    styles={selectStyles}
                                    options={[
                                        { value: "universal", label: "Universal" },
                                        { value: "numeric", label: "Numérico" }
                                    ]}
                                    onChange={(option) => {
                                        setSizeType(option.value);
                                        onChangeSelectUnidad(option);
                                    }}
                                />
                            </div>

                        </div>
                    )}

                    {/* Talle universal */}
                    {sizeType === "universal" && (
                        <div>
                            <label className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">Talle</label>

                            <Select
                                styles={selectStyles}
                                options={[

                                    { value: "S", label: "S" },
                                    { value: "M", label: "M" },
                                    { value: "L", label: "L" },
                                    { value: "X", label: "X" },
                                    { value: "XS", label: "XS" },
                                    { value: "XL", label: "XL" },
                                    { value: "XXL", label: "XXL" }
                                ]}
                                onChange={onChangeSelectTalle}
                            />
                        </div>
                    )}

                    {/* Talle numerico */}
                    {sizeType === "numeric" && (
                        <div>
                            <label className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">Talle</label>

                            <Select
                                styles={selectStyles}
                                options={[
                                    { value: 34, label: "34" },
                                    { value: 35, label: "35" },
                                    { value: 36, label: "36" },
                                    { value: 37, label: "37" },
                                    { value: 38, label: "38" },
                                    { value: 39, label: "39" },
                                    { value: 40, label: "40" },
                                    { value: 41, label: "41" },
                                    { value: 42, label: "42" },
                                    { value: 43, label: "43" },
                                    { value: 44, label: "44" }
                                ]}
                                onChange={onChangeSelectTalle}
                            />
                        </div>
                    )}

                    {/* Imagenes */}
                    <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">
                            Imágenes de la variante
                            <span className="ml-2 text-slate-400 normal-case tracking-normal font-normal">(máximo 3)</span>
                        </label>

                        <div className="grid grid-cols-3 gap-3">

                            {[0, 1, 2].map((index) => (
                                <div key={index} className="relative group aspect-square">

                                    {images[index] ? (
                                        <>

                                            <img
                                                src={URL.createObjectURL(images[index])}
                                                alt={`preview-${index}`}
                                                className="w-full h-full object-cover rounded-xl border border-slate-700"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 bg-slate-900/80 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 border border-slate-700"
                                            >
                                                <X size={35} />
                                            </button>
                                        </>

                                    ) : (
                                        <label className="flex flex-col items-center justify-center gap-2 w-full h-full bg-slate-800/60 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-indigo-500/60 hover:bg-slate-800 transition-all duration-200 group">

                                            <ImageIcon size={20} className="text-slate-600 group-hover:text-indigo-400 transition-colors duration-200" />
                                            <span className="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors duration-200">Subir foto</span>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleImageChange(e, index)}
                                            />
                                        </label>
                                    )}
                                </div>
                            ))}

                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="px-8 py-4 border-t border-slate-800 flex justify-end">
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-indigo-500/20 transition-all duration-200"
                        onClick={handleSubmit}
                    // disabled={
                    //     !stateSupplySelected._id ||
                    //     !stateSupplySelected.unidad
                    // }
                    >
                        <Save size={15} />
                        Guardar Variante
                    </button>
                </div>

                {/* <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={
                            !stateSupplySelected._id ||
                            !stateSupplySelected.unidad
                        }
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg"
                    >
                        <Save size={15} />
                        Guardar Variante
                    </button>
                </div> */}

            </div>

        </div>
    );
};

export default BlockAddVariant;
